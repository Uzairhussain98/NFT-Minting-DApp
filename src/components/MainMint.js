import React from "react";
import { ethers, BigNumber } from "ethers";
//impoet RoboPunkNFt from ./robopunknft.json
import { Box, Button, Image, Flex, Link, Text } from "@chakra-ui/react";

// const RoboPunkNFTAddress = '0x0'

const MainMint = (accounts, setAccounts) => {
  const isConnected = Boolean(accounts[0]);

  return (
    <Flex justify="center" align="center" height="100vh" paddingBottom="350px">
      <Box width="520px">
        <div>
          <Text fontSize="48px" textShadow="0 5px #000000">
            RoboPunks
          </Text>
          <Text fontSize="34px" fontFamily="VT323">
            It's 2078 , Can RoboPunks NFT save human from destructive rampant
            NFT speculation? Mint one random RoboPunk to find out
          </Text>
        </div>
        {isConnected ? (
          <button>Mint</button>
        ) : (
          <Text>You Must Be Connected To Mint</Text>
        )}
      </Box>
    </Flex>
  );
};

export default MainMint;
