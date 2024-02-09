<script>
import GiphyAPI from '../../services/GiphyAPI'
import { citiesColRef } from "../../services/firebase";
import { addDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { firebaseApp } from '../../services/firebase';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

import JSConfetti from 'js-confetti'
const confetti = new JSConfetti()

export default {
    data() {
        return {
            title: null,
            description: null,
            selectedGif: '',
            searchQuery: '',
            gifs: {},
            errorMSG: false,
            timeout: null,
            userImageURL: '',
            userName: '',
        }
    },
    methods: {
        async submitForm() {
            if (!this.title || !this.description || !this.selectedGif) {
                this.errorMSG = true
                return
            }
            this.userImageURL = this.user.photoURL;
            this.userName = this.user.displayName

            const postData = {
                title: this.title,
                description: this.description,
                gif: this.selectedGif,
                userImage: this.userImageURL,
                userNameEmail: this.userName,
            };
            const addedDoc = await addDoc(citiesColRef, {
                ...postData
            });
            this.$router.push("/");
            confetti.addConfetti()
        },
        async searchGifs() {
            try {
                const response = await GiphyAPI.getGiphyData(this.searchQuery)
                this.gifs = response.data.data
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
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.user = user;

                const db = getFirestore();
                const userDocRef = doc(db, 'users', user.uid);
                setDoc(userDocRef, {
                    displayName: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                });
            } else {
                this.user = null;
            }
        });
    },
};
</script>

<template>
<div class="submit-container mt-12">
    <form @submit.prevent="submitForm" class="submit-form">
        <div class="input d-flex mb-5">
            <input type="text" class="form-input rounded" placeholder="Title" v-model="title" />
            <input type="text" class="form-input rounded" placeholder="Description" v-model="description" />
        </div>
        <label for="gif" class="label mb-2">Choose a GIF:</label>
        <input type="text" id="gif" v-model="searchQuery" placeholder="Search for a GIF" @input="onInput" autocomplete="off" class="form-input mb-3 rounded" />
        <div v-if="gifs.length" class="gif-container mb-5">
            <ul class="gif-list flex-wrap d-flex">
                <li v-for="(gif, index) in gifs" :key="index" @click="selectGif(gif.images.original.url)" class="gif-item mr-2 mb-2">
                    <img :src="gif.images.fixed_height.url" :alt="gif.title" class="gif-img rounded-lg" />
                </li>
            </ul>
        </div>
        <button type="submit" class="btn-save text-white rounded">Save</button>
        <p v-if="errorMSG" class="error-msg text-red">Nope.</p>
    </form>
</div>
</template>

<style scoped>
.submit-form {
    padding: 20px;
}
.input {
    gap: 50px;
}
.form-input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    box-sizing: border-box;
}
.label {
    display: block;
    font-weight: bold;
}
.gif-list {
    list-style: none;
    padding: 0;
}
.gif-item {
    cursor: pointer;
}
.gif-img {
    width: 100px;
    height: 100px;
    object-fit: cover;
}
.btn-save {
    background-color: #4caf50;
    padding: 10px;
    cursor: pointer;
}
</style>
