<script>
import GoogleAuth from '../GoogleAuth/GoogleAuth.vue';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { firebaseApp } from '../../services/firebase';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
export default {
    components: {
        GoogleAuth
    },
    data() {
        return {
            dialog: false,
            user: null,
        };
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
    <div class="text-center">
        <v-btn id="test" color="primary">
        <div v-if="user">
         <img :src=" user.photoURL" alt="">
        </div>
        <div v-if="!user">
            <i class="fa-regular fa-user"></i>
        </div>
        <v-dialog v-model="dialog" activator="parent" width="auto">
            <v-card>
                <v-card-text>
                    <GoogleAuth />
                </v-card-text>
                <v-card-actions>
                    <v-btn color="primary" block @click="dialog = false">Nevermind</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-btn>
</div>
</template>

<style scoped>
    img {
        height: 50px;
        width:fit-content;
    }
    #test {
        height: 50px;
    }
</style>
