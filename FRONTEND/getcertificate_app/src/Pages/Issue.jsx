import React, { useState } from 'react';
import { ethers } from 'ethers';
import Navbar from '../Components/Navbar';
import { Link } from 'react-router-dom';
import address from '../assets/deployed_addresses.json';
import ABI from '../assets/Certi.json';

const Issue = () => {
    const [FormData, setFormData] = useState({
        id: 0,
        name: '',
        course: '',
        grade: '',
        date: ''
    });

    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();
        setLoading(true);
        setStatus('');

        try {
            if (!window.ethereum) {
                throw new Error('MetaMask is not installed!');
            }

            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const cAbi = ABI.abi;
            const cAddress = address['CretiModule#Certi'];

            const certiInstance = new ethers.Contract(cAddress, cAbi, signer);
            console.log('Contract Instance:', certiInstance);

            console.log('FormData:', FormData);

            const txnReceipt = await certiInstance.issue(
                FormData.id,
                FormData.name,
                FormData.course,
                FormData.grade,
                FormData.date
            );

            console.log('Transaction Receipt:', txnReceipt);
            setStatus('Certificate issued successfully!');
        } catch (error) {
            console.error('Error:', error);
            setStatus(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    }

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    }

    return (
        <div className="bg-blue-100 h-screen">
            <Navbar />
            <div className="mt-0 text-blue-100">Certificate Dapp</div>
            <div className="mt-8 text-2xl ml-12 font-bold">Certificate Dapp</div>

            <form onSubmit={handleSubmit}>
                <div className="bg-fuchsia-100 indent-0 max-w-96 max-h-screen mt-12 mx-auto rounded-lg shadow-xl shadow-indigo-400">
                    <div className="pl-4">
                        <p className="mt-14 pt-6 pl-1 text-xl">Issue New Certificate</p>

                        {/* Course */}
                        <div className="mt-4">Select Course*</div>
                        <div className="mt-2">
                            <select
                                className="h-9 w-11/12"
                                required
                                name="course"
                                onChange={handleChange}
                                value={FormData.course}
                            >
                                <option value="">Select Course</option>
                                <option value="Certified Blockchain Associate">Certified Blockchain Associate</option>
                            </select>
                        </div>

                        {/* ID */}
                        <div className="mt-4">Certificate ID*</div>
                        <div className="mt-2">
                            <input
                                className="h-9 w-11/12"
                                required
                                type="text"
                                placeholder="Certificate ID"
                                name="id"
                                onChange={handleChange}
                                value={FormData.id}
                            />
                        </div>

                        {/* Name */}
                        <div className="mt-4">Candidate Name*</div>
                        <div className="mt-2">
                            <input
                                className="h-9 w-11/12"
                                required
                                type="text"
                                placeholder="Name"
                                name="name"
                                onChange={handleChange}
                                value={FormData.name}
                            />
                        </div>

                        {/* Grade */}
                        <div className="mt-4">Select Grade*</div>
                        <div className="mt-2">
                            <select
                                className="h-9 w-11/12"
                                required
                                name="grade"
                                onChange={handleChange}
                                value={FormData.grade}
                            >
                                <option value="">Select</option>
                                <option value="S">S</option>
                                <option value="A+">A+</option>
                                <option value="B+">B+</option>
                                <option value="C+">C+</option>
                                <option value="D+">D+</option>
                            </select>
                        </div>

                        {/* Date */}
                        <div className="mt-4">Issue Date*</div>
                        <div className="mt-2">
                            <input
                                className="h-9 w-11/12"
                                required
                                type="date"
                                name="date"
                                onChange={handleChange}
                                value={FormData.date}
                            />
                        </div>

                        {/* Submit */}
                        <div className="mt-4">
                            <button type="submit" className="h-9 w-32 bg-cyan-400" disabled={loading}>
                                {loading ? 'Issuing...' : 'Issue Certificate'}
                            </button>
                            <div className="mt-2 text-purple-600">{status}</div>
                            
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Issue;
