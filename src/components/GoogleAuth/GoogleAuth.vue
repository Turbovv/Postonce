<template>
  <div>
    <h1 v-if="!authStore.isAuthenticated">Wanna Authorize?</h1>
    <button @click="signInWithGoogle" v-if="!authStore.isAuthenticated">Authorize with Google 
      <img class="google-button" v-if="!authStore.isAuthenticated"  width="22" height="22" src="https://img.icons8.com/color/33/google-logo.png" alt="google-logo"/>
    </button>
    <div v-if="authStore.isAuthenticated">
      <p>{{ authStore.user.displayName }}</p>
      <img :src="authStore.user.photoURL" alt="Profile Picture" />
    </div>
    <button class="logout"  @click="signOut" v-if="authStore.isAuthenticated">Logout</button>
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
<style scoped>
.google-button {
transform: translateY(5px);
}
.logout {
  border:1px solid grey;
  width:100%;
  transform: translateY(10px);
}
</style>
