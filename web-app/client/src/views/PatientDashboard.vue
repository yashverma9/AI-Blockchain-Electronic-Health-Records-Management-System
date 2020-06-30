<template>
    <div>
        <h1>this is patient dashboard</h1>
        <patientd />
    </div>
</template>

<script>
// // @ is an alias to /src
// // import LoginPatient from '../components/LoginPatient.vue'
 import patientd from '../components/patientd.vue'
export default {
  name: 'PatientDashboard',
   components: {
    patientd
   }
}
</script>
