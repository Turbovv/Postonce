<template>
    <div class="post-container">
      <h2>{{ post.title }}</h2>
      <p class="description mb-4">{{ post.description }}</p>
      <div v-if="post.gif" class="gif-container mb-2">
        <img :src="post.gif" alt="Selected GIF" class="gif-img">
      </div>
      <div class="user-info d-flex">
        <p>{{ post.userNameEmail }}</p>
        <img :src="post.userImage" alt="" class="user-img">
      </div>
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

<style scoped>
  .post-container {
    max-width: 600px;
    padding: 15px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  .gif-img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
  }
  .user-info {
    align-items: center;
  }
  .user-info p {
    margin-right: 10px;
    font-weight: bold;
  }
  .user-img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  @media only screen and (max-width: 600px) {
    .post-container {
      padding: 10px;
    }
    .user-info p {
      margin-bottom: 5px;
    }
  }
</style>