/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');
const path = require('path');
const fs = require('fs');


//importing files which contains our constructors and auxiliary function
let Patient = require('./Patient.js');
let Doctor = require('./Doctor.js')
let Report = require('./Report.js')

class MyAssetContract extends Contract {

    async init(ctx) {
        console.log('instantiate was called!');
    }

    async myAssetExists(ctx, myAssetId) {
        const buffer = await ctx.stub.getState(myAssetId);
        return (!!buffer && buffer.length > 0);
    }

    async createMyAsset(ctx, myAssetId, value) {
        const exists = await this.myAssetExists(ctx, myAssetId);
        if (exists) {
            throw new Error(`The my asset ${myAssetId} already exists`);
        }
        const asset = { value };
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(myAssetId, buffer);
    }

    async readMyAsset(ctx, args) {
        args = JSON.parse(args);
        let myAssetId = args.patientId;
        console.log("HELLO");
        console.log(myAssetId);
        const exists = await this.myAssetExists(ctx, myAssetId);
        if (!exists ) {
            throw new Error({"error":"The my asset ${myAssetId} does not exist"});
        }
        /*
        if ( args.pswd!="secret99" ){
            if( args.pswd!="doctor99"){
                return ({"error":"Wrong Password"})
            }
            
        }
        */
        const buffer = await ctx.stub.getState(myAssetId);
        const asset = JSON.parse(buffer.toString());
        return asset;
    }

    async checkMyAsset(ctx, args) {
      args = JSON.parse(args);
      let myAssetId = args.patientId;
      if(!myAssetId){
        myAssetId = args.doctorId;
      }
      console.log("HELLO");
      console.log(myAssetId);
      const exists = await this.myAssetExists(ctx, myAssetId);
      if (!exists ) {
          throw new Error({"error":"The my asset ${myAssetId} does not exist"});
      }
      if ( args.pswd!="secret99" ){
          if( args.pswd!="doctor99"){
              return ({"error":"Wrong Password"})
          }
      }
      
      const buffer = await ctx.stub.getState(myAssetId);
      if (buffer){
            return ({"Success":"Logged in successfully"});
          }
  }



    async updateMyAsset(ctx, myAssetId, newValue) {
        const exists = await this.myAssetExists(ctx, myAssetId);
        if (!exists) {
            throw new Error(`The my asset ${myAssetId} does not exist`);
        }
        const asset = { value: newValue };
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(myAssetId, buffer);
    }

    async deleteMyAsset(ctx, myAssetId) {
        const exists = await this.myAssetExists(ctx, myAssetId);
        if (!exists) {
            throw new Error(`The my asset ${myAssetId} does not exist`);
        }
        await ctx.stub.deleteState(myAssetId);
    }

    //My First Smart Contract

    async printSomething(ctx, text){

        return JSON.parse(text);
    }



/**
   *
   * createPatient
   *
   * Creates a voter in the world state, based on the args given.
   *  
   * @param args.adharNo - the adhar number of the patient 
   * @param args.name - name of patient 
   * @param args.age - age of patient
   * @param args.phNo - phone number of patient
   * @returns - nothing - but updates the world state with a new patient
   */
  async createPatient(ctx, args) {

    args = JSON.parse(args);

    //create a new Patient
    let newPatient = await new Patient(args.patientId, args.adharNo, args.name, args.age, args.phNo);

    //update state with new patient
    await ctx.stub.putState(newPatient.patientId, Buffer.from(JSON.stringify(newPatient)));

    let response = {"Success": `Patient with adharNo ${newPatient.adharNo} has been successfully updated in the world state of the EHR blockchain network`};
    console.log(response)
    return response;
  }


  async createDoctor(ctx, args) {

    args = JSON.parse(args);

    //create a new Doctor
    let newDoctor = await new Doctor(args.doctorId, args.licenseId, args.name, args.age, args.phNo);

    //update state with new Doctor
    await ctx.stub.putState(newDoctor.doctorId, Buffer.from(JSON.stringify(newDoctor)));

    let response = {"Success": `Doctor with licenseId ${newDoctor.licenseId} is updated in the world state of the EHR blockchain network`};
    return response;
  }



  async createReport(ctx, args) {

    args = JSON.parse(args);

    //check if the patient exists or not
    let myAssetId = args.patientId;
    const exists = await this.myAssetExists(ctx, myAssetId);
    if (!exists ) {
        throw new Error({"error":"The patient ${myAssetId} does not exist"});
    }
    let report = "abcdefghijklmnopqrstuvwxyz"
    //create a new Report Record
    let newReport = await new Report(args.reportId, args.patientId, report, "0", "0"/*,recordNo*/);

    //update state with new patient
    await ctx.stub.putState(newReport.reportId, Buffer.from(JSON.stringify(newReport)));

    let response = {"Success": `New report with reportId ${newReport.reportId} for Patient with patientId ${newReport.patientId} has been added to the world state of the EHR blockchain network`};
    console.log(response)
    return response;
  }



  async queryByObjectType(ctx, objectType) {

    let queryString = {
      selector: {
        type: objectType
      }
    };

    let queryResults = await this.queryWithQueryString(ctx, JSON.stringify(queryString));
    return queryResults;

  }



