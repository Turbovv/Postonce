<script>
export default {
    props: ['value']
};
</script>

<template>
<v-responsive type="text" id="name" :value="value" @input="$emit('update:value', $event.target.value)" class="mx-auto input" max-width="344">
    <v-text-field label="title" hide-details="auto"></v-text-field>
</v-responsive>
</template>

<style scoped>
.v-text-field {
}
</style>
