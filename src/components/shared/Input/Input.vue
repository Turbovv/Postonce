<template>
  <v-responsive
    type="text" id="name" :value="value" @input="$emit('update:value', $event.target.value)"
    class="mx-auto input"
    max-width="344"
  >
    <v-text-field
      label="title"
      hide-details="auto"
    ></v-text-field>
  </v-responsive>
  </template>
  
  <script>
  export default {
    props: ['value']
  };
  </script>


<style scoped>
.v-text-field {
  border:1px solid blue;
}
</style>
  