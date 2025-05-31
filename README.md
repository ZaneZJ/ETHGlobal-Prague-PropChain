# 🏙️ PropChain @ ETHGlobal Prague

![ETHGlobal](https://ethglobal.com/_next/image?url=%2Fimages%2Flogo.svg&w=256&q=75)
![Next.js](https://img.shields.io/badge/Next.js-15.3.3-black?logo=nextdotjs)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)
![Solidity](https://img.shields.io/badge/Solidity-%5E0.8.20-363636?logo=solidity)
![Mapbox](https://img.shields.io/badge/Mapbox-GL-blue?logo=mapbox)

---

> **AI-Driven Real Estate & Finance on Ethereum**

PropChain is a full-stack hackathon project for ETHGlobal Prague. It fuses AI automation, on-chain smart contracts, and a slick property explorer to make property management, leasing, and investment transparent, fast, and programmable.

---

## 🚀 Features

- **AI-Driven Workflows:** Automate contracts, maintenance, and comms with AI agents trained on real property data.
- **On-Chain Leases & Payments:** Secure, transparent smart contracts for rent, escrow, and compliance (EVM, Solidity).
- **Property NFTs:** Fractionalize real estate with ERC-1155 tokens for ownership, investment, and liquidity.
- **Mapbox Explorer:** Browse, filter, and invest in properties on an interactive map (Mapbox GL, React).
- **Data-Driven Insights:** Dynamic pricing, rent optimization, and instant compliance/tax reports.
- **Modern UI:** Next.js 15, Tailwind, custom design, mobile-first.

---

## 🏁 Quickstart

```bash
# 1. Install deps
cd propchain
yarn install

# 2. Setup env
cp .env.example .env.local # add your MAPBOX + RPC keys

# 3. Run the app
yarn dev
# or: npm run dev / pnpm dev / bun dev
```

Open [http://localhost:3000](http://localhost:3000) and explore.

---

## 🛠️ Smart Contracts (Foundry)

- `LeaseManagement.sol`: On-chain lease creation, signing, payments, and maintenance.
- `RealEstate1155.sol`: Fractional property ownership as ERC-1155 tokens.

```bash
cd propchain/src/foundry
forge build   # Compile
forge test    # Run tests
anvil         # Local node
```

---

## 🌍 Map Explorer

- Live map with property markers (Mapbox GL)
- Click to view property details, invest, or manage
- Geolocation support

---

## 🤝 Contact & Hackathon

- Built for ETHGlobal Prague 2024
- Team: [Add your names/handles]
- Contact: See `/contacts` page or ping us on [Twitter](https://twitter.com/) / [GitHub](https://github.com/)

---

## 📦 Tech Stack

- Next.js 15, React 19, TypeScript, TailwindCSS
- Mapbox GL JS
- Solidity (Foundry, EVM)
- Vercel (deploy), Anvil (local node)

---

## 🧪 For Judges & Hackers

- Demo: [Add link if deployed]
- Contracts: `propchain/src/foundry/src/`
- Map: `/explore`
- Contact: `/contacts`

---

## ⚡️ License

MIT. Fork, hack, and ship.
