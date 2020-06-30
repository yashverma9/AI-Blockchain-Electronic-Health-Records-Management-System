<template>
    <div>
       <div  v-show="pgiven" >
        
          <!-- <h1>{{filter}}</h1> -->
          <form @submit="download" enctype=multipart/form-data>
                              
                                <input type="submit" value="download" name="dr" class="padding">
                        </form>
        </div>
                            <h1>{{pnotgiven}}</h1>
      {{pid}}
        <!-- <h1>inside doctor d</h1> -->
           <div class="gridcontainer">
            <div class="griditem  griditem1" style="overflow-x:auto;" >griditem1
            <table style="width:100%">
          <tr>
            <th>Patient Name</th>
            <th>Patient Id</th>
            <!-- <th>Patient Phno</th>
            <th>Patient Age</th> -->
          </tr>
          <tr  v-for = "patientdata in patientdatas" :key="patientdata.Key">
            <td>{{patientdata.Record.name}}</td>
            <td>{{patientdata.Record.patientId}}</td>
            <!-- <td>{{patientdata.Record.phNo}}</td>
            <td>{{patientdata.Record.age}}</td> -->
          </tr>
          
        </table>

            </div>



            <div class="griditem  griditem2">
                <div class="flexboxcontainer">
                    <div class="container flexboxitem flexboxitem1">
                        <h2>View Report</h2>
                        
                        <form @submit="fs" enctype=multipart/form-data>
                                <label for="fname">Patient ID:</label><br>
                                <input type="text" id="fname" name="patid"  v-model="patid"  value=""  placeholder="Enter Patient ID" class="padding"><br>
                                <input type="submit" value="Request Access" name="dr" class="padding">
                        </form>

                         
                        

                           
                    
                         <!-- <h1>{{dgiven[0][0]}}</h1> -->
                         <h1>{{filter}}</h1>
                    </div>

                      <div class="container flexboxitem flexboxitem1">
                        <h2> Reports</h2>
                         
                         <h1>{{filter}}</h1>

                          <form @submit="fs1" enctype=multipart/form-data>
                                <label for="fname">Enter Report Id </label><br>
                                <input type="text" id="fname" name="reportid"  v-model="reportid"  value=""  placeholder="Enter Patient ID" class="padding"><br>
                                <input type="submit" value="Submit" name="dr" class="padding">
                                <h4>{{serverresponse.Success}}</h4>
                        </form>
                           <form  @submit="r"  enctype=multipart/form-data>
                                    
                                <input type="submit" value="Refresh" name="r" class="padding">
                            </form>
                           
                        
                    </div>

                    <div class="container flexboxitem flexboxitem2">
                        <h2>Summarize Report</h2>
                        <form action="">
                            <label for="fname">Patient ID:</label><br>
                            <input type="text" id="fname" name="fname" placeholder="Enter Patient ID" class="padding"><br>
                            <!-- <input type="file" id="myfile" name="myfile" style="margin-left: 3em;" class="padding"> -->
                            <input type="submit" value="Summarize Report" class="padding">
                        </form>
                    </div>

                     <!-- <div class="container flexboxitem flexboxitem3">
                        <h2>Summarize Report</h2>
                        <form action="doctor.html" method="POST" enctype=multipart/form-data>
                            <label for="fname" class="padding">Upload Patient Report:</label><br>
                            <input type="file" id="myfile" name="myfile" style="margin-left: 3em;" class="padding">
                            <input type="submit" value="Upload Report" name="ur" class="padding"><br>
                            
                              <form action="doctor.html" method="POST" enctype=multipart/form-data>
                                <input type="submit" value="Summarize" name="sum" >
                              </form>
                              </form>
                            
                    </div>  -->
                </div>
                
            </div>
            <div class="griditem  griditem3">
                <div class="sumcontainer">
                    <h2>Summary:</h2>
                   
                </div>
            </div> 
            
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    name:"doctord",
async mounted() {
    // console.log("created");
    // this.x = 99;

    let res = await axios.get('http://localhost:8080/getPatients');

    let data = res.data;
    this.patientdatas = data;
    console.log("this is patient data")
   console.log(data)
 

    
    let res1 = await axios.get('http://localhost:8080/getDoctors');

    let data1 = res1.data;
    this.doctordatas = data1;
    console.log("this is doctor data")
   console.log(data1)

    let res2 = await axios.get('http://localhost:8080/getReports');
    this.reports=res2.data;
    console.log("these are pid in reports")
     console.log(this.reports[0].Record.patientId)
     this.pid=this.reports[0].Record.patientId;
     console.log("insie")
     console.log(this.pid)
 
  },

  data () {
    return{
       patientdatas : [],
       doctordatas : [],
       reports : [],
       pid :{},
       patid:"",
       filter :{},
       reportid:"",
       pgiven:false,
       pnotgiven:"",
       riad:'',
       serverresponse:{}
    }
  },
  methods: {
     fs(e)
     {e.preventDefault();
       console.log("submit pressed")
       console.log(this.patid)
       for(var i=0;i<this.reports.length;i++)
       {
          if(this.patid==this.reports[i].Record.patientId)
          {
            console.log("matched")
            let index = i;
            let c=1;
            console.log(index)

            if(c==1)
            {
               this.filter = this.reports[index].Record.reportId;
            }
           
          }
       }
       
      
     },
     async fs1(e)
     {
       e.preventDefault();
       console.log(this.reportid)

        let params = {
                patientId: this.patid,
                 reportId : this.reportid 
          }

          let res = await axios.post('http://localhost:8080/requestAccess',params);
          console.log(res.data)
          this.serverresponse = res.data;
       
     },
     async r(e){
       e.preventDefault();
       console.log("refresh pressed")
       let res = await axios.get('http://localhost:8080/getReports');
       this.reports=res.data;
       console.log("new reports updated")
        // this.patid
      

           for(var i=0;i<this.reports.length;i++)
       {
           console.log("inside for")
          if(this.reports[i].Record.isGiven=="1")
          {
             this.pgiven=true;
           console.log("request given")
           console.log(this.pgiven)
          }
              if(this.reports[i].Record.isGiven=="-1")
          {
             this.pnotgiven="Permission denied"
           console.log(this.pnotgiven)
           console.log("automatic deny info")
           console.log(this.patid)
           console.log(this.filter)
            let params = {
                  patientId: this.patid,
                  reportId : this.filter
            }

           await axios.post('http://localhost:8080/resetAccess',params);
           console.log("post done")
          }
       }
     },
     async download(e)
     {

       e.preventDefault();
       console.log("download pressed")
      console.log(this.patid)
      console.log(this.filter)
        let params = {
                patientId: this.patid,
                 reportId : this.filter
          }

           await axios.post('http://localhost:8080/resetAccess',params);
          //  let res =
         

     }
  }
}
</script>

