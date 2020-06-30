
<template>
   <div>
            <div class="regpatient">
                <h1 >REGISTER NEW DOCTOR</h1>
                <form  @submit="fs" enctype=multipart/form-data>
                    <ul>
                        <li>
                            <label for="fname" class="label"> Name:</label>
                            <input type="text"  v-model="doctorname"  id="fname" name="doctorname" class="inputfield"><br><br>
                        </li>
                        <li>
                            <label for="fname" class="label">age:</label>
                            <input type="text"    v-model="age"   id="fname" name="age" class="inputfield"><br><br>
                        </li>
                      
                        <li>
                            <label for="fname" class="label"> phno:</label>
                            <input type="text" id="fname"   v-model="doctorphno" name="doctorphno" class="inputfield"><br><br>
                        </li>
                         <li>
                            <label for="fname" class="label"> License Id:</label>
                            <input type="text" id="fname" v-model="doctorlicensenumber" name="doctorlicensenumber" class="inputfield"><br><br>
                        </li>

                        <li>
                            <input type="submit" value="Submit" name="doctor"  class="signup" id="reg">
                        </li>
                    </ul>

                    <h1>{{objj.Success}}</h1>
                </form>
        
            </div>
            
            
            <vue-instant-loading-spinner ref="Spinner"></vue-instant-loading-spinner>
   </div>
</template>

<script>
import VueInstantLoadingSpinner from "vue-instant-loading-spinner/src/components/VueInstantLoadingSpinner.vue";
import axios from "axios";
export default {
    name: "regdoctor",
       data (){
        return{
            objj: {
               
               

            },
            
            doctorname: '',
            age: '',
            doctorphno: '',
            doctorlicensenumber: '',
            
        
    
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
                doctorname: this.doctorname,
                age : this.age ,
                doctorphno : this.doctorphno ,
                doctorlicensenumber : this.doctorlicensenumber ,
               
            
            }
            console.log(newTodo)
            //construct object and emmit to parent
            // this.$emit('add-todo', newTodo);
            axios.post('http://localhost:8080/registerDoctor', {
                     name: this.doctorname,
                     age : this.age ,
                    licenseId: this.doctorphno ,
                    phNo : this.doctorlicensenumber ,
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