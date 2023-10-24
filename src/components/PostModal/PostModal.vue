<template>
<div class="modal" v-if="isModalVisible" @click="hideModal">
    <div class="modal-content" @click.stop>
        <span class="close" @click="hideModal">&times;</span>
        <slot>sss</slot>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            isModalVisible: false,
        };
    },
    methods: {
        showModal() {
            this.isModalVisible = true;
        },
        hideModal() {
            this.isModalVisible = false;
        },
    },
};
</script>

<style scoped>
.modal {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    z-index: 9999;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
    position: relative;
    background-color: #fefefe;
    margin: auto;
    padding: 20px;
    border-radius: 4px;
    max-width: 600px;
}

.close {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 24px;
    font-weight: bold;
    color: #888;
    cursor: pointer;
}
</style>
