<template>
      <div>

        
           
       
         
          <div v-show="vs" class="regpatient" >

                <h1 id="pl" >PATIENT LOGIN</h1>
                <form @submit="fs" enctype=multipart/form-data>
                    <ul>
                        <li>
                            <label for="fname" class="label" >Username:</label>
                            <input type="text"   v-model="username"   id="fname" name="username" class="inputfield" required><br><br>
                        </li>
                        <li>
                            <label for="fname" class="label">Password:</label>
                            <input type="text"    v-model="password"   id="fname" name="password" class="inputfield"><br><br>
                        </li>
                      
                      
                       
                        <li>
                            
                        </li>
                    </ul>
                    <input type="submit" value="Submit" name="patient" class="signup">
                </form>

                
            <div>
                       <h1>{{objj.error}}</h1>
                    
            </div>
        
            </div>
            <h1>{{filter}}</h1>

            <h4>{{gmsg.Success}}</h4>
              <h4>{{rmsg.Success}}</h4>

                <!-- <div>
                    <p>  {{patientdatas}}</p>
                    <p>{{reports}}</p>
                </div>
               -->
             <div v-show="pasked">
                 <h1>show content</h1>
                  <form @submit="fs2" enctype=multipart/form-data>
                  
                    
                    <input type="submit" value="Grant" name="patient" class="signup">
                </form>

                <form @submit="fs3" enctype=multipart/form-data>
                  
                    
                    <input type="submit" value="Reject" name="patient" class="signup">
                </form>

                 
             </div>
            <vue-instant-loading-spinner ref="Spinner"></vue-instant-loading-spinner>
         </div>
            
         <!-- <pp/> -->
    
    




</template>

<script>
// import uuid from 'uuid';
import VueInstantLoadingSpinner from "vue-instant-loading-spinner/src/components/VueInstantLoadingSpinner.vue";
import axios from "axios";
export default {
    name: "LoginnPatient",
    async mounted() {
    // console.log("created");
    // this.x = 99;

    let res = await axios.get('http://localhost:8080/getPatients');

    let data = res.data;
    this.patientdatas = data;
    console.log("this is patient data")
   console.log(data)
 

    
//     let res1 = await axios.get('http://localhost:8080/getDoctors');

//     let data1 = res1.data;
//     this.doctordatas = data1;
//     console.log("this is doctor data")
//    console.log(data1)

    let res2 = await axios.get('http://localhost:8080/getReports');
    this.reports=res2.data;
    console.log("these are reports")
    console.log()
    //  console.log(this.reports[0].Record.patientId)
    //  this.pid=this.reports[0].Record.patientId;
    //  console.log("insie")
    //  console.log(this.pid)
 
  },
    data (){
        return{
             x:" ",
            objj: {
                
             
               

            },
            patientdatas : [],
            reports : [],
            

            gmsg:{},
            rmsg:{},

            username: '',
            password: '',
            vs:true,
            pasked:false,
            index:"",
            filter:{}
           
          
        
    
        }
    },
    

    components: {
    VueInstantLoadingSpinner,
    // pp
  },
  methods:{
         async fs(e)
        { 
            //  let list = {};
            // let x;        
            e.preventDefault();
            console.log("submit pressed")
            this.objj.username=this.username
            this.objj.password=this.password
          
            const newTodo = {
                username: this.username,
                password : this.password ,
             
               
            
            }
            console.log(newTodo)
            //1593418037214
          
          let params = {
                patientId: this.username,
                 pswd : this.password 
          }

          let res = await axios.post('http://localhost:8080/validatePatient',params);
          this.objj=res.data;
          let x = this.objj.Success;
        //   console.log()

        //   axios.post('http://localhost:8080/validatePatient', {
        //         patientId: this.username,
        //         pswd : this.password ,
            
        //          })
        //     // .then(res => this.objj=res.data)
        //      .then(res => x.json() =res.data.Success )
            
        //      .then(console.log(x))
             
        //     // .then(data => {})
        //     .catch(e => {
        //     this.errors.push(e)
        //     })
        //     // console.log(`this is api response ${res.data.Success}`)
        //     // console.log(``)
        //     console.log(x)
        
        if (x)
        {
            // this.$router.push('PatientDashboard') 
            this.vs=false;
            console.log("if executed")
        }
           for(var i=0;i<this.reports.length;i++)
       {
           console.log("for executed")
           console.log(this.username)
          if(this.username==this.reports[i].Record.patientId)
          {
            console.log("matched")
            let index = i;
            this.index = index;
            let c=1;
            console.log(index)

            if(c==1)
            {
               this.filter = this.patientdatas[index].Record;
               if(this.reports[index].Record.isAsked=="1")
               {
                   
               
                    console.log("permission is asked")
                   this.pasked=true; 
                }
           
          }
       }
      
        }
  },
  async fs2(e)
  {
       e.preventDefault();

    let l = this.index;
         let params = {
                patientId: this.username,
                 reportId : this.reports[l].Record.reportId
          }

          let res = await axios.post('http://localhost:8080/grantAccess',params);
         console.log(res.data)
         this.gmsg=res.data

       console.log(("granted"))
        this.pasked=false; 

  },
  async fs3(e)
  {
         e.preventDefault();

         let l = this.index;
         let params = {
                patientId: this.username,
                 reportId : this.reports[l].Record.reportId
          }

          let res = await axios.post('http://localhost:8080/rejectAccess',params);
         console.log(res.data)
          this.rmsg=res.data;
           console.log(("Rejected"))
            this.pasked=false; 

  }
   
}
}
 

</script>

<style  scoped>

.regpatient
{
    background-color: white;
    height: 280px;
    width: 300px;
     border-radius: 25px;
  padding: 2em;
    margin: 5em auto;
  
  -webkit-box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}


.signup{
    background-color: #126597; /* Green */
  border: none;
  color: white;
  padding: 12px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  /* margin: 4px 2px; */
  margin-left: 6em;
  cursor: pointer;
  border-radius: 12px;
  width: 100px;
  font-weight: bold;
}
#pl{
    text-align: center;
}
.inputfield {
       width: 15em;
    padding: 0.8em;
    /* border-radius: 0.5em; */
    border: none;
    border-bottom: 1px solid black;
}
ul{
    list-style-type: none;
}
</style>