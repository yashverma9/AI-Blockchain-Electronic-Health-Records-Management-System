
<template>
   <div>
            <div class="regpatient">
                <h1 id="pl">REGISTER NEW DOCTOR</h1>
                <hr>
                <div class="formm" style="margin-left:6em; margin-top:2em;">
                     <form  @submit="fs"  class="formm"  enctype=multipart/form-data>
                    <ul>
                        <li>
                            <label for="fname" class="label"> Name:</label><br>
                            <input type="text"  v-model="doctorname"  id="fname" name="doctorname" class="inputfield"><br><br>
                        </li>
                        <li>
                            <label for="fname" class="label">age:</label><br>
                            <input type="text"    v-model="age"   id="fname" name="age" class="inputfield"><br><br>
                        </li>
                      
                        <li>
                            <label for="fname" class="label"> phno:</label><br>
                            <input type="text" id="fname"   v-model="doctorphno" name="doctorphno" class="inputfield"><br><br>
                        </li>
                         <li>
                            <label for="fname" class="label"> License Id:</label><br>
                            <input type="text" id="fname" v-model="doctorlicensenumber" name="doctorlicensenumber" class="inputfield"><br><br>
                        </li>

                        <li>
                           
                        </li>
                    </ul>

                     <input type="submit" value="Submit" name="doctor"  class="signup" id="reg">
                </form>
        
                </div>
               
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
.fromm{
    
}


</style>