<style scoped>

table,
th,
td {
    /* border: 1px solid black;  */
     border-bottom: 1px solid rgb(8, 2, 2)34, 17, 17); 
    border-collapse: collapse;
}

th{
  text-align: center;
}
th, td {
  padding: 15px;
}
tr:hover {background-color: #f5f5f5;}
.hero {
  text-align: center;
}

.gridcontainer {
  display: -ms-grid;
  display: grid;
  -ms-grid-columns: 100%;
      grid-template-columns: 100%;
  -ms-grid-rows: 500px 700px 500px;
      grid-template-rows: 500px 300px 500px;
        grid-gap: 30px 50px;
}

/* .griditem1 table, .griditem1 td, .griditem1 th {
  border: 1px solid black;
  width: 300px;
}

.griditem1 td {
  text-align: center;
} */

.container {
  /* height: 250px; */
  width: 250px;
  margin: 1em;
  background-color: white;
  -webkit-box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.flexboxcontainer {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: space-evenly;
      -ms-flex-pack: space-evenly;
          justify-content: space-evenly;
}

.flexboxitem1 {
  text-align: center;
}

.flexboxitem1 form .padding {
  margin: 1em;
}

.flexboxitem2 {
  text-align: center;
}

.flexboxitem2 .padding {
  margin-top: 1em;
}

.flexboxitem3 {
  text-align: center;
}

.flexboxitem3 form {
  margin-top: 1em;
}

.flexboxitem3 .padding {
  margin-top: 2em;
}

.sumcontainer {
  height: 400px;
  width: 1400px;
  margin: 1em auto;
  background-color: white;
  -webkit-box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.sumcontainer h1 {
  margin: 1em;
}

.sumcontainer p {
  overflow-x: scroll;
  overflow-x: scroll;
  text-align: left;
  height: 350px;
  width: 1000px;
  margin: 0 auto;
}
/*# sourceMappingURL=doctor.css.map */
</style>