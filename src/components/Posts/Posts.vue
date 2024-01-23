<!-- 
<script>
import {
    defineComponent
} from 'vue'
export default defineComponent({
    data() {
        return {
            posts: {},
        };
    },
    created() {
        this.fetchResumes();
    },
    methods: {
        fetchResumes() {
            const existingResumes = JSON.parse(localStorage.getItem('resumes') || '[]');
            this.posts = existingResumes;
        },
        navigateToInner(index) {
            this.$router.push({
                name: 'inner',
                params: {
                    id: index.toString()
                }
            });
        },
    },
})
</script>

<template>
<div class="post-container">
    <div v-for="(post, index) in posts" :key="index">
        <div v-if="post.gif" class="post-image">
            <img :src="post.gif" alt="Selected GIF" @click="navigateToInner(index)">
        </div>
        <div class="d-flex ">
            <h1>{{ post.title }}</h1>
            <img :src="post.userImage" alt="">
        </div>
    </div>
</div>
</template>

<style scoped>
    .post-container {
        margin-top: 50px;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
        gap: 25px;
    }

    .post-image {
        height: 15rem;
    }

    .post-image img {
        width: 100%;
        height: 100%;
    }

    .d-flex {
        justify-content: space-between;
    }

    .d-flex img {
        border-radius: 50%;
    }

    @media only screen and (max-width:1400px) {
        .post-container {
            grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
        }
    }
</style> -->

<template>
    <div  class="post-container">
        <div v-for="post in posts" :key="post.id">
            <div v-if="post.gif" class="post-image">
                <img :src="post.gif" alt="Selected GIF">
            </div>
          <div class="d-flex">
            <router-link :to="{ path: `/post/${post.id}` }">
                {{ post.title }}
            </router-link>
            <img :src="post.userImage" alt="">
          </div>
        </div>
    </div>
</template>

  <script>
  import { citiesColRef } from "../../services/firebase";
  import { getDocs, doc, deleteDoc } from "firebase/firestore";
  export default {
    data() {
      return {
        posts: [],
      };
    },
    methods: {
      async fetchCities() {
        let citiesSnapShot = await getDocs(citiesColRef);
        let cities = [];
        citiesSnapShot.forEach((city) => {
          let cityData = city.data();
          cityData.id = city.id;
          cities.push(cityData);
        });
        this.posts = cities;
      }
    },

    created() {
      this.fetchCities();
    },
  };
  </script>

<style scoped>
.post-container {
    margin-top: 50px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
    gap: 25px;
}

.post-image {
    height: 15rem;
}

.post-image img {
    width: 100%;
    height: 100%;
}

.d-flex {
    justify-content: space-between;
}

.d-flex img {
    border-radius: 50%;
}

@media only screen and (max-width:1400px) {
    .post-container {
        grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
    }
}
</style> -->
