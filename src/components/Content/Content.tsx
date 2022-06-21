import { useWallet, useConnection } from '@solana/wallet-adapter-react'
import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const Content: React.FC = () => {
  const wallet = useWallet();
  const {connection} = useConnection();
  const [balance, setBalance] = useState(0)

  const getUserBalance = async (publicKey: PublicKey, connection: Connection) => {
    const balance = await connection.getBalance(publicKey);
    setBalance(balance / LAMPORTS_PER_SOL)
  }

  useEffect(() => {
    if(wallet.publicKey) {
      getUserBalance(wallet.publicKey, connection)
    }
  }, [wallet.publicKey, connection, getUserBalance])

  return (
    <Container>
      <div>
        {wallet.publicKey && <p>Public Key: {wallet.publicKey.toBase58()}</p>}
        {wallet && <p>SOL Balance: {(balance || 0).toLocaleString()}</p>}
      </div>
    </Container>
  )
}

const Container = styled.div`
  padding-top: 70px;
  width: 100%;
  height: 100vh;
  background-color: #222;
  > div {
    color: white;
    text-align: center;
  }
`

export default Content