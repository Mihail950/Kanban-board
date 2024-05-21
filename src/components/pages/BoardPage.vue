<template>
    <dialog-window/>
    <navigation-menu/>
    <aside-menu/>
    <the-header/>
    <board-menu/>
    <the-board v-if="!isLoadBoard"/>
    <board-skeleton v-if="isLoadBoard"/>
    <user-board-dialog/>
</template>
<script>
import NavigationMenu from '../NavigationMenu.vue'
import AsideMenu from '../AsideMenu.vue'
import TheHeader from '../TheHeader.vue'
import BoardMenu from '../BoardMenu.vue'
import TheBoard from '../TheBoard.vue'
import DialogWindow from '../DialogWindow.vue'
import BoardSkeleton from '../BoardSkeleton.vue'
import UserBoardDialog from '../UserBoardDialog.vue'
import {mapActions, mapGetters} from 'vuex';
export default {
    components: { NavigationMenu, AsideMenu, TheHeader, BoardMenu, TheBoard, DialogWindow, BoardSkeleton, UserBoardDialog },
    methods: {
        ...mapActions({
        addUserInfo: 'authModule/addUserInfo',
        GetBoards: 'boardsModule/axiosGetBoards',
        }),
    },
    computed: {
        ...mapGetters({
            isLoadBoard: 'boardsModule/isLoadBoard'
     })   
    },  
}
</script>
<style>
    
</style>