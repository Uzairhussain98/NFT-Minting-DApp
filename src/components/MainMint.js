import React from "react";
import { ethers } from "ethers";
import RoboPunk from "../RoboPunk.json";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import TokenURIs from "./TokenURIs";

const RoboPunkNFTAddress = "0x90A3313213998BcEfDFDBEF04829cDb7eB62A308";

const MainMint = ({ accounts, setAccounts, setIsMinting }) => {
  const isConnected = Boolean(accounts[0]);
  // console.log(TokenURIs[2]);
  // console.log(TokenURIs[Math.floor(Math.random() * TokenURIs.length)]);

  async function handleMint() {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        RoboPunkNFTAddress,
        RoboPunk.abi,
        signer
      );
      try {
        const response = await contract.mint(
          TokenURIs[Math.floor(Math.random() * TokenURIs.length)],
          { value: ethers.utils.parseEther("0.05") }
        );
        setIsMinting(true);
        await response.wait();
        console.log("response", response);
        setIsMinting(false);
      } catch (error) {
        console.log("Oh No! Something Went Wrong ", error);
      }
    }
  }

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
          <Button
            backgroundColor="#D6517D"
            color="white"
            borderRadius="5px"
            boxShadow="0 2px 2px 1px #0F0F0F"
            fontFamily="inherit"
            padding="15px"
            margin="0 15px"
            cursor="pointer"
            onClick={handleMint}
          >
            Mint
          </Button>
        ) : (
          <Text color="#D4517D">You Must Be Connected To Mint</Text>
        )}
      </Box>
    </Flex>
  );
};

export default MainMint;
