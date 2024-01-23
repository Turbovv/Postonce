<template>

    <div class="submit-container">
    <form @submit.prevent="submitForm" class="submit">
                        <div>
                            <input type="text" class="form-control mb-2" placeholder="Title" v-model="this.title" />
                        </div>
                        <div>
                            <input type="text" class="form-control mb-2" placeholder="Description" v-model="this.description" />
                        </div>
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

  <script>
  import GiphyAPI from '../../services/GiphyAPI'
  import { citiesColRef } from "../../services/firebase";
  import { addDoc } from "firebase/firestore";
  import { getAuth, onAuthStateChanged } from 'firebase/auth';
  import { firebaseApp } from '../../services/firebase';
  import { getFirestore, doc, setDoc } from 'firebase/firestore';
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
        userName:'',
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
    const addedDoc = await addDoc(citiesColRef,{...postData });
    this.$router.push("/");
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

<style scoped>
.submit-container {
    margin-top: 50px;
}

.submit {
    display: grid;
}

.gif-container {
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
    /* display: grid; */
    /* grid-template-columns: auto auto auto auto; */
    gap: 60px;
}

.gif-container img {
    width: 300px;
    height: 100%;
}
</style>
