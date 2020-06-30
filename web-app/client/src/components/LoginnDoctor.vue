<template>
     <div>
       
      
            
          <div class="regpatient" >
                <h1 id="pl">DOCTOR LOGIN</h1>
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
        
            </div>

            <!-- <h1>{{objj}}</h1>
            <h1>hello</h1> -->
            <vue-instant-loading-spinner ref="Spinner"></vue-instant-loading-spinner>
   </div>
    
    
</template>

<script>

// import uuid from 'uuid';
import VueInstantLoadingSpinner from "vue-instant-loading-spinner/src/components/VueInstantLoadingSpinner.vue";
 import axios from "axios";
export default {
    name: "LoginnDoctor",
        data (){
        return{
            objj: {
               
               
               

            },
            
            username: '',
            password: '',
          
        
    
        }
    },

    components: {
    VueInstantLoadingSpinner
  },

    methods:{
         async fs(e)
        { 
             
            e.preventDefault();
            console.log("submit pressed")
            this.objj.username=this.username
            this.objj.password=this.password
          
            const newTodo = {
                username: this.username,
                password : this.password ,
             
               
            
            }
            console.log(newTodo)

        //   axios.post('https://jsonplaceholder.typicode.com/todos', {
        //         username: this.username,
        //         password : this.password ,
            
        //          })
        //     .then(res => this.objj = res.data)
        //     .catch(e => {
        //     this.errors.push(e)
        //     })

        
          let params = {
                doctorId: this.username,
                 pswd : this.password 
          }

          let res = await axios.post('http://localhost:8080/validateDoctor',params);
          this.objj=res.data;
          let x = this.objj.Success;
          console.log()
           if (x)
        {
            this.$router.push('DoctorDashboard') 
        }
       
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