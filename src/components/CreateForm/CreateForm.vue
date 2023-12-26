<script>
import {
    defineComponent
} from 'vue'
import GiphyAPI from '../../services/GiphyAPI'
import Input from '../shared/Input/Input.vue'
import Textarea from '../shared/Textarea/Textarea.vue'
import GoogleAuth from '../GoogleAuth/GoogleAuth.vue';
import { usePostsStore } from '../../store/posts';

export default defineComponent({
    data() {
        return {
            postsStore: usePostsStore(),
            title: '',
            description: '',
            selectedGif: '',
            searchQuery: '',
            gifs: {},
            errorMSG: false,
            timeout: null,
            userImageURL: '',
            userName:'',
            user: {}
        };
    },
    methods: {
        submitForm() {
            if (!this.title || !this.description || !this.selectedGif) {
                this.errorMSG = true
                return
            }

            this.userImageURL = this.user.photoURL;
            this.userName = this.user.displayName

            const resumeData = {
                title: this.title,
                description: this.description,
                gif: this.selectedGif,
                userImage: this.userImageURL,
                userNameEmail: this.userName,
            };

             this.postsStore.addPost(resumeData);

            const newIndex = this.postsStore.posts.length - 1;
            this.$router.push({
                name: 'inner',
                params: {
                    id: newIndex.toString()
                }
            });
        },
        async searchGifs() {
            try {
                const response = await GiphyAPI.getGiphyData(this.searchQuery)
                this.gifs = response.data.data
                console.log(response.data)
            } catch (error) {
                console.log(error)
            }
        },
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
    mounted() {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        this.user = JSON.parse(savedUser);
      }
    },
    components: {
        Input,
        Textarea,
        GoogleAuth, 
    }
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
        <div v-if="gifs.length" class="gif">
          <ul  class="gif-container">
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
    margin-top: 50px;
}

.submit {
    display: grid;
}
.gif-container {
/* display: flex; */
/* flex-wrap: wrap; */
margin-top:20px;
display: grid;
grid-template-columns: auto auto auto auto;
gap:60px;
}
.gif-container img {
    width:300px;
    height:100%;
}
</style>
