# Patient Data Management 
Your project allows patients to securely upload medical records (PDFs) to the blockchain, and doctors to request access to those records. The system leverages Web3 (for blockchain interaction), Lighthouse (for decentralized file storage), and React for the frontend.

#Main Components:
React Frontend (Patient Dashboard & Doctor Dashboard):

Patient Dashboard: Allows patients to:
Enter medical data (text records) and upload a PDF file (e.g., a medical report).
Upload the file to Lighthouse (decentralized storage).
Store the record (text data + file CID) on the Ethereum blockchain.
Doctor Dashboard: Allows doctors to:
Request access to patient records using the Record ID.
View the PDF file and related data once access is granted.
Web3 Blockchain Interaction:

You use Web3.js to interact with the Ethereum blockchain.
The smart contract PatientDataManagement enables:
Adding records (medical data + file CID) to the blockchain.
Requesting access to patient data by doctors.
Lighthouse (File Storage):

Lighthouse stores the PDF files in a decentralized manner.
When a patient uploads a PDF, it is sent to Lighthouse, and a Content Identifier (CID) is returned.
The CID is stored on the blockchain alongside the record data. This CID points to the PDF stored on Lighthouse.
#Workflow:
Patient's Role:

The patient enters the medical record data (text) and selects a PDF file (e.g., report).
The PDF is uploaded to Lighthouse via the frontend (using the Lighthouse SDK).
After successful upload, the CID of the PDF is obtained.
The CID and the medical data are combined and saved to the Ethereum blockchain through the smart contract.
Doctor's Role:

The doctor enters a Record ID to request access to a patient's medical data.
The system checks if access is allowed. If so, it retrieves the CID from the blockchain.
The doctor can then view the PDF file by accessing Lighthouse using the CID.
Key Functionalities:
Uploading PDF File:

A file input allows patients to select a PDF file.
The file is uploaded to Lighthouse.
Upon successful upload, the CID of the file is returned, and it is linked to the record.
Adding Record:

Patients enter record data (text) and submit the record, which is stored on the Ethereum blockchain.
If a file is uploaded, the CID is included in the blockchain record.
Doctors can later access the record via the blockchain.
Access Control:

Doctors can request access to a specific patient's record by entering the Record ID.
Once granted, they can view the record and the PDF file (from Lighthouse).
#Flow Diagram:
Patient → Uploads data and PDF → Stores data and CID on blockchain via Smart Contract.
Doctor → Requests Record ID → Retrieves CID from blockchain → Views the PDF from Lighthouse.
Technologies Used:
React.js: Frontend framework to create the dashboards for patients and doctors.
Web3.js: Interacts with the Ethereum blockchain (smart contract).
Lighthouse: Decentralized file storage to store the PDF files.
Ethereum: Blockchain network for securing patient records.
Blockchain Interaction:
You interact with the Ethereum blockchain using Web3.
Your smart contract defines the logic for adding records and controlling access.
Patient records (including PDF CID) are stored in transactions on the blockchain.
Only authorized users (e.g., doctors) can view the record upon request.
Summary of User Flow:
Patient: Uploads medical data and PDF → Data stored on the blockchain and PDF on Lighthouse.
Doctor: Requests patient records using the Record ID → Retrieves CID and views PDF via Lighthouse.
So, Basically this is a website which manages the data of a patient, where there are 2 parts i.e. first is patients interactive one where they uplaod the Patients Healthcare report, and second part is Doctor's interactive one where they request the access for that report. 
The whole process is completely encrypted where the data of one patient will not be available to another patient until and ulness someone with the patient id ask for the access and the patient provides the following user with the access. 
