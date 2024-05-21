<template>
    <div class="navigation-menu">
        <button class="main-logo">
            <img src="../assets/image/main-logo.svg" height="32px">
        </button>
        <div class="navigation-btns">
            <div class="navigation-btns-top">
                <button  class="nav-btn-item">
                    <img src="../assets/image/nav-icon1.svg" height="18px">
                </button>
                <button class="nav-btn-item">
                    <img src="../assets/image/nav-icon2.svg" height="18px">
                </button>
                <button class="nav-btn-item">
                    <img src="../assets/image/nav-icon3.svg" height="20px">
                </button>
                <button class="nav-btn-item">
                    <img src="../assets/image/nav-icon4.svg" height="20px">
                </button>
                <button class="nav-btn-item">
                    <img src="../assets/image/nav-icon5.svg" height="19px">
                </button>
            </div>
            <button
                @click="switchTheme"
            >
                <img class="theme-btn" src="../assets/image/theme-btn.svg" height="24px">
            </button>
        </div>
    </div>
</template>
<script>
export default {
    methods: {
        switchTheme() {
            this.darkTheme = !this.darkTheme;
            if (this.darkTheme===true) {
                document.body.classList.add('dark-theme');
                localStorage.setItem('darkThemeCheckboxState', true);
            }
            else {
                document.body.classList.remove('dark-theme');
                localStorage.removeItem('darkThemeCheckboxState');
            }
        }
    },
    mounted() {
        this.darkTheme = localStorage.getItem('darkThemeCheckboxState');
        this.darkTheme = !this.darkTheme;
        this.switchTheme();
    },
}
</script>
<style scoped>
.navigation-menu{
    position: fixed;
    background-color: var(--main-background);
    border-right: 3px solid var(--main-border);
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 65px;
    z-index: 30;
}
.main-logo{
    margin: 16px 0 45px;
}
.navigation-btns{
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
}
.navigation-btns-top{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
}
.theme-btn{
    margin-bottom: 30px;
}
.nav-btn-item{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 44px;
    width: 49px;
}
</style>