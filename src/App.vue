<script>
import { defineComponent } from 'vue'
import Navbar from './components/Navbar/Navbar.vue'

export default defineComponent({
  components: {Navbar},
})
</script>

<template>
  <div class="body">
    <Navbar />
    <router-view />
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-decoration: none;
}
.body {
  margin: 0 auto;
  margin-top: 30px;
  max-width:1400px;
}
</style>
