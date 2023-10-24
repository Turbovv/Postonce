<template>
  <div>
    <img :src="getUserAvatarUrl(user.avatar)" alt="Discord avatar" />
  </div>
</template>

<script>
export default {
  props: ['user'],
  methods: {
    getUserAvatarUrl(avatar) {
      return `https://cdn.discordapp.com/avatars/${this.user.id}/${avatar}.png`;
    },
  },
};
</script>
