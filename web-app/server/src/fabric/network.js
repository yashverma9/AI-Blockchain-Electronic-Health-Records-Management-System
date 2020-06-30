//Import Hyperledger Fabric 1.4 programming model - fabric-network
'use strict';

const { FileSystemWallet, Gateway, X509WalletMixin } = require('fabric-network');
const path = require('path');
const fs = require('fs');

//connect to the config file
const configPath = path.join(process.cwd(), './config.json');
const configJSON = fs.readFileSync(configPath, 'utf8');
const config = JSON.parse(configJSON);
let connection_file = config.connection_file;
// let userName = config.userName;
let gatewayDiscovery = config.gatewayDiscovery;
let appAdmin_pat = config.appAdmin_pat;
let appAdmin_doc = config.appAdmin_doc;
let orgMSPID_pat = config.orgMSPID_pat;
let orgMSPID_doc = config.orgMSPID_doc;

// connect to the connection file
const ccpPath = path.join(process.cwd(), connection_file);
const ccpJSON = fs.readFileSync(ccpPath, 'utf8');
const ccp = JSON.parse(ccpJSON);


const util = require('util');

exports.connectToNetwork = async function (userName) {
  
    const gateway = new Gateway();
  
    try {
      const walletPath = path.join(process.cwd(), 'wallet');
      const wallet = new FileSystemWallet(walletPath);
      console.log(`Wallet path: ${walletPath}`);
      console.log('userName: ');
      console.log(userName);
  
      console.log('wallet: ');
      console.log(util.inspect(wallet));
      console.log('ccp: ');
      console.log(util.inspect(ccp));
      // userName = 'V123412';
      const userExists = await wallet.exists(userName);
      if (!userExists) {
        console.log('An identity for the user ' + userName + ' does not exist in the wallet');
        console.log('Run the registerUser.js application before retrying');
        let response = {};
        response.error = 'An identity for the user ' + userName + ' does not exist in the wallet. Register ' + userName + ' first';
        return response;
      }
  
      console.log('before gateway.connect: ');
  
      await gateway.connect(ccp, { wallet, identity: userName, discovery: gatewayDiscovery });
  
      // Connect to our local fabric
      const network = await gateway.getNetwork('mychannel');
  
      console.log('Connected to mychannel. ');
      // Get the contract we have installed on the peer
      const contract = await network.getContract('contract');
  
  
      let networkObj = {
        contract: contract,
        network: network,
        gateway: gateway
      };
  
      return networkObj;
  
    } catch (error) {
      console.log(`Error processing transaction. ${error}`);
      console.log(error.stack);
      let response = {};
      response.error = error;
      return response;
    } finally {
      console.log('Done connecting to network.');
      // gateway.disconnect();
    }
  };


//Client application part for calling/invoking any smart contract function(query etc)
  
exports.invoke = async function (networkObj, isQuery, func, args) {
    try {
      console.log('inside invoke');
      console.log(`isQuery: ${isQuery}, func: ${func}, args: ${args}`);
      console.log(util.inspect(networkObj));
  
  
      // console.log(util.inspect(JSON.parse(args[0])));
  
      if (isQuery === true) {
        console.log('inside isQuery');
  
        if (args) {
          console.log('inside isQuery, args');
          args = JSON.parse(args[0]);
          console.log(util.inspect(args));
          args = JSON.stringify(args);
          console.log(util.inspect(args));

          console.log(args);
          let response = await networkObj.contract.evaluateTransaction(func, args);
          console.log(response);
          console.log(`Transaction ${func} with args ${args} has been evaluated`);
    
          await networkObj.gateway.disconnect();
    
          return response;
          
        } else {
  
          let response = await networkObj.contract.evaluateTransaction(func);
          console.log(response);
          console.log(`Transaction ${func} without args has been evaluated`);
    
          await networkObj.gateway.disconnect();
    
          return response;
        }
      } else {
        console.log('notQuery');
        if (args) {
          console.log('notQuery, args');
          console.log('$$$$$$$$$$$$$ args: ');
          console.log(args);
          console.log(func);
          console.log(typeof args);
  
          args = JSON.parse(args[0]);
  
          console.log(util.inspect(args));
          args = JSON.stringify(args);
          console.log(util.inspect(args));
  
          console.log('before submit');
          console.log(util.inspect(networkObj));
          let response = await networkObj.contract.submitTransaction(func, args);
          console.log('after submit');
  
          console.log(response);
          console.log(`Transaction ${func} with args ${args} has been submitted`);
    
          await networkObj.gateway.disconnect();
    
          return response;
  
  
        } else {
          let response = await networkObj.contract.submitTransaction(func);
          console.log(response);
          console.log(`Transaction ${func} with args has been submitted`);
    
          await networkObj.gateway.disconnect();
    
          return response;
        }
      }
  
    } catch (error) {
      console.error(`Failed to submit transaction: ${error}`);
      return error;
    }
  };






//Client application part for registering a new Patient


