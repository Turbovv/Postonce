<template>
<div class="post-container  mt-12">
    <div v-for="post in posts" :key="post.id">
        <div v-if="post.gif" class="posts">
            <router-link :to="{path: `/post/${post.id}`}">
                <img :src="post.gif" alt="Selected GIF">
            </router-link>
        </div>
        <div class="d-flex">
            <router-link :to="{ path: `/post/${post.id}` }">
                <p class="my-5 no-underline">{{ post.title }}</p>
            </router-link>
            <img class="mt-1" :src="post.userImage" alt="">
        </div>
    </div>
</div>
</template>

<script>
import { citiesColRef } from "../../services/firebase";
import { getDocs} from "firebase/firestore";
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
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
    gap: 25px;
}
.posts {
    height: 15rem;
}
.posts img {
    width: 100%;
    height: 100%;
}
.d-flex {
    justify-content: space-between;
}
.d-flex img {
    border-radius: 50%;
    max-width: 70px;
}
@media only screen and (max-width:1400px) {
    .post-container {
        grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
    }
}
@media only screen and (max-width:500px) {
    .post-container {
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    }
}
@media only screen and (max-width:300px) {
    .d-flex {
        margin-right: 10px;
        margin-left: 10px;
    }
}
</style>
