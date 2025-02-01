import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import PatientDataManagement from '../contracts/PatientDataManagement.json';

const DoctorDashboard = () => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState('');
  const [recordId, setRecordId] = useState('');

  useEffect(() => {
    const init = async () => {
      try {
        const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
        setWeb3(web3);

        const accounts = await web3.eth.requestAccounts();
        setAccount(accounts[0]);

        const networkId = await web3.eth.net.getId();
        const deployedNetwork = PatientDataManagement.networks[networkId];
        if (!deployedNetwork) {
          alert('Smart contract not deployed on this network');
          return;
        }

        const contract = new web3.eth.Contract(
          PatientDataManagement.abi,
          deployedNetwork.address
        );
        setContract(contract);
      } catch (error) {
        console.error('Error initializing:', error);
      }
    };
    init();
  }, []);

  const requestAccess = async () => {
    try {
      await contract.methods.requestAccess(recordId).send({ from: account });
      alert('Access requested!');
    } catch (error) {
      console.error('Error requesting access:', error);
      alert('Error requesting access. Please try again.');
    }
  };

  return (
    <div className="dashboard">
      <h1>Doctor Dashboard</h1>
      <div className="form-container">
        <input
          type="text"
          placeholder="Enter Record ID"
          value={recordId}
          onChange={(e) => setRecordId(e.target.value)}
        />
        <button onClick={requestAccess}>Request Access</button>
      </div>
    </div>
  );
};

export default DoctorDashboard;
