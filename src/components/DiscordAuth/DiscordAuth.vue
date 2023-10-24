<script>
import {
    defineComponent
} from 'vue';
import axios from 'axios';
import queryString from 'query-string';
import DiscordUser from '../DiscordUser/DiscordUser.vue'

export default defineComponent({
    components: {
        DiscordUser
    },
    data() {
        return {
            user: null,
        }
    },
    methods: {
        login() {
            const clientId = '1118855498314289153';
            const redirectUri = 'http://localhost:5173';

            const queryParams = {
                client_id: clientId,
                redirect_uri: redirectUri,
                response_type: 'code',
                scope: 'identify',
            };

            const authUrl = `https://discord.com/api/oauth2/authorize?${queryString.stringify(queryParams)}`;

            window.location.href = authUrl;
        },
        async handleCallback() {
            const params = queryString.parse(window.location.search);
            const code = params.code;

            if (code) {
                const clientId = '1118855498314289153';
                const clientSecret = '3oZ2s7HH1ZwkUND_ZH_ZHZ7dJWRIm8hR';
                const redirectUri = 'http://localhost:5173';

                const data = {
                    client_id: clientId,
                    client_secret: clientSecret,
                    grant_type: 'authorization_code',
                    code,
                    redirect_uri: redirectUri,
                    scope: 'identify',
                };

                try {
                    const response = await axios.post('https://discord.com/api/oauth2/token', queryString.stringify(data));
                    const accessToken = response.data.access_token;

                    const userResponse = await axios.get('https://discord.com/api/v10/users/@me', {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    });

                    const user = userResponse.data;
                    localStorage.setItem('discordUser', JSON.stringify(user));
                } catch (error) {
                    console.error('Error:', error);
                }
            }
        },
        getUserAvatarUrl(avatar) {
            return `https://cdn.discordapp.com/avatars/${this.user.id}/${avatar}.png`;
        },
        handleLogout() {
            localStorage.removeItem('discordUser');
            this.user = null;
            if (this.$router.push('/create')) {
                this.$router.push('/')
                window.location.reload();
            }
            window.location.reload();
            this.$router.push('/')
        },
    },
    mounted() {
        this.handleCallback();
    },
    created() {
        const storedUser = localStorage.getItem('discordUser');
        if (storedUser) {
            this.user = JSON.parse(storedUser);
        }
    },
});
</script>


<template>
<div>
    <h1 v-if="!user">Wanna Authorize?</h1>
    <button @click="login" v-if="!user">Authorize with Discord</button>
    <div v-if="user">
        <p>Log Out </p>
        <!-- <DiscordUser :user="user" /> -->
        <img :src="getUserAvatarUrl(user.avatar)" alt="Discord avatar" />
    </div>
    <button @click="handleLogout" v-if="user">Logout</button>
</div>
</template>