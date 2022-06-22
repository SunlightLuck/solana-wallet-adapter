import { WalletNotConnectedError } from '@solana/wallet-adapter-base'
import { useWallet, useConnection } from '@solana/wallet-adapter-react'
import { Connection, PublicKey, LAMPORTS_PER_SOL, TransactionSignature, Keypair, Transaction, SystemProgram } from '@solana/web3.js'
import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'

const Content: React.FC = () => {
  const wallet = useWallet();
  const {connection} = useConnection();
  const [balance, setBalance] = useState(0)

  const getUserBalance = async (publicKey: PublicKey, connection: Connection) => {
    const balance = await connection.getBalance(publicKey);
    setBalance(balance / LAMPORTS_PER_SOL)
  }

  const airDrop = useCallback(async () => {
    if(!wallet.publicKey) {
      console.log("Wallet not Connected");
      return;
    }
    let signature: TransactionSignature = '';

    try {
      console.log("DROP")
      signature = await connection.requestAirdrop(wallet.publicKey, 1 * LAMPORTS_PER_SOL);
      await connection.confirmTransaction(signature, 'confirmed');
    } catch(err) {
      console.log(err)
    }
  }, [wallet.publicKey, connection]);

  const sendTransaction = useCallback(async() => {
    if(!wallet.publicKey) {
      console.log('Wallet not Connected');
      return;
    }

    const destAddress = Keypair.generate().publicKey;
    const amount = .001 * LAMPORTS_PER_SOL

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: wallet.publicKey,
        toPubkey: destAddress,
        lamports: amount
      })
    );
    const signature = await wallet.sendTransaction(transaction, connection);
    await connection.confirmTransaction(signature, 'confirmed');
  }, [wallet.publicKey, connection])

  useEffect(() => {
    if(wallet.publicKey) {
      getUserBalance(wallet.publicKey, connection)
    }
  }, [wallet.publicKey, connection, getUserBalance])

  return (
    <Container>
      <div>
        <Button onClick={airDrop}>AIRDROP 1</Button>
      </div>
      <div>
        {wallet.publicKey && <p>Public Key: {wallet.publicKey.toBase58()}</p>}
        {wallet && <p>SOL Balance: {(balance || 0).toLocaleString()}</p>}
      </div>
      <div>
        {wallet.publicKey && <Button onClick={sendTransaction}>SEND TRANSACTION</Button>}
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

const Button = styled.button`
  padding: 15px 30px;
  background-color: #666;
  border: none;
  color: white;
  cursor: pointer;
  :hover {
    background-color: #444;
  }
  :active {
    background-color: #555;
  }
`

export default Content