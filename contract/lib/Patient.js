'use strict';

class Patient {
  /**
   *
   * Patient
   *
   * Constructor for a Patient object.    *   
   *  
   * @param args.adharNo - the adhar number of the patient 
   * @param args.name - name of patient 
   * @param args.age - age of patient
   * @param args.phNo - phone number of patient
   * @returns - patient object
   */
  constructor(patientId, adharNo, name, age, phNo) {

      this.patientId = patientId;
      this.adharNo = adharNo;
      this.name = name;
      this.age = age;
      this.phNo = phNo;
      this.type = 'patient';

      return this;

    } 

  }



module.exports = Patient;