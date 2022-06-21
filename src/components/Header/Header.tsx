import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import React from 'react'
import styled from 'styled-components';

const Header = () => {
  return (
    <Container>
      <WalletMultiButton></WalletMultiButton>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 60px;
  position: absolute;
  left: 0;
  top: 0;
  background-color: #444;
`

export default Header;