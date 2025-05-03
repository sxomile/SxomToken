const hre = require("hardhat");

async function main() {  

    const SxomToken = await hre.ethers.getContractFactory("SxomToken");     
    const token = await SxomToken.deploy();

    console.log("Contract deployed to address:", token.target);

}

main().then(() => 
  process.exit(0)
).catch((error) => {        
   console.log(error);    
   process.exit(1);  
});