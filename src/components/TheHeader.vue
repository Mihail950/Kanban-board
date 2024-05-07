<template>
    <header class="header">
        <input class="header-search" type="text" placeholder="🔍︎ Search">
        <div class="header-right">
            <button>
                <img src="../assets/image/mail-icon.svg" height="18px">
            </button>
            <button>
                <img src="../assets/image/bell-icon.svg" height="18px">
            </button>
            <div @click="openProfileMenu" class="profile">
                <div class="profile-image">
                    <img src="../assets/image/sticker1.svg" height="27px">
                </div>
                <div>
                    <p class="profile-name">Миша M.</p>
                    <p class="profile-email">malcevmr.ru@gmail.com</p>
                </div>
            </div>
            <div :class="'task-menu-window--hiden '+showMenuClass">
                <button 
                    :class="'task-menu-window--hiden ' + showButtonClass"
                    @click="ExitUser"
                >
                Выйти
                </button>
            </div>
        </div>
    </header>
</template>
<script>
import {mapActions} from 'vuex';
export default {
    data() {
        return {
            showMenu: false,
            showMenuClass: '',
            showButtonClass: '',
        }
    },
    methods: {
        ...mapActions({
            ExitAction:'authModule/ExitUser'
        }),
        openProfileMenu() {
            
            if (this.showMenu === true) {
                this.showMenu = false;
                this.showButtonClass = '';
                this.showMenuClass = '';
            } else {
                this.showButtonClass = 'menu-button';
                this.showMenuClass = 'task-menu-window';
                this.showMenu = true;
            }
        },
        ExitUser() {
            this.ExitAction();
        }
    }
}
</script>
<style scoped>
.task-menu-window--hiden{
    display: none;
}
.task-menu-window{
    height: 67px;
    width: 150px;
    margin: 120px 45px 0 0;
    box-shadow: 8px 8px 8px 0px rgba(0, 0, 0, 0.2);
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    overflow: hidden;
    position: absolute;
    right: 0;
    transition: .6s, border .4s, background-color .3s;
    border: 1px solid rgba(0, 0, 0, 0);
    border-radius: 10px;
    z-index: 10;
}
.menu-button{
    justify-self:center;
    border: none;
    background-color: #1C1D22;
    color: white;
    font-size: 12px;
    font-weight: 600;
    text-align: center;
    width: 130px;
    height: 40px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
}
    .header{
    position: fixed;
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 70px;
    border-bottom: 3px solid var(--main-border);
    z-index: 15;
    align-items: center;
    background-color: var(--main-background);
}
.header-search{
    margin-left: 322px;
    background-color: var(--main-border);
    border: none;
    height: 32px;
    width: 182px;
    border-radius: 6px;
    padding-left: 10px;
    font-family: "Roboto";
    font-size: 10px;
    font-weight: 400;
}
.header-right{
    display: flex;
    align-items: center;
    gap: 14px;
}
.profile{
    display: flex;
    align-items: center;
    margin-right: 44px;
    gap: 8px;
    padding: 4px;
    border-radius: 5px;
}
.profile:hover{
    background-color: var(--main-border);
    cursor: pointer;
}
.profile:active{
    background-color: rgb(230, 230, 230, 0.7);
}
.profile-image{
    width: 32px;
    height: 32px;
    background-color: rgba(255, 242, 171, 1);
    display: flex;
    justify-content: center;
    border-radius: 100%;
}
.profile-name{
    font-size: 12px;
    font-weight: 500;
}
.profile-email{
    font-size: 10px;
    font-weight: 400;
    color: var(--main-label-text);
}
</style>