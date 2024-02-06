<script>
import { defineComponent } from 'vue';
import AuthModal from '../AuthModal/AuthModal.vue'
import Modal from '../Modal/Modal.vue';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { firebaseApp } from '../../services/firebase';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

export default defineComponent({
    components: {
        AuthModal,
        Modal
    },
    data() {
        return {
            user: null,
            Modal: false,
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
    methods: {
        showModal() {
            if (!this.user) {
                this.Modal = true;
            }
        },
        getUserAvatarUrl(avatar) {
            return `https://cdn.discordapp.com/avatars/${this.user.id}/${avatar}.png`;
        },
    },
});
</script>

<template>
<div class="space-between d-flex">
    <router-link to="/">
        <h2 class="title">Postonce</h2>
    </router-link>
    <div class="mobile">
        <router-link to="/">
            <h2 class="mr-3">Posts</h2>
        </router-link>
        <div v-if="user">
            <router-link to="/create">
                <h2>Create</h2>
            </router-link>
        </div>
        <button @click="showModal" v-else>
            <AuthModal />
        </button>
    </div>
    <div :class="{ disabled: !user }">
      <Modal />
    </div>
</div>
</template>

<style scoped>
.disabled {
    pointer-events: none;
}
.space-between {
    justify-content: space-between;
}

.d-flex h2:focus {
    color: blue;
}

@media only screen and (min-width:500px) {
    .mobile {
        display: flex;
        margin-bottom: auto;
    }
}
@media only screen and (max-width:300px) {
    .title {
        display: none;
    }
}
</style>
