import React from 'react'
import {Link} from 'react-router-dom'
import {ethers }  from 'ethers'

const Navbar = () => {
  
  async function connectToMetamask() {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      console.log(signer);
      alert(`${signer.address} is logged in`);
    } catch (error) {
      if (error.code === 4001) {
        // User rejected access, handle accordingly
        alert("Please grant access to your MetaMask account.");
      } else {
        // Handle other errors, potentially with a retry mechanism
        console.error("Error connecting to MetaMask:", error);
      }
    }
  }
 
  return (
    <>
     <div className=" grid grid-cols-2" >
      <div className="mt-4 ml-4 text-xl">
        {/* <Link to="/">Login</Link> */}
      </div>
        <div className="flex justify-end mt-4">  
        <Link to="/" className="mr-32 text-xl mt-2 border-2 border-cyan-300 p-2  rounded-xl bg-cyan-300 ">Home</Link>  
        <Link to="" onClick={connectToMetamask} className="mr-32 text-xl mt-2">Connect Metamask</Link> 
            <Link to="/issue" className="mr-32 text-xl mt-2">Issue Certificate</Link> 
        </div>
        </div>
    
    </>
  )
}

export default Navbar