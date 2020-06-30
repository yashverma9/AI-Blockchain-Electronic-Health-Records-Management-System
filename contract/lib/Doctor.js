'use strict';

class Doctor {
  /**
   *
   * Doctor
   *
   * Constructor for a Doctor object.    
   *  
   * @param args.licenseId - the license number of the Doctor 
   * @param args.name - name of Doctor
   * @param args.age - age of Doctor
   * @param args.phNo - phone number of Doctor
   * @returns - doctor object
   */
  constructor(doctorId, licenseId, name, age, phNo) {

      this.doctorId =  doctorId;
      this.licenseId = licenseId;
      this.name = name;
      this.age = age;
      this.phNo = phNo;
      this.type = 'doctor';

      return this;

    } 

  }



module.exports = Doctor;