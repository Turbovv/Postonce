<template>
  <div>
    <h1 v-if="!authStore.isAuthenticated">Wanna Authorize?</h1>
    <button @click="signInWithGoogle" v-if="!authStore.isAuthenticated">Authorize with Google</button>
    <div v-if="authStore.isAuthenticated">
      <p>{{ authStore.user.displayName }}</p>
      <img :src="authStore.user.photoURL" alt="Profile Picture" />
    </div>
    <button @click="signOut" v-if="authStore.isAuthenticated">Logout</button>
  </div>
</template>

<script>
import { useAuthStore } from '../../store/authStore';

export default {
  data() {
    return {
      authStore: useAuthStore(),
    };
  },
  methods: {
    async signInWithGoogle() {
      await this.authStore.signInWithGoogle();
      this.$router.push("/create")
    },
    async signOut() {
      await this.authStore.signOut();
    },
  },
  mounted() {
    this.authStore.checkAuthentication();
  },
};
</script>
