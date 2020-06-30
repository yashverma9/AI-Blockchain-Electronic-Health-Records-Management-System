'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const util = require('util');
const path = require('path');
const fs = require('fs');

let network = require('./fabric/network.js');

const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

const configPath = path.join(process.cwd(), './config.json');
const configJSON = fs.readFileSync(configPath, 'utf8');
const config = JSON.parse(configJSON);



//use these identities for general queries
const appAdmin_pat = config.appAdmin_pat;
const appAdmin_doc = config.appAdmin_doc;

//use this identity to query
//const appAdmin = config.appAdmin;
/*
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8081/RegisterPatient"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

*/

app.get('/api/printSomething', async (req, res) => {

    let networkObj = await network.connectToNetwork(appAdmin_pat);
    let response = await network.invoke(networkObj, true, 'printSomething', '{"Name":"Saxena","Emote":"Take the L"}');
    let parsedResponse = await JSON.parse(response);
    res.send(response);

});



//get Patient info, create patient object, and update state with their 
app.post('/registerPatient', async (req, res) => {
    console.log('req.body: ');
    console.log(req.body);
    let adharNo = req.body.adharNo;
    let patientId = Date.now().toString();
    req.body.patientId = patientId;

    //check weather he is registered already or not
    let networkObj = await network.connectToNetwork(appAdmin_pat);
    let check = await network.invoke(networkObj, true, 'checkExist', req.body.adharNo);
    let parsedCheck = await JSON.parse(check);
    console.log(parsedCheck);
    if (!(Object.keys(parsedCheck).length === 0 && obj.constructor === Object)){
      res.send({"error":"The patient is already registered"});
    }
  
    //first create the identity for the patient and add to wallet
    let response = await network.registerPatient(patientId, adharNo, req.body.name, req.body.age, req.body.phNo);
    console.log('response from registerPatient: ');
    console.log(response);
    if (response.error) {
      res.send(response.error);
    } else {
      console.log('req.body.adharNo');
      console.log(req.body.adharNo);
      networkObj = await network.connectToNetwork(patientId);
      console.log('networkobj: ');
      console.log(networkObj);
  
      if (networkObj.error) {
        res.send(networkObj.error);
      }
      console.log('network obj');
      console.log(util.inspect(networkObj));
  
  
      req.body = JSON.stringify(req.body);
      let args = [req.body];
      //connect to network and update the state  
  
      let invokeResponse = await network.invoke(networkObj, false, 'createPatient', args);
      
      if (invokeResponse.error) {
        res.send(invokeResponse.error);
      } else {
  
        console.log('after network.invoke ');
        let parsedResponse = JSON.parse(invokeResponse);
        parsedResponse.Success += `. Use patientId ${patientId} and password secret99 to login above.`;
        
        res.send(parsedResponse);
  
      }
  
    }
  
  
  });
  
  //used as a way to login the Patient to the app and make sure they haven't voted before 
  app.post('/validatePatient', async (req, res) => {
    console.log('req.body: ');
    console.log(req.body);
    let networkObj = await network.connectToNetwork(req.body.patientId);
    console.log('networkobj: ');
    console.log(util.inspect(networkObj));
  
    if (networkObj.error) {
      res.send(networkObj);
    }
    req.body = JSON.stringify(req.body);
    let args = [req.body];
    let invokeResponse = await network.invoke(networkObj, true, 'checkMyAsset', args);
    if (invokeResponse.error) {
      res.send(invokeResponse);
    } else {
      console.log('after network.invoke ');
      let parsedResponse = await JSON.parse(invokeResponse);
      // let response = `Patient with adharNo ${parsedResponse.adharNo} is logged in!.`  
      res.send(parsedResponse);
    }
  
  });









//get Doctor info, create doctor object, and update state with their 
app.post('/registerDoctor', async (req, res) => {
  console.log('req.body: ');
  console.log(req.body);
  let licenseId = req.body.licenseId;
  let doctorId = Date.now().toString();
  req.body.doctorId = doctorId;

  //first create the identity for the patient and add to wallet
  let response = await network.registerDoctor(doctorId, licenseId, req.body.name, req.body.age, req.body.phNo);
  console.log('response from registerDoctor: ');
  console.log(response);
  if (response.error) {
    res.send(response.error);
  } else {
    console.log('req.body.licenseId');
    console.log(req.body.licenseId);
    let networkObj = await network.connectToNetwork(doctorId);
    console.log('networkobj: ');
    console.log(networkObj);

    if (networkObj.error) {
      res.send(networkObj.error);
    }
    console.log('network obj');
    console.log(util.inspect(networkObj));


    req.body = JSON.stringify(req.body);
    let args = [req.body];
    //connect to network and update the state  

    let invokeResponse = await network.invoke(networkObj, false, 'createDoctor', args);
    
    if (invokeResponse.error) {
      res.send(invokeResponse.error);
    } else {

      console.log('after network.invoke ');
      let parsedResponse = JSON.parse(invokeResponse);
      parsedResponse.Success += `. Use doctorId ${doctorId} and password doctor99 to login above.`;
      res.send(parsedResponse);

    }

  }


});




//used as a way to login the Doctor to the app and make sure they haven't voted before 
app.post('/validateDoctor', async (req, res) => {
  console.log('req.body: ');
  console.log(req.body);
  let networkObj = await network.connectToNetwork(req.body.doctorId);
  console.log('networkobj: ');
  console.log(util.inspect(networkObj));

  if (networkObj.error) {
    res.send(networkObj);
  }

  req.body = JSON.stringify(req.body);
  let args = [req.body];
  let invokeResponse = await network.invoke(networkObj, true, 'checkMyAsset', args);
  if (invokeResponse.error) {
    res.send(invokeResponse);
  } else {
    console.log('after network.invoke ');
    let parsedResponse = await JSON.parse(invokeResponse);
    // let response = `Doctor with adharNo ${parsedResponse.licenseId} is logged in!.`  
    res.send(parsedResponse);
  }

});



