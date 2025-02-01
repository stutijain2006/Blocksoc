# Blockchain Based Patient Data Management 
This project is a **blockchain-based** patient data management system that allows **patients** to securely upload medical records (PDFs) to the blockchain, and **doctors** to request access to those records. It utilizes **Web3.js** (for blockchain interaction), **Lighthouse** (for decentralized file storage), and **React.js** (for the frontend).

## Key Features

- **Patients** can upload medical records as PDF files and store them on the blockchain.
- **Doctors** can request access to the patient's records using a **Record ID** and view the PDF file.
- **Decentralized File Storage** using **Lighthouse** to store PDF files securely.
- **Blockchain-based Data Management** using Ethereum smart contracts to store patient records and manage access requests.

## Main Components

### 1. React Frontend (Patient Dashboard & Doctor Dashboard)
- **Patient Dashboard**: 
  - Enter medical data (text) and upload a PDF file (e.g., medical report).
  - Upload the PDF to **Lighthouse** (decentralized storage).
  - Store the record (text data + file CID) on the **Ethereum blockchain**.
  
- **Doctor Dashboard**: 
  - Request access to a patient record using the **Record ID**.
  - View the PDF file and associated data once access is granted.

### 2. Web3 Blockchain Interaction
- Web3.js is used to interact with the **Ethereum blockchain**.
- The **smart contract** `PatientDataManagement` enables:
  - Adding records (medical data + file CID) to the blockchain.
  - Requesting access to patient data by doctors.

### 3. Lighthouse (File Storage)
- **Lighthouse** is used to store PDF files in a decentralized manner.
- When a patient uploads a PDF, it is sent to Lighthouse, and a **Content Identifier (CID)** is returned.
- The CID is stored on the blockchain alongside the record data. This CID points to the PDF stored on Lighthouse.

## Workflow

### 1. Patient's Role:
- The patient enters the **medical record data** (text) and selects a **PDF file** (e.g., report).
- The PDF is uploaded to **Lighthouse** via the frontend (using the **Lighthouse SDK**).
- After successful upload, the **CID** of the PDF is obtained.
- The **CID** and the medical data are combined and saved to the **Ethereum blockchain** through the smart contract.

### 2. Doctor's Role:
- The doctor enters a **Record ID** to request access to a patient's medical data.
- The system checks if access is allowed. If so, it retrieves the **CID** from the blockchain.
- The doctor can then view the PDF file by accessing **Lighthouse** using the CID.

## Key Functionalities

### 1. Uploading PDF File:
- A **file input** allows patients to select a PDF file.
- The file is uploaded to **Lighthouse**.
- Upon successful upload, the CID of the file is returned, and it is linked to the record.

### 2. Adding Record:
- Patients enter record data (text) and submit the record, which is stored on the **Ethereum blockchain**.
- If a file is uploaded, the CID is included in the blockchain record.
- Doctors can later access the record via the blockchain.

### 3. Access Control:
- Doctors can **request access** to a specific patient's record by entering the **Record ID**.
- Once granted, they can view the record and the PDF file (from Lighthouse).

## Flow Diagram
1. **Patient** → Uploads data and PDF → Stores data and CID on blockchain via Smart Contract.
2. **Doctor** → Requests Record ID → Retrieves CID from blockchain → Views the PDF from Lighthouse.

## Technologies Used:
- **React.js**: Frontend framework to create the dashboards for patients and doctors.
- **Web3.js**: Interacts with the Ethereum blockchain (smart contract).
- **Lighthouse**: Decentralized file storage to store the PDF files.
- **Ethereum**: Blockchain network for securing patient records.

## Blockchain Interaction:
- You interact with the Ethereum blockchain using **Web3**.
- Your **smart contract** defines the logic for adding records and controlling access.
- Patient records (including PDF CID) are stored in **transactions** on the blockchain.
- Only authorized users (e.g., doctors) can view the record upon request.

---

## Summary of User Flow:
1. **Patient**: Uploads medical data and PDF → Data stored on the blockchain and PDF on Lighthouse.
2. **Doctor**: Requests patient records using the Record ID → Retrieves CID and views PDF via Lighthouse.

This system ensures that the medical data is **secure**, **tamper-proof**, and **decentralized**, making it a strong solution for managing patient records with privacy and security.


The files and folders should be arranged in the following way in the local pc- 
Blockchain-Patient-Data-Management/
│
├── client/                         # Frontend React app
│   ├── public/
│   │   ├── index.html              # Basic HTML structure
│   │   └── ...
│   ├── src/
│   │   ├── components/             # React components (PatientDashboard, DoctorDashboard, etc.)
│   │   │   ├── PatientDashboard.js # Patient dashboard UI and logic
│   │   │   ├── DoctorDashboard.js  # Doctor dashboard UI and logic
│   │   │   └── ...
│   │   ├── contracts/              # Contract interaction (web3.js)
│   │   │   └── PatientDataManagement.json # ABI for interacting with smart contract
│   │   ├── App.js                  # Main App component (routes, etc.)
│   │   ├── index.js                # Entry point for React app
│   │   └── ...
│   ├── package.json                # NPM package dependencies for the frontend
│   └── ...
│
├── blockchain/                     # Ethereum smart contract folder
│   ├── contracts/                  # Solidity smart contracts
│   │   └── PatientDataManagement.sol # Solidity contract defining record storage and access
│   ├── migrations/                 # Migration scripts (e.g., deploy scripts)
│   │   └── 1_deploy_contracts.js    # Migration script for deploying the contract to Ethereum
│   ├── build/                      # Compiled contract files after deployment
│   └── ...
│
├── lighthouse/                     # Lighthouse-related files (for file uploading)
│   └── lighthouse-api-key.txt      # Store your Lighthouse API key here (for security)
│
├── .gitignore                      # Git ignore file to exclude node_modules and other unwanted files
├── README.md                       # Project overview and instructions
├── package.json                    # NPM dependencies for the backend
├── truffle-config.js               # Truffle configuration file (for managing blockchain connection)
└── ...
