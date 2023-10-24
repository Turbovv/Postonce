<script>
import DiscordAuth from '../DiscordAuth/DiscordAuth.vue';

export default {
    components: {
        DiscordAuth
    },
    data() {
        return {
            dialog: false,
        };
    },
};
</script>


<template>
<div class="text-center">
    <v-btn>
        Create

        <v-dialog v-model="dialog" activator="parent" width="auto">
            <v-card>
                <v-card-text>
                    <DiscordAuth class="mb-4" />
                </v-card-text>
                <v-card-actions>
                    <v-btn color="primary" block @click="dialog = false">Nevermind</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-btn>
</div>
</template>
