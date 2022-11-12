import React from "react";
import { Box, Button, Image, Flex, Link, Spacer } from "@chakra-ui/react";
import fb from "../assets/social-media-icons/facebook.png";
import tweet from "../assets/social-media-icons/twitter.png";
import linked from "../assets/social-media-icons/in.png";
import email from "../assets/social-media-icons/email.png";

const Navbar = (accounts, setAccounts) => {
  const isConnected = Boolean(accounts[0]);

  async function connectWallet() {
    console.log("work");
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        methods: "eth_requestAccounts",
      });
      setAccounts(accounts);
    }
  }

  return (
    <Flex justify="space-between" align="center" padding="30px">
      {/* social Icons */}
      <Flex justify="space-around" width="40%" padding="0 75px">
        <Link href="facebook.com">
          <Image src={fb} alt="gm" />
        </Link>
        <Link href="facebook.com">
          <Image src={tweet} alt="gm" />
        </Link>
        <Link href="facebook.com">
          <Image src={email} alt="gm" />
        </Link>
      </Flex>

      {/* left side aboua nd connect  */}
      <Flex justify="space-around" align="center" width="40%" padding="30px">
        <Box margin="0 15px">About</Box>
        <Spacer />
        <Box margin="0 15px">Mint</Box>
        <Spacer />

        {/* connectWallet */}
        {isConnected ? (
          <Box margin="0 15px">Connected</Box>
        ) : (
          <Button
            backgroundColor="#D6517D"
            color="white"
            borderRadius="5px"
            boxShadow="0 2px 2px 1px #0F0F0F"
            fontFamily="inherit"
            padding="15px"
            margin="0 15px"
            onClick={() => connectWallet()}
          >
            Connect Wallet
          </Button>
        )}
      </Flex>
    </Flex>
  );
};

export default Navbar;
