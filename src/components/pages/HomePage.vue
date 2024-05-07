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
export default {
    components: { NavigationMenu, AsideMenu, TheHeader, DialogWindow }
}
</script>
<style>
    
</style>