app.post('/postReport', async (req, res) => {
  console.log('req.body: ');
  console.log(req.body);
  let networkObj = await network.connectToNetwork(req.body.patientId);
  console.log('networkobj: ');
  console.log(util.inspect(networkObj));

  if (networkObj.error) {
    res.send(networkObj);
  }
  let reportId = Date.now().toString();
  req.body.reportId = reportId;

  req.body = JSON.stringify(req.body);
  let args = [req.body];
  let invokeResponse = await network.invoke(networkObj, false, 'createReport', args);

  res.send(invokeResponse);


});





app.get('/getPatients', async (req, res) => {

  let networkObj = await network.connectToNetwork(appAdmin_pat);
  console.log('networkobj: ');
  console.log(util.inspect(networkObj));

  let response = await network.invoke(networkObj, true, 'getPatients', '');
  let parsedResponse = await JSON.parse(response);
  console.log(parsedResponse);
  res.send(parsedResponse);

});

app.get('/getDoctors', async (req, res) => {
  let networkObj = await network.connectToNetwork(appAdmin_doc);
  //console.log('networkobj: ');
  //console.log(util.inspect(networkObj));

  let response = await network.invoke(networkObj, true, 'getDoctors', '');
  let parsedResponse = await JSON.parse(response);
  res.send(parsedResponse);


});


app.get('/getReports', async (req, res) => {
  let networkObj = await network.connectToNetwork(appAdmin_pat);
  //console.log('networkobj: ');
  //console.log(util.inspect(networkObj));

  let response = await network.invoke(networkObj, true, 'getReports', '');
  let parsedResponse = await JSON.parse(response);
  res.send(parsedResponse);


});

// app.post('/getReports', async (req, res) => {
//   let networkObj = await network.connectToNetwork(appAdmin_pat);
//   //console.log('networkobj: ');
//   //console.log(util.inspect(networkObj));

//   let response = await network.invoke(networkObj, true, 'getReports', req.body.patientId);
//   let parsedResponse = await JSON.parse(response);
//   res.send(parsedResponse);


// });



//This will be used to ask for access to a report of a patient

app.post('/requestAccess', async (req, res) => {
  let networkObj = await network.connectToNetwork(req.body.patientId);
  console.log('util inspecting');
  console.log(util.inspect(networkObj));
  req.body = JSON.stringify(req.body);
  console.log('req.body');
  console.log(req.body);
  let args = [req.body];

  let response = await network.invoke(networkObj, false, 'requestAccess', args);
  if (response.error) {
    res.send(response.error);
  } else {
    console.log('response: ');
    console.log(response);
    // let parsedResponse = await JSON.parse(response);
    res.send(response);
  }
});




//This will be used to grant access of a report to the doctor requesting access

app.post('/grantAccess', async (req, res) => {
  let networkObj = await network.connectToNetwork(req.body.patientId);
  console.log('util inspecting');
  console.log(util.inspect(networkObj));
  req.body = JSON.stringify(req.body);
  console.log('req.body');
  console.log(req.body);
  let args = [req.body];

  let response = await network.invoke(networkObj, false, 'grantAccess', args);
  if (response.error) {
    res.send(response.error);
  } else {
    console.log('response: ');
    console.log(response);
    // let parsedResponse = await JSON.parse(response);
    res.send(response);
  }
});


//This will be used to reject access of a report to the doctor requesting access

app.post('/rejectAccess', async (req, res) => {
  let networkObj = await network.connectToNetwork(req.body.patientId);
  console.log('util inspecting');
  console.log(util.inspect(networkObj));
  req.body = JSON.stringify(req.body);
  console.log('req.body');
  console.log(req.body);
  let args = [req.body];

  let response = await network.invoke(networkObj, false, 'rejectAccess', args);
  if (response.error) {
    res.send(response.error);
  } else {
    console.log('response: ');
    console.log(response);
    // let parsedResponse = await JSON.parse(response);
    res.send(response);
  }
});



//This will be used to reset the flags of a report of a patient

app.post('/resetAccess', async (req, res) => {
  let networkObj = await network.connectToNetwork(req.body.patientId);
  console.log('util inspecting');
  console.log(util.inspect(networkObj));
  req.body = JSON.stringify(req.body);
  console.log('req.body');
  console.log(req.body);
  let args = [req.body];

  let response = await network.invoke(networkObj, false, 'resetAccess', args);
  if (response.error) {
    res.send(response.error);
  } else {
    console.log('response: ');
    console.log(response);
    // let parsedResponse = await JSON.parse(response);
    res.send(response);
  }
});



app.post('/getReportData', async (req, res) => {
  let networkObj = await network.connectToNetwork(req.body.patientId);
  console.log('util inspecting');
  console.log(util.inspect(networkObj));
  req.body = JSON.stringify(req.body);
  console.log('req.body');
  console.log(req.body);
  let args = [req.body];

  let response = await network.invoke(networkObj, true, 'getReportData', args);
  if (response.error) {
    res.send(response.error);
  } else {
    console.log('response: ');
    console.log(response);
    // let parsedResponse = await JSON.parse(response);
    res.send(response);
  }
});


app.listen(process.env.PORT || 8080);