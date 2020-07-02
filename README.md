# AI Blockchain Electronic Health Records Management System


## Introduction

An Electronic Health Record (EHR) is an electronic version of a patient’s medical history that is maintained by a hospital or other organization over time. It includes all key administrative clinical data relevant to the patient along with all previous reports, X-rays, laboratory data, prescriptions and other forms of data describing past medical history. EHRs aren’t the boon to healthcare that everyone expected. They were introduced to make it easier for doctors to record and track patient’s data, improve care and the most important, support interoperability between multiple healthcare organizations.

The biggest challenges are security and interoperability, which makes maintaining these records a very tedious task. Further, it is a struggle for doctors to decode important information that the patient’s previous provider recorded. Thus, it is time to develop a new system based on effectively secure decentralized blockchain and a powerful AI algorithm to ease the processes involved in healthcare.

## Objective of the Project

The objective of our project is the evolution of Electronic Health Records to give healthcare providers access to various benefits for providing patients with the best care. Following are the benefits our system aims at:

* Collaboration Among Healthcare Organization-
With our system, providers across multiple specialties and different geographical locations can collaborate with great confidence for better treatment of patients. Blockchain makes this possible by giving the healthcare industry one consistent, standard database of real-time patient data to work with.

* Safe Data Exchanges
One of the biggest challenges is of sharing data securely in compliance with data safety regulations. Also due to patients not having an option to choose what they want to share they deny access to all of their protected health information to avoid any privacy related issues. Blockchain makes the data safe and also provides comprehensive data sharing options, allowing patients to unlock only the data that their healthcare providers need and keeping rest of the data private and secure.

* Valuable Insights for Better Care 
One of the complications of EHRs is the huge amount of data that is created every day. It can be a very tedious task for doctors to go through this vast data every time and might also lead to missing important data in between. AI programs in our system can help ease the physician’s work by extracting the most valuable information on analysis of the patient’s medical history. 

## Motivation :

We are living in an era where we are generating health data at an unprecedented rate, and storing this data on paper is technically impossible. This led to the introduction of Electronic Health Records (EHRs) in the previous few years. However, its benefits have never been properly utilized by healthcare providers due to lack of security and interoperability. The data stored in hospitals and other related organization is vulnerable to various security threats such as single point of failure and typical DDos attacks. Further it is needless to store the same patient’s records at different hospitals when it is possible to have one common database. Security being one of the aspects of our motivation, the other is getting relevant information out of patient’s vast medical history in less time. A lot of time is wasted by a doctor to go through the patient’s entire health records, which instead could have been utilized for better treatment of a patient. Thus, there is a need for a decentralized system to store medical records which can be secure as well as insightful helping the healthcare providers efficiently treat and care for a patient.

## Existing System vs Proposed System

### Existing System

The existing system utilized by healthcare providers to store patient data is an electronic system in which health records are created and managed in digital formats. The health records can consist of medical history including operations, hospitalizations, doctor’s prescriptions, medications, past diagnostic follow ups, lab reports or results and other administration related documents. This system is highly efficient over the former paper-based records which were ineffective and unreliable. However, the present system lacks on security and involves a lot of redundant data, eventually making it a very tedious task for doctors to go through them every time. 

### Proposed System

We propose on building an AI-Blockchain Electronic Health Records system on a web application using Flask web framework. The application will be integrated with Etherium based blockchain to make the patient’s data secure using reliable transactions. In our healthcare system a transaction equates to patients’ hospital visits, administration documents, diagnoses reports, treatment details, physician’s notes, laboratory results or reports, prescriptions, X-rays, outcomes etc. With our system, patients will have data sharing options. They now will have the right to choose what part of their medical history can be viewed by healthcare providers according to their need while keeping rest of the data private and secure. The system will also be powered by an AI algorithm based on machine learning and Natural Language Processing (NLP) to gain valuable insights and intuition from patient’s medical history. This model will be very useful for healthcare providers to treat their patients properly and efficiently. Blockchain being decentralized promotes interoperability across different hospitals or organizations and hence everyone can make use of one standard system to store health data.

## Tech Stacks Used

* **IBM's Hyperledger Fabric Blockchain Platform** 
* **MEVN Stack**

## Social Impact of Project 

Our system aims at easing the work of healthcare providers by securing medical data as well as by gaining important and relevant information from a patient’s medical history. By saving a lot of time and resources wasted in maintaining health records otherwise, doctors can utilize this time for better and efficient treatment of patients. Great care of patients will ultimately lead to a healthier society with first class healthcare providers. Hence our project has a great positive social and environmental impact.

## How to run

### Tools required:
* VS Code Editor <a href="https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwi8qoOwh67qAhX9xjgGHU1BCs4QjBAwAXoECAUQAg&url=https%3A%2F%2Fcode.visualstudio.com%2Fdownload&usg=AOvVaw11fc5fOXYIyxQh75jYLjXg">(Refer this for installation)</a>
* IBM Blockchain Platform extension on VS code <a href="https://marketplace.visualstudio.com/items?itemName=IBMBlockchain.ibm-blockchain-platform">(Refer this for installation)</a>

* Docker Desktop <a href="https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwjvrbKEh67qAhUzzTgGHXwuB_sQFjACegQIDBAG&url=https%3A%2F%2Fdocs.docker.com%2Fdocker-for-windows%2Finstall%2F&usg=AOvVaw2zo9suoRfAYuT_3irhySPG">(Refer this for installation)</a>


### Installation of used Libraries
~~~
apt-get install python-software-properties
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash –
apt-get install nodejs

npm install -g @vue/cli
npm install axios
npm install formidable

sudo apt install python3
pip install glob
pip install docx2txt
pip install networkx
pip install sklearn
pip install re
pip install nltk
pip install unicodedata
pip install pattern3
~~~

### Steps to run

1. Git Clone this repository to your system
```
git clone https://github.com/yashverma9/AI-Blockchain-Electronic-Health-Records-Management-System
```

2. Start Docker Desktop on your system

3. In the terminal navigate to the repository directory
```
cd AI-Blockchain-Electronic-Health-Records-Management-System
```
4. Open VS Code in the same directory
```
code .
```

5. Open the IBM Blockchain Platform extension. Start a new fabric runtime using default template of 2 ORG, 2CA. Package the contract folder using the 'PACKAGE OPEN PROJECT' option. Now install and instantiate the smart contract on the peers. Export the connection profile to server folder and the wallets as well. <a href="https://developer.ibm.com/tutorials/ibm-blockchain-platform-vscode-smart-contract/">(Refer this for more detailed steps)</a>

6. Open two terminals simultaneously in VS Code.

7. In the 1st terminal start the server side
```
cd web-app/server
npm install
npm start
```

8. In the 2nd terminal start the client side
```
cd web-app/client
npm install
npm run serve
```

9. Your application is running, go to the link specified to open it!


## Implementation Demo : 

### 1. Home Page
<br>
<p align="center">
  <img src="gif/Home.gif">
</p>
<br>

### 2. Patient Home
<br>
<p align="center">
  <img src="gif/Patient-Login-Without-Permission.gif">
</p>
<br>


### 3. Doctor asking for permission from patient
<br>
<p align="center">
  <img src="gif/Doctor-Logins-Asks-Permission.gif">
</p>
<br>

### 4. Patient grants permission to the doctor for the specific report
<br>
<p align="center">
  <img src="gif/Patient-Logins-Grants-Permission.gif">
</p>
<br>

### 5. Doctor view reports and summary of the reports
<br>
<p align="center">
  <img src="gif/Doctor-Downloads-Report.gif">
</p>
<br>
