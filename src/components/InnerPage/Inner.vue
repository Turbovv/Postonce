<script>
import {
    defineComponent
} from 'vue'
import { usePostsStore } from '../../store/posts';
export default defineComponent({
    data() {
        return {
            post: {},
            postsStore: usePostsStore(),
        };
    },
    created() {
        this.fetchPost();
    },
    methods: {
        fetchPost() {
            const id = this.$route.params.id;
            this.post = this.postsStore.getPostById(id);


            if (!this.post) {
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
</style>
