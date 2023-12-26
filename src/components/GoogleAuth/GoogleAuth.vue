<template>
  <div>
    <h1 v-if="!user">Wanna Authorize?</h1>
    <button @click="signInWithGoogle" v-if="!user">Authorize with Google</button>
    <div v-if="user">
      <p>{{ user.displayName }}</p>
      <img :src="user.photoURL" alt="Profile Picture" />
    </div>
  </div>
  <button @click="signOut" v-if="user">Logout</button>
  </template>
  
  <script>
  import { getAuth, GoogleAuthProvider, signInWithPopup, signOut as firebaseSignOut } from 'firebase/auth';
  import { firebaseApp }from '../../services/firebase';
  
  export default {
    data() {
      return {
        user: null,
      };
    },
    methods: {
      signInWithGoogle() {
        const auth = getAuth(firebaseApp);
        const provider = new GoogleAuthProvider();
  
        signInWithPopup(auth, provider)
          .then((result) => {
            localStorage.setItem('user', JSON.stringify(result.user));
          window.location.reload();

          })
          .catch((error) => {
            console.error('Google sign-in failed:', error);
          });
      },
      signOut() {
        const auth = getAuth(firebaseApp);
  
        firebaseSignOut(auth)
          .then(() => {
            localStorage.removeItem('user');
            window.location.reload();
          })
          .catch((error) => {
            console.error('Sign out failed:', error);
          });
      },
    },
    mounted() {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        this.user = JSON.parse(savedUser);
      }
    },
  };
  </script>
  