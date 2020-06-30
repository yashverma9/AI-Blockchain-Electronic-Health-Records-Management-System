<template>
    <div>
        <!-- <h1>inside doctor d</h1> -->
           <div class="gridcontainer">
            <div class="griditem  griditem1" style="overflow-x:auto;" >griditem1
                <table style="width:100%">
                    <tr>
                        <th >Patient ID</th>
                        <th >Patient name</th>
                        <!-- <th >Patient phno</th>
                        <th >Patient Email</th>
                        <th >Patient address</th>
                        <th >Patient Adhar No</th>
                        <th >Patient City</th>
                        <th >report</th> -->


                    </tr>
                    
                   
                      
                  </table>
            </div>



            <div class="griditem  griditem2">
                <div class="flexboxcontainer">
                    <div class="container flexboxitem flexboxitem1">
                        <h2>View Report</h2>
                        
                        <form @submit="fs" enctype=multipart/form-data>
                                <label for="fname">Patient ID:</label><br>
                                <input type="text" id="fname" name="pi" value=""  placeholder="Enter Patient ID" class="padding"><br>
                                <input type="submit" value="Request Access" name="dr" class="padding">
                        </form>

                            <form action="#" method="POST" enctype=multipart/form-data>
                                    
                                <input type="submit" value="Refresh" name="r" class="padding">
                            </form>
                        

                           
                    
                         <!-- <h1>{{dgiven[0][0]}}</h1> -->
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
                            
                    </div> -->
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
export default {
    name:"doctord"
}
</script>

<style scoped>
.hero {
  text-align: center;
}

.gridcontainer {
  display: -ms-grid;
  display: grid;
  -ms-grid-columns: 100%;
      grid-template-columns: 100%;
  -ms-grid-rows: 500px 300px 500px;
      grid-template-rows: 500px 300px 500px;
}

.griditem1 table, .griditem1 td, .griditem1 th {
  border: 1px solid black;
  width: 300px;
}

.griditem1 td {
  text-align: center;
}

.container {
  height: 250px;
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