import { defineStore } from 'pinia';

export const usePostsStore = defineStore({
  id: 'posts',
  state: () => ({
    posts: [],
  }),
  actions: {
    fetchPosts() {
      const existingResumes = JSON.parse(localStorage.getItem('resumes') || '[]');
      this.posts = existingResumes;
    },
    addPost(postData: any) {
      this.posts.push(postData);
      localStorage.setItem('resumes', JSON.stringify(this.posts));
    },
    getPostById(id: any) {
      return this.posts[id];
    },
  },
});
