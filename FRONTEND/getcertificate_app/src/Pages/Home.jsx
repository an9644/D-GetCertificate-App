import React, { useState } from 'react';
import Navbar from '../Components/Navbar';
import bg from '../assets/Images/certi.png';
import ABI from '../assets/Certi.json';
import address from '../assets/deployed_addresses.json';
import { ethers } from 'ethers';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [output, setOutput] = useState('');
  const navigate = useNavigate();

  async function getCertificate() {
    try {
      const id = document.getElementById('ID').value;
      if (!id) {
        alert('Please enter a certificate ID');
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const cAbi = ABI.abi;
      const cAddress = address['CretiModule#Certi'];

      const certiInstance = new ethers.Contract(cAddress, cAbi, signer);
      const txValue = await certiInstance.Certificates(id);

      console.log('Certificate Details:', txValue);

      // Pass certificate data to the View page
      navigate('/view', {
        state: {
          name: txValue[0],
          course: txValue[1],
          grade: txValue[2],
          date: txValue[3],
        },
      });
    } catch (error) {
      console.error('Error fetching certificate:', error);
      alert('Failed to fetch certificate details. Please try again.');
    }
  }

  return (
    <div className="bg-blue-100 h-screen">
      <Navbar />
      <div className="mt-0 text-blue-100">Certificate Dapp</div>
      <div className="mt-24 text-center text-4xl font-bold">Certificate Dapp</div>
      <div className="flex justify-center mt-12">
        <img src={bg} width="180" height="180" alt="" />
      </div>
      <div className="flex justify-center mt-10 ml-7">
        <input
          className="border border-cyan-400"
          type="text"
          id="ID"
          placeholder="Enter certificate ID To View"
        />
        &nbsp;
        <input
          className="bg-cyan-400 w-24 h-8"
          type="button"
          onClick={getCertificate}
          value="Search"
        />
      </div>
    </div>
  );
};

export default Home;
