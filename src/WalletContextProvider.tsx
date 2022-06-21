import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { WalletError } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter, SolflareWalletAdapter, SolletExtensionWalletAdapter, SolletWalletAdapter, TorusWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import React, { ReactNode, useCallback, useMemo } from 'react'

const WalletContextProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network])
  const wallets = useMemo(() => [
    new PhantomWalletAdapter(),
    new SolflareWalletAdapter(),
    new SolletWalletAdapter({network}),
    new SolletExtensionWalletAdapter({network}),
    new TorusWalletAdapter()
  ], [network]);
  
  const onError = useCallback((err: WalletError) => console.log(err), [])
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} onError={onError} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

export default WalletContextProvider