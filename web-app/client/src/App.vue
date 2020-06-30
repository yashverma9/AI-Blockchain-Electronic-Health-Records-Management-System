<template>
  <div id="app">
    <div id="nav">
      <div class="flex">
        <div>
          <img src="./assets/logo.png" alt />
        </div>
        <div>
          <h1 id="hero">EHR</h1>
        </div>
        <div>
          <router-link to="/">Home</router-link>|
         
          
          <div class="dropdown">
            <button class="dropbtn">Register</button>
            <div class="dropdown-content">
            <router-link to="/RegisterPatient">Register Patient</router-link>|
             <router-link to="/RegisterDoctor">Register Doctor</router-link>|
            </div>
          </div>

             <div class="dropdown">
            <button class="dropbtn">Login</button>
            <div class="dropdown-content">
            <router-link to="/LoginPatient">Login Patient</router-link>|
             <router-link to="/LoginDoctor">Login Doctor</router-link>|
             <router-link to="/LoginHospitalAdmin">Login Hospital Admin</router-link>|
            </div>
          </div>


          <router-link to="/about">About</router-link>
        </div>
      </div>
    </div>
    <router-view />
  </div>
</template>

<style>
body {
  background-color: #e6e6e6;
  font-family: "Roboto", sans-serif;

  letter-spacing: 0.1em;
  /* margin: 0;
  padding: 0; */
}
.flex {
  /* margin-left: 50em; */
  display: flex;
  justify-content: space-between;
}

.flex a {
  color: black;
  font-weight: bold;
  text-decoration: none;
  font-size: larger;
}

img {
  height: 50px;
  width: 70px;
}


/* Style The Dropdown Button */
.dropbtn {
   background-color: #e6e6e6; 
  color: black;
  padding: 16px;
  font-size: 16px;
  border: none;
  cursor: pointer;
}

/* The container <div> - needed to position the dropdown content */
.dropdown {
  position: relative;
  display: inline-block;
}

/* Dropdown Content (Hidden by Default) */
.dropdown-content {
  display: none;
  position: absolute;
  /* background-color: #f9f9f9; */
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

/* Links inside the dropdown */
.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

/* Change color of dropdown links on hover */
.dropdown-content a:hover {background-color: #676867}

/* Show the dropdown menu on hover */
.dropdown:hover .dropdown-content {
  display: block;
}

/* Change the background color of the dropdown button when the dropdown content is shown */
.dropdown:hover .dropbtn {
  background-color: #676867;
}
#hero{
  margin-right: 25em;
}
</style>
