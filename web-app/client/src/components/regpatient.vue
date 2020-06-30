 
<template>
   <div>
       <h1>hello</h1>
       <h1>{{objj}}</h1>
            <h1>hello</h1>
          <div class="regpatient" style="height: 680px;">
                <h1 >REGISTER NEW PATIENT</h1>
                <form @submit="fs" enctype=multipart/form-data>
                    <ul>
                        <li>
                            <label for="fname" class="label" >Name:</label>
                            <input type="text"   v-model="patientname"   id="fname" name="patientname" class="inputfield" required><br><br>
                        </li>
                        <li>
                            <label for="fname" class="label">age:</label>
                            <input type="text"    v-model="age"   id="fname" name="age" class="inputfield"><br><br>
                        </li>
                      
                      
                        <li>
                            <label for="fname" class="label">Adhar no:</label>
                            <input type="text"  v-model="patientadno" id="fname" name="patientadno" class="inputfield"><br><br>
                        </li>
                          
                        <li>
                            <label for="fname" class="label">Ph no:</label>
                            <input type="text"  v-model="phno" id="fname" name="phno" class="inputfield"><br><br>
                        </li>
                    
                        <!-- <li>
                            <label for="fname" class="label upload">Upload prescription:</label>
                            <input type="file" id="myFile" name="reportt" class="inputfield" ><br><br>
                        </li> -->
                       
                        <li>
                            <input type="submit" value="Submit" name="patient" class="signup">
                        </li>
                    </ul>
                </form>
        
            </div>

            <h1>{{objj}}</h1>
            <h1>hello</h1>
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
</style>
 
 
 
