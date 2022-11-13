// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// "https://ipfs.filebase.io/ipfs/Qma5H91bsSH17UQC4sHMTGG9kyuAZn9AdXXxqF1BGyKFgJ"
// contract-address = 0x90A3313213998BcEfDFDBEF04829cDb7eB62A308

contract RoboPunk is ERC721, Ownable, ERC721URIStorage {
    uint256 public mintPrice = 0.05 ether;
    uint256 public maxSupply = 1000;
    uint256 public totalSupply;
    uint256 public maxPerWallet = 3;
    bool public isPublicMintEnabled;
    // address payable owner;

    mapping(address => uint8) public walletMints;

    constructor() payable ERC721("RoboPunks", "RP") {}

    function setIsPublicMintEnabled(bool isPublicMintEnabled_)
        external
        onlyOwner
    {
        isPublicMintEnabled = isPublicMintEnabled_;
    }

    function withdrawMoney() external onlyOwner {
        address payable to = payable(msg.sender);
        to.transfer(address(this).balance);
    }

    function viewBalance() external view onlyOwner returns (uint256) {
        return address(this).balance;
    }

    function mint(string memory tokenURI_) public payable {
        require(isPublicMintEnabled, "Minting is Not Allowed RN");
        require(mintPrice <= msg.value, "Wrong Mint Value");
        require(totalSupply <= maxSupply, "SoldOut");
        require(walletMints[msg.sender] < maxPerWallet, "limit Exceeded");

        uint256 newtokenId = totalSupply + 1;
        totalSupply++;
        _safeMint(msg.sender, newtokenId);
        _setTokenURI(newtokenId, tokenURI_);
    }

    //Requied because of inheritance

    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
}
