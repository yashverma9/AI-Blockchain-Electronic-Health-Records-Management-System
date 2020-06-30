 
<template>
   <div>
   
          <div class="regpatient" >
                <h1 id="pl">REGISTER NEW PATIENT</h1>
                <hr>
                <div class="formm" style="margin-left:6em; margin-top:2em;">
                      <form @submit="fs" enctype=multipart/form-data>
                    <ul>
                        <li>
                            <label for="fname" class="label" >Name:</label><br>
                            <input type="text"   v-model="patientname"   id="fname" name="patientname" class="inputfield" required><br><br>
                       
                        <li>
                            <label for="fname" class="label">age:</label><br>
                            <input type="text"    v-model="age"   id="fname" name="age" class="inputfield"><br><br>
                        </li>

                        <li>
                            <label for="fname" class="label">Adhar no:</label><br>
                            <input type="text"  v-model="patientadno" id="fname" name="patientadno" class="inputfield"><br><br>
                        </li>
                          
                        <li>
                            <label for="fname" class="label">Ph no:</label><br>
                            <input type="text"  v-model="phno" id="fname" name="phno" class="inputfield">
                        </li>
                    
                        <!-- <li>
                            <label for="fname" class="label upload">Upload prescription:</label>
                            <input type="file" id="myFile" name="reportt" class="inputfield" ><br><br>
                        </li> -->
                       
                        <li>
                           
                        </li>
                    </ul>

                     <input type="submit" value="Submit" name="patient" class="signup">
                </form>
                </div>
              
        
            </div>

         
            <vue-instant-loading-spinner ref="Spinner"></vue-instant-loading-spinner>
   </div>
</template>
 
<script>
//import PostsService from "@/services/apiService";
import VueInstantLoadingSpinner from "vue-instant-loading-spinner/src/components/VueInstantLoadingSpinner.vue";
import axios from "axios";
 
export default {
    name: "regpatient",
    data (){
        return{
            objj: {
                x:1
               

            },
            
            patientname: '',
            age: '',
            patientadno: '',
            phno: '',
            
        
    
        }
    },
      components: {
    VueInstantLoadingSpinner
  },
    methods: {
        fs(e)
        { 
             this.objj.y= this.age
            e.preventDefault();
            console.log("submit pressed")
            const newTodo = {
                name: this.patientname,
                age : this.age ,
                adharNo : this.patientadno ,
                phNo : this.phno ,
               
            
            }
            console.log(newTodo)
            //construct object and emmit to parent
            // this.$emit('add-todo', newTodo);
            axios.post('http://localhost:8080/registerPatient', {
                     name: this.patientname,
                age : this.age ,
                adharNo : this.patientadno ,
                phNo : this.phno ,
                 })
            .then(res => this.objj = res.data)
            //this.objj = res.data
            .catch(e => {
            this.errors.push(e)
            })
        },
     

    //  created(){

    //      axios.get('https://jsonplaceholder.typicode.com/todos')
    //      .then(res => console.log(res))
    //      .catch(err => console.log(err))

    //  }
    }
}
</script>
 
<style scoped>

.regpatient
{
    background-color: white;
    height: 480px;
    width: 500px;
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
  margin-top: 1.1em;
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
ul,li{
    list-style-type: none;
    text-align: left;
}
</style>
 
 
 
