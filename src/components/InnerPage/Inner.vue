<script>
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
    </div>
</div>
</template>
  
<style scoped>
.post {
    border: 1px solid red;
    line-height: 100px;
    margin-top: 50px;
}

.post h1 {
    font-size: 3.75rem;
    line-height: normal;
    font-weight: 800;
}
</style>
