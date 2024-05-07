<template>
    <div class="board-menu">
        <div class="progress">
            <div class="progress-bar">
                <div class="progress-bar-active">
                </div>
            </div>
            <p class="progress-value">75% complete</p>
        </div>
        <div class="board-menu-right">
            <button class="users-btn">
                Пользователи
            </button>
            <button 
                class="add-column-btn"
                @click="showDialog"
            >
                + Add column
            </button>
        </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex';
export default {
    methods: {
        ...mapActions({
            openCreateColumn: 'dialogModule/openCreateColumn',
            openUserBoard: 'dialogModule/openUserBoard',
            axiosGetUsers: 'usersModule/axiosGetUsers',
            axiosGetBoardPermissions: 'usersModule/axiosGetBoardPermissions',
        }),
        showDialog() {
            this.openCreateColumn();
        },
        openUserModal() {
            this.axiosGetUsers();
            this.openUserBoard();
            this.axiosGetBoardPermissions();

        },
        closeBoard() {
            this.$router.push('/');
        }
    }
}
</script>
<style scoped>
    .board-menu{
    position: fixed;
    padding-left: 298px;
    padding-top: 70px;
    z-index: 10;
    width: 100%;
    height: 85px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: var(--main-background);
}
.progress{
    padding-left: 70px;
    display: flex;
    align-items: center;
}
.progress-bar{
    background-color: rgba(238, 238, 238, 1);
    height: 6px;
    width: 200px;
    border-radius: 6px;
}
.progress-bar-active{
    background-color: var(--main-active);
    height: 6px;
    width: 150px;
    border-radius: 6px;
}
.progress-value{
    color: var(--main-label-text);
    padding-left: 23px;
    font-size: 12px;
    font-weight: 400;
}
.board-menu-right{
    padding-right: 342px;
    display: flex;
    align-items: center;
    gap: 20px;
}
.add-column-btn{
    width: 112px;
    height: 32px;
    background-color: var(--main-active);
    border-radius: 6px;
    color: white;
}
.users-btn{
    width: 112px;
    height: 32px;
    border-radius: 6px;
    color: var(--main-label-text);
    background-color: none;
}
.users-btn:hover{
    width: 112px;
    height: 32px;
    background-color: var(--main-active);
    border-radius: 6px;
    opacity: 1;
    color: white;
}
.users-btn:active{
    opacity: 0.7;
    color: white;
}
</style>