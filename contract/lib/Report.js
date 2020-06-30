'use strict';

class Report {
  /**
   *
   * Report
   *
   * Constructor for a Report object.    
   *  
   * @param args.licenseId - the license number of the Doctor 
   * @param args.name - name of Doctor
   * @param args.age - age of Doctor
   * @param args.phNo - phone number of Doctor
   * @returns - doctor object
   */
  constructor(reportId, patientId, report, isAsked, isGiven/*, recordNo*/) {

      this.reportId = reportId;
      this.patientId = patientId;
      this.report = report;
      this.isAsked = isAsked;
      this.isGiven = isGiven;
      this.type = 'report';

      return this;

    } 

  }



module.exports = Report;