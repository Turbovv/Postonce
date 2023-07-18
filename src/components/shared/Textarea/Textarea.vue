<template>
    <v-container fluid  type="text" id="name" :value="value" @input="$emit('update:value', $event.target.value)">
    <v-textarea
      name="input-7-1"
      variant="filled"
      label="description"
      auto-grow
      model-value=""
    ></v-textarea>
  </v-container>
  </template>
  
  <script>
  export default {
    props: ['value']
  };
  </script>


<style scoped>
  .v-textarea {
    border:1px solid red;
  }
</style>
  