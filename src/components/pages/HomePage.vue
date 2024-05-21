<template>
    <dialog-window/>
    <navigation-menu/>
    <aside-menu/>
    <the-header/>
</template>
<script>
import NavigationMenu from '../NavigationMenu.vue'
import AsideMenu from '../AsideMenu.vue'
import TheHeader from '../TheHeader.vue'
import DialogWindow from '../DialogWindow.vue'
import { mapActions } from 'vuex';
export default {
    components: { NavigationMenu, AsideMenu, TheHeader, DialogWindow },
    methods: {
        ...mapActions({
            getBoardId: 'columnModule/getBoardId',
        }),
    },
    created() {
        this.getBoardId({ boardId: '' });
    },
}
</script>
<style>
    
</style>