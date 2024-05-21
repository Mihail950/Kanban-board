<template>
    <div class="dialog" v-if="UserBoardDialogVisible">
        <div class="dialog-window">
            <div class="dialog__content">
                <h3 class="dialog-title">Управление пользователями</h3>
                <div class="dialog-modules">
                    <div class="board-users">
                        <board-user
                            v-for="user in boardUsers"
                            v-bind:key="user.id"
                            :user="user"
                        />
                    </div>
                    <div v-if='!permissionsVisible && (currentPermissions.includes("manage-board-users"))' class="users-search">
                        <input v-model="searchEmail" type="text" placeholder="Введите имя или Email пользователя">
                        <div @click="addUser(user.id)" class="search-users-item" v-for="user in searchUsers" v-bind:key="user.id">
                            {{user.email}}
                        </div>
                    </div>
                    <div class="user-permission" v-if='permissionsVisible && (currentPermissions.includes("manage-board-users"))'>
                        <button @click="closePermissionsWindow" class="button">Закрыть</button>
                        <label v-for="permission in allPermissions" :key="permission.index" class="user-checkbox">
                            <div>{{permissionsLabels[permission]}}</div>
                            <input 
                                type='checkbox' 
                                class='checkbox'
                                :checked = 'userPermissions.includes(permission)'
                                @change='changePermission($event.target.checked, permission)'
                            />
                        </label>
                    </div>
                </div>
            </div>
            <button class="button btn-close" @click="hideDialog">×</button>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import BoardUser from '@/components/BoardUser.vue'
export default {
    components: { BoardUser },
    data(){
        return{
            searchEmail: '',
            permissionsLabels: {
                'delete-board': 'Удаление досок',
                'delete-board-statuses': 'Удаление статусов доски',
                'manage-board': 'Управление доской',
                'manage-board-statuses': 'Управление статусами доски',
                'manage-board-users': 'Управление пользователями доски',
            }
        }
    },
    watch:{
        searchEmail(email){
            if(email.length > 4){
                this.axiosGetSearchUsers({email: this.searchEmail});
            }
        }
    },
    computed: {
        ...mapGetters({
            UserBoardDialogVisible: 'dialogModule/UserBoardDialogVisible',
            searchUsers: 'usersModule/searchUsers',
            boardUsers: 'usersModule/boardUsers',
            permissionsVisible: 'usersModule/permissionsVisible',
            allPermissions: 'usersModule/allPermissions',
            currentPermissions: 'usersModule/currentPermissions',
            userPermissions: 'usersModule/userPermissions',
        })  
    },
    methods: {
        ...mapActions({
            closeModal: 'dialogModule/closeModal',
            axiosGetSearchUsers: 'usersModule/axiosGetSearchUsers',
            openPermissions: 'usersModule/openPermissions',
            axiosAddUserToBoard: 'usersModule/axiosAddUserToBoard',
            axiosAddPermission: 'usersModule/axiosAddPermission',
            axiosDeletePermission: 'usersModule/axiosDeletePermission',
            closePermissions: 'usersModule/closePermissions',
        }),
        closePermissionsWindow() {
            this.closePermissions();
        },
        changePermission(checked, permission){
            if(checked === true){
                this.axiosAddPermission({boardId: this.$route.params.id, permission});
                return;
            }
            this.axiosDeletePermission({boardId: this.$route.params.id, permission});
        },
        addUser(userId) {
            this.axiosAddUserToBoard({userId:userId})
        },
        hideDialog() {
            this.closeModal();
            this.searchEmail = '';
        },
        PermissionsVisible() {
            this.openPermissions()
        }
    }
}
</script>
<style scoped>
.dialog-title{
    margin-bottom: 20px;
    font-size: 25px;
}
 input[type="text"] {
    padding: 10px;
    border: 0px;
    border-radius: 5px;
    width: 80%;
    background-color: var(--main-border);
  }
  
  textarea {
    resize: vertical; 
  }
.dialog{
    top: 0;
    bottom: 0;
    margin: 0;
    right: 0;
    left: 0;
    background: var(--modal-background);
    position: absolute;
    display: flex;
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 1000;
}
.dialog__content{
    background: var(--main-background);
    border-radius: 10px;
    padding: 20px 15px;
    margin: auto;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    gap: 5px;
}
.dialog-modules{
    display: flex;
    flex-direction:row;
}
.board-users{
    width: 100%;
    display: flex;
    flex-direction: column-reverse;
    gap: 5px;
    height: max-content;
}
.users-search{
    min-width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    height: max-content;
}
.user-permission{
    min-width: 50%;
    display: flex;
    flex-direction: column;
    align-items: baseline;
    gap: 10px;
    height: max-content;
}
.user-checkbox{
    display: flex;
    justify-content: space-between;
    width: 90%;
    align-items: center;
    border-radius: 10px;
    background-color: rgb(199, 199, 199);
    padding: 10px 5px;
    margin-left: 25px;
}
.checkbox{
    width: 25px;
    height: 25px;
}
.search-users-item{
    border-radius: 10px;
    background-color: rgb(199, 199, 199);
    width: 80%;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    
}
.search-users-item:hover{
    opacity: 0.8;
    cursor: pointer;
}
.search-users-item:active{
    opacity: 0.6;
}
.dialog-window{
    display: flex;
    margin: auto;
    min-width: 850px;
    height: 60%;
}
.btn-close{
    align-self: flex-start;
    margin-left: 5px;
    background: none;
    padding: 10px 12px;
    font-size: 50px;
    margin-right: -55px;
    color:  #1C1D22;
}
</style>