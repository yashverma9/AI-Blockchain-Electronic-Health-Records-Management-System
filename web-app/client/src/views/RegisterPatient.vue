<template>
  <div class="RegisterPatient">
    
    <regpatient />
  </div>
</template>


<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import regpatient from '../components/regpatient.vue'
export default {
  name: 'RegisterPatient',
  components: {
    regpatient
  }
}
</script>