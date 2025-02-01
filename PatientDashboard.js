import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import lighthouse from '@lighthouse-web3/sdk';
import PatientDataManagement from '../contracts/PatientDataManagement.json';

const PatientDashboard = () => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState('');
  const [recordData, setRecordData] = useState('');
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('Not connected');
  const [isInitialized, setIsInitialized] = useState(false);

  const LIGHTHOUSE_API_KEY = 'ee48876f.fc01546ea3d840239d80ceef86bcb108'; // Replace with your actual API key

  // Initialize Web3 and Contract
  useEffect(() => {
    let mounted = true;

    const initWeb3 = async () => {
      if (!window.ethereum || isInitialized) return;

      try {
        // Add MetaMask event listeners
        const handleAccountsChanged = async (accounts) => {
          if (!mounted) return;
          if (accounts.length === 0) {
            setConnectionStatus('Please connect to MetaMask');
            setAccount('');
          } else if (accounts[0] !== account) {
            setAccount(accounts[0]);
            setConnectionStatus('Connected');
          }
        };

        const handleChainChanged = () => {
          if (!mounted) return;
          window.location.reload();
        };

        window.ethereum.on('accountsChanged', handleAccountsChanged);
        window.ethereum.on('chainChanged', handleChainChanged);

        // Check if already connected
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          const web3Instance = new Web3(window.ethereum);
          setWeb3(web3Instance);
          setAccount(accounts[0]);
          setConnectionStatus('Connected');

          // Initialize contract
          const networkId = await web3Instance.eth.net.getId();
          const deployedNetwork = PatientDataManagement.networks[networkId];
          if (deployedNetwork) {
            const instance = new web3Instance.eth.Contract(
              PatientDataManagement.abi,
              deployedNetwork.address
            );
            setContract(instance);
          }
        }

        setIsInitialized(true);

        // Cleanup function
        return () => {
          mounted = false;
          if (window.ethereum) {
            window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
            window.ethereum.removeListener('chainChanged', handleChainChanged);
          }
        };
      } catch (error) {
        console.error("Error in initialization:", error);
        setConnectionStatus('Initialization failed');
      }
    };

    initWeb3();
  }, [account, isInitialized]);

  const connectWallet = async () => {
    if (!window.ethereum) {
      setConnectionStatus('Please install MetaMask');
      return;
    }

    try {
      setConnectionStatus('Connecting...');
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts'
      });
      
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);
      setAccount(accounts[0]);
      setConnectionStatus('Connected');

      const networkId = await web3Instance.eth.net.getId();
      const deployedNetwork = PatientDataManagement.networks[networkId];
      
      if (deployedNetwork) {
        const instance = new web3Instance.eth.Contract(
          PatientDataManagement.abi,
          deployedNetwork.address
        );
        setContract(instance);
      } else {
        setConnectionStatus('Please connect to the correct network');
      }
    } catch (error) {
      console.error("Connection error:", error);
      setConnectionStatus('Connection failed');
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
    } else {
      alert('Please select a valid PDF file');
      setFile(null);
      e.target.value = '';
    }
  };

  const uploadToLighthouse = async () => {
    if (!file) return null;
    
    try {
      setUploading(true);
      const response = await lighthouse.uploadEncrypted(
        file,
        LIGHTHOUSE_API_KEY,
        account
      );
      return response.data.Hash;
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload file');
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!web3 || !contract || !account) {
      alert('Please connect to MetaMask first');
      return;
    }

    if (!recordData) {
      alert('Please enter record data');
      return;
    }

    try {
      let cid = null;
      if (file) {
        cid = await uploadToLighthouse();
        if (!cid) return;
      }

      const record = {
        data: recordData,
        pdfCID: cid || '',
        timestamp: Date.now()
      };

      await contract.methods
        .addRecord(JSON.stringify(record))
        .send({ from: account });

      alert('Record added successfully!');
      setRecordData('');
      setFile(null);
      document.querySelector('input[type="file"]').value = '';
    } catch (error) {
      console.error('Error adding record:', error);
      alert('Failed to add record');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Patient Records Dashboard</h2>
      
      <div style={{ 
        marginBottom: '20px', 
        padding: '10px', 
        backgroundColor: connectionStatus === 'Connected' ? '#e8f5e9' : '#ffebee',
        borderRadius: '4px'
      }}>
        <p>Status: {connectionStatus}</p>
        {connectionStatus !== 'Connected' && (
          <button 
            onClick={connectWallet}
            style={{
              padding: '8px 16px',
              backgroundColor: '#1976d2',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Connect MetaMask
          </button>
        )}
        {account && (
          <p>Connected Account: {account.substring(0, 6)}...{account.substring(38)}</p>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>
            Record Data:
            <input
              type="text"
              value={recordData}
              onChange={(e) => setRecordData(e.target.value)}
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </label>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>
            Upload PDF:
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </label>
        </div>

        {file && (
          <div style={{ marginBottom: '15px' }}>
            Selected file: {file.name}
          </div>
        )}

        <button
          type="submit"
          disabled={!web3 || uploading || connectionStatus !== 'Connected'}
          style={{
            padding: '10px 20px',
            backgroundColor: !web3 || uploading || connectionStatus !== 'Connected' ? '#cccccc' : '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: !web3 || uploading ? 'not-allowed' : 'pointer'
          }}
        >
          {uploading ? 'Uploading...' : 'Submit Record'}
        </button>
      </form>
    </div>
  );
};

export default PatientDashboard;