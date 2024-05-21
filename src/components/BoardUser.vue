<template
>
    <div v-if="this.user.id!=this.userId" class="user">
        <div class="user-information">
            <p class="user-name">{{user.name}}</p>
            <p>{{user.email}}</p>
        </div>
        <div v-if='(currentPermissions.includes("manage-board-users"))&&this.ownerName!=this.user.name' class="user-buttons">
            <button @click="deleteUser" class="button"><img class="icon" src="../assets/image/delete-column-icon.svg" height="100%"></button>
            <button @click="openPermissionsWindow" class="button"><img class="icon" src="../assets/image/edit-column-icon.svg" height="100%"></button>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    data(){ 
        return{
            userId: '',
        }
    },
    props: {
        user: {
            type: Object,
            requared: true
        }
    },
    computed: {
        ...mapGetters({
            currentPermissions: 'usersModule/currentPermissions',
            currentUserId: 'usersModule/currentUserId',
            permissionsVisible: 'usersModule/permissionsVisible',
            ownerName: 'usersModule/ownerName',
        })  
    },
    methods: {
        ...mapActions({
            openPermissions: 'usersModule/openPermissions',
            closePermissions: 'usersModule/closePermissions',
            axiosGetUserPermissions: 'usersModule/axiosGetUserPermissions',
            axiosDeleteUserFromBoard: 'usersModule/axiosDeleteUserFromBoard',
        }),
        deleteUser() {
            this.axiosDeleteUserFromBoard({userId:this.user.id});
        },
        openPermissionsWindow() {
            if (this.currentUserId == this.user.id) {
                this.closePermissions();
            } else {
                this.openPermissions(); 
                this.axiosGetUserPermissions({userId: this.user.id});
            }
        },
    },
    created() {
        this.userId = localStorage.getItem('userId');
    },
}
</script>
<style scoped>
p{
    margin: 15px;
}
.user-name{
    font-weight: 600;
    font-size: 17px;
}
.user{
    width: 100%;
    display: flex;
    border-radius: 10px;
    background-color: var(--main-border);
}
.user-information{
    display: flex;
    justify-content: space-around;
    min-width: 78%;
}
.user-buttons{
    display: flex;
    min-width: 20%;
}
.icon{
    border-radius: 10px;
}
.button{
    height: 70%;
    margin: auto;
}
</style>