<template>
    <div class="RegisterDoctor"> 
        <h1>doct</h1>
        <regdoctor />
    </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import regdoctor from '../components/regdoctor.vue'
export default {
  name: 'RegisterDoctor',
  components: {
    regdoctor
  }
}
</script>