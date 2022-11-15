import React from "react";
import { Box, Button, Image, Flex, Link, Spacer } from "@chakra-ui/react";
import fb from "../assets/social-media-icons/facebook.png";
import tweet from "../assets/social-media-icons/twitter.png";
// import linked from "../assets/social-media-icons/in.png";
import email from "../assets/social-media-icons/email.png";
import truncateEthAddress from "truncate-eth-address";

const Navbar = ({ accounts, setAccounts }) => {
  const isConnected = Boolean(accounts[0]);
  // console.log(isConnected);

  async function connectWallet() {
    // console.log("work");
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccounts(accounts);
    } else {
      alert("Please Install A Wallet");
    }
    if (isConnected) {
      setAccounts([]);
      // alert("Metamask Disconnected");
    }
  }

  // async function connectWallet(){
  //   window.ethereum
  //   .request({
  //     method:"eth_requestAccounts",
  //   })
  //   .then((accounts)=>{
  //     setAccount(accounts[0])
  //   })
  //   .catch((error)=>{
  //     alert("Something Went Wrong")
  //   });
  // }

  return (
    <Flex justify="space-between" align="center" padding="30px">
      {/* social Icons */}
      <Flex justify="space-around" width="40%" padding="0 75px">
        <Link href="https://www.facebook.com/" target="_blank">
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
          // <Box margin="0 15px">Connected</Box>
          <Box
            backgroundColor="#D6517D"
            color="white"
            borderRadius="5px"
            boxShadow="0 2px 2px 1px #0F0F0F"
            fontFamily="inherit"
            padding="15px"
            margin="0 15px"
            cursor="pointer"
            onClick={() => connectWallet()}
          >
            {truncateEthAddress(accounts.toString())}
          </Box>
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
