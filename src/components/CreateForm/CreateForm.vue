<script>
import { defineComponent } from 'vue'
import GiphyAPI from '../../services/GiphyAPI'
import Input from '../shared/Input/Input.vue'
import Textarea from '../shared/Textarea/Textarea.vue'

export default defineComponent({
  data() {
    return {
      title: '',
      description: '',
      selectedGif: '',
      searchQuery: '',
      gifs: {},
      errorMSG: false,
      timeout: null
    };
  },
  methods: {
    submitForm() {
      if(!this.title || !this.description || !this.selectedGif) {
        this.errorMSG = true
        return
      }
      const resumeData = {
        title: this.title,
        description: this.description,
        gif: this.selectedGif,
      };

      let existingResumes = JSON.parse(localStorage.getItem('resumes') || '[]');

      existingResumes.push(resumeData);

      localStorage.setItem('resumes', JSON.stringify(existingResumes));
     const newIndex = existingResumes.length - 1;
     this.$router.push({ name: 'inner', params: { id: newIndex.toString() } });
    },
  async searchGifs() {
    try {
      const response = await GiphyAPI.getGiphyData(this.searchQuery)
      this.gifs = response.data.data
      console.log(response.data)
    } catch (error) {
    console.log(error)      
    }},
    selectGif(gifUrl) {
      this.selectedGif = gifUrl;
      this.gifs = [];
    },
    onInput() {
    clearTimeout(this.timeout)
    this.timeout = setTimeout(() => {
      this.searchGifs();
    }, 500)
  }, 
  },
  components: {Input,Textarea}
})
</script>

<template>
    <div class="submit-container">
      <form @submit.prevent="submitForm" class="submit">
       <div class="input">
        <!-- <label for="title">Title</label> -->
        <Input class="child" :value="title" @update:value="title = $event" />
       </div>
        <!-- <label for="experience">Description:< /label> -->
        <Textarea :value="description" @update:value="description = $event" />
        <label for="gif">Choose a GIF:</label>
        <input  type="text" id="gif" v-model="searchQuery" placeholder="Search for a GIF" @input="onInput" autocomplete="off">
        <div v-if="gifs.length">
          <ul>
            <li v-for="(gif, index) in gifs" :key="index" @click="selectGif(gif.images.original.url)">
              <img :src="gif.images.fixed_height.url" :alt="gif.title">
            </li>
          </ul>
        </div>
        <button type="submit">Save</button>
        <p v-if="errorMSG">SHEAVSE YVELA!!!</p>
      </form>
    </div>
  </template>
<style scoped>
.submit-container {
  margin-top:50px;
}
.submit {
  border:1px solid red;
  display:grid;
}
</style>
