// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title LeaseManagement
 * @dev Smart contract for managing digital lease agreements between landlords and tenants
 * @notice This contract handles lease creation, signing, payments, and termination
 */
contract LeaseManagement {
    
    // Enums
    enum LeaseStatus { Created, Signed, Active, Terminated, Completed }
    enum PaymentFrequency { Monthly, Quarterly, Annual }
    
    // Structs
    struct PropertyDetails {
        string propertyAddress;
        string description;
        string metadataHash; // IPFS hash for documents
    }
    
    struct LeaseTerms {
        uint256 startDate;
        uint256 endDate;
        uint256 rentAmount;
        PaymentFrequency paymentFrequency;
        uint256 depositAmount;
        string maintenanceResponsibilities;
    }
    
    struct PaymentRecord {
        uint256 amount;
        uint256 timestamp;
        uint256 periodStart;
        uint256 periodEnd;
        bool isDeposit;
    }
    
    struct MaintenanceRecord {
        string description;
        uint256 cost;
        uint256 timestamp;
        address paidBy;
        bool reimbursed;
    }
    
    struct Lease {
        uint256 leaseId;
        address landlord;
        address tenant;
        PropertyDetails property;
        LeaseTerms terms;
        LeaseStatus status;
        uint256 depositPaid;
        uint256 totalRentPaid;
        uint256 nextPaymentDue;
        uint256 createdAt;
        uint256 signedAt;
        uint256 activatedAt;
        uint256 terminatedAt;
        bool landlordApproval;
        bool tenantApproval;
        PaymentRecord[] paymentHistory;
        MaintenanceRecord[] maintenanceHistory;
        mapping(uint256 => bool) paidPeriods; // timestamp => paid
    }
    
    // State variables
    mapping(uint256 => Lease) public leases;
    mapping(address => uint256[]) public landlordLeases;
    mapping(address => uint256[]) public tenantLeases;
    uint256 public nextLeaseId;
    uint256 public constant GRACE_PERIOD = 7 days;
    
    // Events
    event LeaseCreated(uint256 indexed leaseId, address indexed landlord, address indexed tenant);
    event LeaseSigned(uint256 indexed leaseId, address indexed tenant);
    event LeaseActivated(uint256 indexed leaseId);
    event RentPaid(uint256 indexed leaseId, uint256 amount, uint256 periodStart, uint256 periodEnd);
    event DepositPaid(uint256 indexed leaseId, uint256 amount);
    event LeaseTerminated(uint256 indexed leaseId, address terminatedBy);
    event DepositReturned(uint256 indexed leaseId, uint256 amount, address to);
    event MaintenanceRecorded(uint256 indexed leaseId, string description, uint256 cost);
    
    // Modifiers
    modifier onlyLandlord(uint256 _leaseId) {
        require(leases[_leaseId].landlord == msg.sender, "Only landlord can perform this action");
        _;
    }
    
    modifier onlyTenant(uint256 _leaseId) {
        require(leases[_leaseId].tenant == msg.sender, "Only tenant can perform this action");
        _;
    }
    
    modifier onlyParties(uint256 _leaseId) {
        require(
            leases[_leaseId].landlord == msg.sender || leases[_leaseId].tenant == msg.sender,
            "Only lease parties can perform this action"
        );
        _;
    }
    
    modifier leaseExists(uint256 _leaseId) {
        require(_leaseId < nextLeaseId, "Lease does not exist");
        _;
    }
    
    modifier inStatus(uint256 _leaseId, LeaseStatus _status) {
        require(leases[_leaseId].status == _status, "Invalid lease status for this operation");
        _;
    }
    
    /**
     * @dev Create a new lease agreement
     * @param _tenant Address of the tenant
     * @param _property Property details including address and metadata
     * @param _terms Lease terms including dates, rent, and deposit
     */
    function createLease(
        address _tenant,
        PropertyDetails memory _property,
        LeaseTerms memory _terms
    ) external returns (uint256) {
        require(_tenant != address(0) && _tenant != msg.sender, "Invalid tenant address");
        require(_terms.startDate > block.timestamp, "Start date must be in the future");
        require(_terms.endDate > _terms.startDate, "End date must be after start date");
        require(_terms.rentAmount > 0, "Rent amount must be greater than 0");
        require(_terms.depositAmount > 0, "Deposit amount must be greater than 0");
        
        uint256 leaseId = nextLeaseId++;
        Lease storage newLease = leases[leaseId];
        
        newLease.leaseId = leaseId;
        newLease.landlord = msg.sender;
        newLease.tenant = _tenant;
        newLease.property = _property;
        newLease.terms = _terms;
        newLease.status = LeaseStatus.Created;
        newLease.createdAt = block.timestamp;
        newLease.nextPaymentDue = _terms.startDate;
        
        landlordLeases[msg.sender].push(leaseId);
        tenantLeases[_tenant].push(leaseId);
        
        emit LeaseCreated(leaseId, msg.sender, _tenant);
        return leaseId;
    }
    
    /**
     * @dev Tenant signs the lease agreement
     * @param _leaseId ID of the lease to sign
     */
    function signLease(uint256 _leaseId) 
        external 
        leaseExists(_leaseId) 
        onlyTenant(_leaseId) 
        inStatus(_leaseId, LeaseStatus.Created) 
    {
        leases[_leaseId].status = LeaseStatus.Signed;
        leases[_leaseId].signedAt = block.timestamp;
        leases[_leaseId].tenantApproval = true;
        
        emit LeaseSigned(_leaseId, msg.sender);
    }
    
    /**
     * @dev Pay deposit to activate the lease
     * @param _leaseId ID of the lease
     */
    function payDeposit(uint256 _leaseId) 
        external 
        payable 
        leaseExists(_leaseId) 
        onlyTenant(_leaseId) 
        inStatus(_leaseId, LeaseStatus.Signed) 
    {
        require(msg.value == leases[_leaseId].terms.depositAmount, "Incorrect deposit amount");
        
        leases[_leaseId].depositPaid = msg.value;
        leases[_leaseId].status = LeaseStatus.Active;
        leases[_leaseId].activatedAt = block.timestamp;
        
        // Record deposit payment
        leases[_leaseId].paymentHistory.push(PaymentRecord({
            amount: msg.value,
            timestamp: block.timestamp,
            periodStart: 0,
            periodEnd: 0,
            isDeposit: true
        }));
        
        emit DepositPaid(_leaseId, msg.value);
        emit LeaseActivated(_leaseId);
    }
    
    /**
     * @dev Pay rent for a specific period
     * @param _leaseId ID of the lease
     * @param _periodStart Start of the payment period
     * @param _periodEnd End of the payment period
     */
    function payRent(uint256 _leaseId, uint256 _periodStart, uint256 _periodEnd) 
        external 
        payable 
        leaseExists(_leaseId) 
        onlyTenant(_leaseId) 
        inStatus(_leaseId, LeaseStatus.Active) 
    {
        require(msg.value == leases[_leaseId].terms.rentAmount, "Incorrect rent amount");
        require(_periodStart >= leases[_leaseId].terms.startDate, "Period start before lease start");
        require(_periodEnd <= leases[_leaseId].terms.endDate, "Period end after lease end");
        require(!leases[_leaseId].paidPeriods[_periodStart], "Period already paid");
        
        leases[_leaseId].totalRentPaid += msg.value;
        leases[_leaseId].paidPeriods[_periodStart] = true;
        leases[_leaseId].nextPaymentDue = _getNextPaymentDate(_leaseId, _periodEnd);
        
        // Record rent payment
        leases[_leaseId].paymentHistory.push(PaymentRecord({
            amount: msg.value,
            timestamp: block.timestamp,
            periodStart: _periodStart,
            periodEnd: _periodEnd,
            isDeposit: false
        }));
        
        // Transfer rent to landlord
        payable(leases[_leaseId].landlord).transfer(msg.value);
        
        emit RentPaid(_leaseId, msg.value, _periodStart, _periodEnd);
    }
    
    /**
     * @dev Record maintenance work and costs
     * @param _leaseId ID of the lease
     * @param _description Description of maintenance work
     * @param _cost Cost of maintenance
     */
    function recordMaintenance(uint256 _leaseId, string memory _description, uint256 _cost) 
        external 
        payable 
        leaseExists(_leaseId) 
        onlyParties(_leaseId) 
        inStatus(_leaseId, LeaseStatus.Active) 
    {
        require(msg.value == _cost, "Payment must match declared cost");
        
        leases[_leaseId].maintenanceHistory.push(MaintenanceRecord({
            description: _description,
            cost: _cost,
            timestamp: block.timestamp,
            paidBy: msg.sender,
            reimbursed: false
        }));
        
        emit MaintenanceRecorded(_leaseId, _description, _cost);
    }
    
    /**
     * @dev Terminate the lease
     * @param _leaseId ID of the lease to terminate
     * @param _reason Reason for termination
     */
    function terminateLease(uint256 _leaseId, string memory _reason) 
        external 
        leaseExists(_leaseId) 
        onlyParties(_leaseId) 
    {
        require(
            leases[_leaseId].status == LeaseStatus.Active || 
            leases[_leaseId].status == LeaseStatus.Signed,
            "Cannot terminate lease in current status"
        );
        
        leases[_leaseId].status = LeaseStatus.Terminated;
        leases[_leaseId].terminatedAt = block.timestamp;
        
        emit LeaseTerminated(_leaseId, msg.sender);
    }
    
    /**
     * @dev Return deposit to tenant (requires both parties' approval)
     * @param _leaseId ID of the lease
     * @param _deductionAmount Amount to deduct from deposit
     * @param _deductionReason Reason for deduction
     */
    function returnDeposit(uint256 _leaseId, uint256 _deductionAmount, string memory _deductionReason) 
        external 
        leaseExists(_leaseId) 
        onlyLandlord(_leaseId) 
        inStatus(_leaseId, LeaseStatus.Terminated) 
    {
        require(_deductionAmount <= leases[_leaseId].depositPaid, "Deduction exceeds deposit");
        require(leases[_leaseId].tenantApproval, "Tenant approval required");
        
        uint256 returnAmount = leases[_leaseId].depositPaid - _deductionAmount;
        leases[_leaseId].status = LeaseStatus.Completed;
        
        if (returnAmount > 0) {
            payable(leases[_leaseId].tenant).transfer(returnAmount);
        }
        
        if (_deductionAmount > 0) {
            payable(leases[_leaseId].landlord).transfer(_deductionAmount);
        }
        
        emit DepositReturned(_leaseId, returnAmount, leases[_leaseId].tenant);
    }
    
    /**
     * @dev Tenant approves deposit return terms
     * @param _leaseId ID of the lease
     */
    function approveDepositReturn(uint256 _leaseId) 
        external 
        leaseExists(_leaseId) 
        onlyTenant(_leaseId) 
        inStatus(_leaseId, LeaseStatus.Terminated) 
    {
        leases[_leaseId].tenantApproval = true;
    }
    
    /**
     * @dev Get lease details
     * @param _leaseId ID of the lease
     */
    function getLeaseDetails(uint256 _leaseId) 
        external 
        view 
        leaseExists(_leaseId) 
        returns (
            address landlord,
            address tenant,
            PropertyDetails memory property,
            LeaseTerms memory terms,
            LeaseStatus status,
            uint256 depositPaid,
            uint256 totalRentPaid,
            uint256 nextPaymentDue
        ) 
    {
        Lease storage lease = leases[_leaseId];
        return (
            lease.landlord,
            lease.tenant,
            lease.property,
            lease.terms,
            lease.status,
            lease.depositPaid,
            lease.totalRentPaid,
            lease.nextPaymentDue
        );
    }
    
    /**
     * @dev Get payment history for a lease
     * @param _leaseId ID of the lease
     */
    function getPaymentHistory(uint256 _leaseId) 
        external 
        view 
        leaseExists(_leaseId) 
        onlyParties(_leaseId) 
        returns (PaymentRecord[] memory) 
    {
        return leases[_leaseId].paymentHistory;
    }
    
    /**
     * @dev Get maintenance history for a lease
     * @param _leaseId ID of the lease
     */
    function getMaintenanceHistory(uint256 _leaseId) 
        external 
        view 
        leaseExists(_leaseId) 
        onlyParties(_leaseId) 
        returns (MaintenanceRecord[] memory) 
    {
        return leases[_leaseId].maintenanceHistory;
    }
    
    /**
     * @dev Get leases for a landlord
     * @param _landlord Address of the landlord
     */
    function getLandlordLeases(address _landlord) external view returns (uint256[] memory) {
        return landlordLeases[_landlord];
    }
    
    /**
     * @dev Get leases for a tenant
     * @param _tenant Address of the tenant
     */
    function getTenantLeases(address _tenant) external view returns (uint256[] memory) {
        return tenantLeases[_tenant];
    }
    
    /**
     * @dev Check if rent is overdue
     * @param _leaseId ID of the lease
     */
    function isRentOverdue(uint256 _leaseId) 
        external 
        view 
        leaseExists(_leaseId) 
        returns (bool) 
    {
        return block.timestamp > leases[_leaseId].nextPaymentDue + GRACE_PERIOD;
    }
    
    /**
     * @dev Internal function to calculate next payment date
     * @param _leaseId ID of the lease
     * @param _currentPeriodEnd End of current payment period
     */
    function _getNextPaymentDate(uint256 _leaseId, uint256 _currentPeriodEnd) 
        internal 
        view 
        returns (uint256) 
    {
        PaymentFrequency frequency = leases[_leaseId].terms.paymentFrequency;
        
        if (frequency == PaymentFrequency.Monthly) {
            return _currentPeriodEnd + 30 days;
        } else if (frequency == PaymentFrequency.Quarterly) {
            return _currentPeriodEnd + 90 days;
        } else {
            return _currentPeriodEnd + 365 days;
        }
    }
    
    /**
     * @dev Emergency function to pause contract (only for critical issues)
     */
    function emergencyWithdraw(uint256 _leaseId) 
        external 
        leaseExists(_leaseId) 
    {
        require(
            msg.sender == leases[_leaseId].landlord || msg.sender == leases[_leaseId].tenant,
            "Only lease parties can emergency withdraw"
        );
        require(
            leases[_leaseId].status == LeaseStatus.Terminated || 
            block.timestamp > leases[_leaseId].terms.endDate + 90 days,
            "Emergency conditions not met"
        );
        
        // Return any remaining deposits
        if (leases[_leaseId].depositPaid > 0) {
            uint256 halfDeposit = leases[_leaseId].depositPaid / 2;
            payable(leases[_leaseId].landlord).transfer(halfDeposit);
            payable(leases[_leaseId].tenant).transfer(leases[_leaseId].depositPaid - halfDeposit);
        }
    }
}