  async queryWithQueryString(ctx, queryString) {

    console.log('query String');
    console.log(JSON.stringify(queryString));

    let resultsIterator = await ctx.stub.getQueryResult(queryString);

    let allResults = [];

    // eslint-disable-next-line no-constant-condition
    while (true) {
      let res = await resultsIterator.next();

      if (res.value && res.value.value.toString()) {
        let jsonRes = {};

        console.log(res.value.value.toString('utf8'));

        jsonRes.Key = res.value.key;

        try {
          jsonRes.Record = JSON.parse(res.value.value.toString('utf8'));
        } catch (err) {
          console.log(err);
          jsonRes.Record = res.value.value.toString('utf8');
        }

        allResults.push(jsonRes);
      }
      if (res.done) {
        console.log('end of data');
        await resultsIterator.close();
        console.info(allResults);
        console.log(JSON.stringify(allResults));
        return JSON.stringify(allResults);
      }
    }
  }

  async checkExist(ctx, query){
    
    let queryString = {
      selector: {
        adharNo : query
      }
    };
    let queryResults = await this.queryWithQueryString(ctx, JSON.stringify(queryString));
    return queryResults;

  }

  async getPatients(ctx){

    let queryResults = await this.queryByObjectType(ctx, 'patient');
    return queryResults;

  }

  async getDoctors(ctx){

    let queryResults = await this.queryByObjectType(ctx, 'doctor');
    return queryResults;

  }
  

  async getReports(ctx){

    let queryResults = await this.queryByObjectType(ctx, 'report');
    return queryResults;

  }
  



  async requestAccess(ctx, args){

    args = JSON.parse(args);

    //check if the patient exists or not
    let myAssetId = args.patientId;
    const exists = await this.myAssetExists(ctx, myAssetId);
    if (!exists ) {
        throw new Error({"error":"The patient ${myAssetId} does not exist"});
    }


    //get the report object from the state - with the reportId the doctor picked
    let reportAsBytes = await ctx.stub.getState(args.reportId);
    let report = await JSON.parse(reportAsBytes);

    //update the isAsked flag for the report specified
    report.isAsked = "1";

    //update the state with the new flag isAsked value
    let result = await ctx.stub.putState(args.reportId, Buffer.from(JSON.stringify(report)));
    console.log(result);
    
    let response = {"Success": `The request access for the report with reportId ${report.reportId} has been notified to the patient with patientId ${myAssetId}. Please wait for the patient to respond to your request!`};
    console.log(response)
    return response;
  }



  
  async grantAccess(ctx, args){

    args = JSON.parse(args);

    //check if the patient exists or not
    let myAssetId = args.patientId;
    const exists = await this.myAssetExists(ctx, myAssetId);
    if (!exists ) {
        throw new Error({"error":"The patient ${myAssetId} does not exist"});
    }


    //get the report object from the state - with the reportId the doctor picked
    let reportAsBytes = await ctx.stub.getState(args.reportId);
    let report = await JSON.parse(reportAsBytes);

    //update the isGiven flag for the report specified
    report.isGiven = "1";

    //update the state with the new flag isAsked value
    let result = await ctx.stub.putState(args.reportId, Buffer.from(JSON.stringify(report)));
    console.log(result);
    
    let response = {"Success": `The access for the report with reportId ${report.reportId} has been granted successfully! The Doctor will be notified regarding this.`};
    console.log(response)
    return response;
  }



  
  async rejectAccess(ctx, args){

    args = JSON.parse(args);

    //check if the patient exists or not
    let myAssetId = args.patientId;
    const exists = await this.myAssetExists(ctx, myAssetId);
    if (!exists ) {
        throw new Error({"error":"The patient ${myAssetId} does not exist"});
    }


    //get the report object from the state - with the reportId the doctor picked
    let reportAsBytes = await ctx.stub.getState(args.reportId);
    let report = await JSON.parse(reportAsBytes);

    //update the isGiven flag for the report specified
    report.isGiven = "-1";

    //update the state with the new flag isAsked value
    let result = await ctx.stub.putState(args.reportId, Buffer.from(JSON.stringify(report)));
    console.log(result);
    
    let response = {"Success": `The access for the report with reportId ${report.reportId} has been rejected successfully! The Doctor will be notified regarding this.`};
    console.log(response)
    return response;
  }




  
  async resetAccess(ctx, args){

    args = JSON.parse(args);

    //check if the patient exists or not
    let myAssetId = args.patientId;
    const exists = await this.myAssetExists(ctx, myAssetId);
    if (!exists ) {
        throw new Error({"error":"The patient ${myAssetId} does not exist"});
    }


    //get the report object from the state - with the reportId the doctor picked
    let reportAsBytes = await ctx.stub.getState(args.reportId);
    let report = await JSON.parse(reportAsBytes);

    //update the isAsked and isGiven flags  to defaults for the report specified!
    report.isAsked = "0";
    report.isGiven = "0";

    //update the state with the new flag isAsked value
    let result = await ctx.stub.putState(args.reportId, Buffer.from(JSON.stringify(report)));
    console.log(result);
    
    let response = {"Success": `The flags have been reset to default values (0,0)`};
    console.log(response)
    return response;
  }


  async getReportData(ctx, args){
        args = JSON.parse(args);
        let myAssetId = args.reportId;
        console.log("Inside getReportData");
        console.log(myAssetId);
        const exists = await this.myAssetExists(ctx, myAssetId);
        if (!exists ) {
            throw new Error({"error":`The report ${myAssetId} does not exist`});
        }
        const buffer = await ctx.stub.getState(myAssetId);
        const asset = JSON.parse(buffer.toString());
        return asset;
    }




}

module.exports = MyAssetContract;
  