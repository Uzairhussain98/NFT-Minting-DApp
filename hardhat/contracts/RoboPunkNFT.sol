// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RoboPunksNFT is ERC721, Ownable {
    uint256 public mintPrice;
    uint256 public totalSupply = 10000;
    uint256 public maxSupply;
    uint256 public maxPerWallet;
    bool public isPublicMintEnabled;
    string internal baseTokenURI;
    address payable public withDrawWallet;
    mapping(address => uint256) public walletMints;

    constructor() payable ERC721("RoboPunks", "RP") {
        mintPrice = 0.02 ether;
        totalSupply = 0;
        maxPerWallet = 2;
        //withdrawWalletAddress
    }

    function setIsPublicMintEnabled(bool isPublicMintEnabled_)
        external
        onlyOwner
    {
        isPublicMintEnabled = isPublicMintEnabled_;
    }

    // function setBaseTokenURI(string calldata baseTokenURI_) external onlyOwner {
    //     baseTokenURI = baseTokenURI_;
    // }

    // function tokenURI(uint256 tokenId_)
    //     public
    //     view
    //     override
    //     returns (string memory)
    // {
    //     require(_exists(tokenId_), "Token Does Not Exists");
    //     return
    //         string(
    //             abi.encodePacked(
    //                 baseTokenURI,
    //                 Strings.toString(tokenId_),
    //                 ".json"
    //             )
    //         );
    // }

    function withDraw() external onlyOwner {
        (bool success, ) = withDrawWallet.call{value: address(this).balance}(
            ""
        );
        require(success, "withdraw Failed");
    }

    function mint(uint256 quantity_) public payable {
        require(isPublicMintEnabled, "Minting is Not Allowed RN");
        require(msg.value == quantity_ * mintPrice, "Wrong Mint Value");
        require(totalSupply + quantity_ <= maxSupply, "SoldOut");
        require(
            walletMints[msg.sender] + quantity_ <= maxPerWallet,
            "limit Exceeded"
        );

        for (uint256 i = 0; i < quantity_; i++) {
            uint256 newtokenId = totalSupply + 1;
            totalSupply++;
            _safeMint(msg.sender, newtokenId);
        }
    }
}
