<!-- <script>
import {
    defineComponent
} from 'vue'
export default defineComponent({
    data() {
        return {
            post: {},
        };
    },
    created() {
        this.fetchPost();
    },
    methods: {
        fetchPost() {
            const id = this.$route.params.id;
            const existingPosts = JSON.parse(localStorage.getItem('resumes') || '[]');

            if (id >= 0 && id < existingPosts.length) {
                this.post = existingPosts[id];
            } else {
                this.$router.push('/');
            }
        },
    },
})
</script>

<template>
<div class="post">
    <div v-if="post">
        <h1>{{ post.title }}</h1>
        <p> {{ post.description }}</p>
        <div v-if="post.gif">
            <img :src="post.gif" alt="Selected GIF">
        </div>
        <img :src="post.userImage" alt="">
        <pre>{{ post.userNameEmail }}</pre>
    </div>
</div>
</template>
  
<style scoped>
.post {
    line-height: 100px;
    margin-top: 50px;
}

.post h1 {
    font-size: 3.75rem;
    line-height: normal;
    font-weight: 800;
}
</style> -->

<!-- CityDetail.vue -->
<template>
  <div>
    <h2>{{ post.title }}</h2>
    <p> {{ post.description }}</p>
    <div v-if="post.gif">
        <img :src="post.gif" alt="Selected GIF">
    </div>
    <img :src="post.userImage" alt="">
    <p>{{ post.userNameEmail }}</p>
</div>
</template>

<script>
import { citiesColRef } from "../../services/firebase";
import { doc, getDoc } from "firebase/firestore";

export default {
  data() {
    return {
      post: {},
    };
  },
  async created() {
    const cityId = this.$route.params.id;
    const cityRef = doc(citiesColRef, cityId);
    const citySnapShot = await getDoc(cityRef);
    this.post = citySnapShot.data();
  },
};
</script>