exports.registerPatient = async function (patientId, adharNo, name, age, phNo) {

 

  console.log('adharNo');
  console.log(adharNo);

  console.log('name');
  console.log(name);

if (!adharNo || !name || !age || !phNo) {
    let response = {};
    response.error = 'Error! You need to fill all fields before you can register!';
    return response;
  }

  try {

    // Create a new file system based wallet for managing identities.
    const walletPath = path.join(process.cwd(), 'wallet');
    const wallet = new FileSystemWallet(walletPath);
    console.log(`Wallet path: ${walletPath}`);
    console.log(wallet);

    // Check to see if we've already enrolled the user.
    const userExists = await wallet.exists(patientId);
    if (userExists) {
      let response = {};
      console.log(`An identity for the patient with patientId ${patientId} already exists in the wallet`);
      response.error = `Error! An identity for the patient with patientId ${patientId} already exists in the wallet.`;
      return response;
    }

    // Check to see if we've already enrolled the admin user.
    const adminExists = await wallet.exists(appAdmin_pat);
    if (!adminExists) {
      console.log(`An identity for the admin user ${appAdmin_pat} does not exist in the wallet`);
      console.log('Run the enrollAdmin.js application before retrying');
      let response = {};
      response.error = `An identity for the admin user ${appAdmin_pat} does not exist in the wallet. 
        Run the enrollAdmin.js application before retrying`;
      return response;
    }

    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    await gateway.connect(ccp, { wallet, identity: appAdmin_pat, discovery: gatewayDiscovery });

    // Get the CA client object from the gateway for interacting with the CA.
    const ca = gateway.getClient().getCertificateAuthority();
    const adminIdentity = gateway.getCurrentIdentity();
    console.log(`AdminIdentity: + ${adminIdentity}`);

    // Register the user, enroll the user, and import the new identity into the wallet.
    const secret = await ca.register({ affiliation: '', enrollmentID: patientId, role: 'client' }, adminIdentity);

    const enrollment = await ca.enroll({ enrollmentID: patientId, enrollmentSecret: secret });
    const userIdentity = await X509WalletMixin.createIdentity(orgMSPID_pat, enrollment.certificate, enrollment.key.toBytes());
    await wallet.import(patientId, userIdentity);
    console.log(`Successfully registered Patient ${name} . Use patientId ${patientId} and password: secret99 to login above.`); //password is static and set to secret99 for patients
    let response = `Successfully registered Patient ${name} . Use patientId ${patientId} and password: secret99 to login above.`;
    return response;
  } catch (error) {
    console.error(`Failed to register patient + ${adharNo} + : ${error}`);
    let response = {};
    response.error = error;
    return response;
  }
};


//Client application part for registering a new Doctor

 
exports.registerDoctor = async function (doctorId, licenseId, name, age, phNo) {

  console.log('LicenseId');
  console.log(licenseId);

  console.log('name');
  console.log(name);

if (!licenseId || !name || !age || !phNo) {
    let response = {};
    response.error = 'Error! You need to fill all fields before you can register!';
    return response;
  }

  try {

    // Create a new file system based wallet for managing identities.
    const walletPath = path.join(process.cwd(), 'wallet');
    const wallet = new FileSystemWallet(walletPath);
    console.log(`Wallet path: ${walletPath}`);
    console.log(wallet);

    // Check to see if we've already enrolled the user.
    const userExists = await wallet.exists(doctorId);
    if (userExists) {
      let response = {};
      console.log(`An identity for the user ${doctorId} already exists in the wallet`);
      response.error = `Error! An identity for the user ${doctorId} already exists in the wallet. Please enter a different license number.`;
      return response;
    }

    // Check to see if we've already enrolled the admin user.
    const adminExists = await wallet.exists(appAdmin_pat);
    if (!adminExists) {
      console.log(`An identity for the admin user ${appAdmin_pat} does not exist in the wallet`);
      console.log('Run the enrollAdmin.js application before retrying');
      let response = {};
      response.error = `An identity for the admin user ${appAdmin_pat} does not exist in the wallet. 
        Run the enrollAdmin.js application before retrying`;
      return response;
    }

    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    await gateway.connect(ccp, { wallet, identity: appAdmin_pat, discovery: gatewayDiscovery });

    // Get the CA client object from the gateway for interacting with the CA.
    const ca = gateway.getClient().getCertificateAuthority();
    const adminIdentity = gateway.getCurrentIdentity();
    console.log(`AdminIdentity: + ${adminIdentity}`);

    // Register the user, enroll the user, and import the new identity into the wallet.
    const secret = await ca.register({ affiliation: '', enrollmentID: doctorId, role: 'client' }, adminIdentity);

    const enrollment = await ca.enroll({ enrollmentID: doctorId, enrollmentSecret: secret });
    const userIdentity = await X509WalletMixin.createIdentity(orgMSPID_doc, enrollment.certificate, enrollment.key.toBytes());
    await wallet.import(doctorId, userIdentity);
    console.log(`Successfully registered Doctor ${name} . Use DoctorId ${doctorId} and password: doctor99 to login above.`); //password is static and set to doctor99 for doctors
    let response = `Successfully registered Doctor ${name} . Use DoctorId ${doctorId} and password: doctor99 to login above.`;
    return response;
  } catch (error) {
    console.error(`Failed to register doctor + ${licenseId} + : ${error}`);
    let response = {};
    response.error = error;
    return response;
  }
};