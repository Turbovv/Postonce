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
  margin: 30px auto;
  max-width:1400px;
  width:100%;
}
</style>
