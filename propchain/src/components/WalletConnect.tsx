'use client'

import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { useEffect, useState } from 'react'
import Image from 'next/image'

export function WalletConnect() {
  const { address, isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()
  const [mounted, setMounted] = useState(false)
  const [hovered, setHovered] = useState<{ [key: string]: boolean }>({})

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="flex items-center gap-4">
        <div className="w-32 h-10 bg-gray-200 animate-pulse rounded-lg"></div>
      </div>
    )
  }

  if (isConnected) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-sm">
          {address?.slice(0, 6)}...{address?.slice(-4)}
        </span>
        <a
          onClick={() => disconnect()}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', marginRight: '12px', marginLeft: '12px' }}
        >
          <Image
            src="/images/disconnect.png"
            alt="Disconnect"
            width={32}
            height={32}
          />
          <span style={{ width: '65px', marginRight: '-45px' }}></span>
        </a>
      </div>
    )
  }

  return (
    <div className="flex gap-2">
      {connectors.map((connector) => {
        if (connector.name === 'Injected') {
          return (
            <a
              key={connector.uid}
              onClick={() => connect({ connector })}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white rounded-lg ransition-colors"
              style={{ cursor: 'pointer' }}
              onMouseEnter={() => setHovered((h) => ({ ...h, [connector.uid]: true }))}
              onMouseLeave={() => setHovered((h) => ({ ...h, [connector.uid]: false }))}
            >
              <Image
                src={hovered[connector.uid] ? "/logos/MetaMask-icon-fox.svg" : "/logos/MetaMask-icon-fox-black.svg"}
                alt="MetaMask"
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <span style={{ width: '80px', marginRight: '-60px' }}></span>
            </a>
          )
        }
        if (connector.name === 'WalletConnect') {
          return (
            <a
              key={connector.uid}
              onClick={() => connect({ connector })}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white rounded-lg ransition-colors"
              style={{ cursor: 'pointer' }}
              onMouseEnter={() => setHovered((h) => ({ ...h, [connector.uid]: true }))}
              onMouseLeave={() => setHovered((h) => ({ ...h, [connector.uid]: false }))}
            >
              <Image
                src={hovered[connector.uid] ? "/logos/walletconnect-logo.svg" : "/logos/walletconnect-logo-black.svg"}
                alt="WalletConnect"
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <span style={{ width: '90px', marginRight: '-70px' }}></span>
            </a>
          )
        }
        return (
          <button
            key={connector.uid}
            onClick={() => connect({ connector })}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            style={{ display: 'none' }}
          >
            Connect {connector.name}
          </button>
        )
      })}
    </div>
  )
} 