<script>
import {defineComponent} from 'vue';
import AuthModal from '../AuthModal/AuthModal.vue'
import Modal from '../Modal/Modal.vue';

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
    created() {
        const storedUser = localStorage.getItem('discordUser');
        if (storedUser) {
            this.user = JSON.parse(storedUser);
        }
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
<div class="d-flex justify-between items-center">
    <router-link to="/">
        <h2>Postonce</h2>
    </router-link>
    <div class="d-flex">
        <router-link to="/">
            <h2 class="mr-3">Posts</h2>
        </router-link>
        <template v-if="user">
            <router-link to="/create">
                <h2>Create</h2>
            </router-link>
            <img :src="getUserAvatarUrl(user.avatar)" alt="Discord avatar" />
        </template>
        <button @click="showModal" v-else>
            <AuthModal /></button>
    </div>
    <Modal />
</div>
</template>


<style scoped>
.space-between {
    justify-content: space-between;
}

.d-flex {
    display: flex;
    height: 10%;
    gap: 15px;
    justify-content: center;
    margin: 0 auto;
}

.d-flex h2:focus {
    color: blue;
}

* {
    text-decoration: none;
}
</style>
