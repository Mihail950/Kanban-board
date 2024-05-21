<template>
    <div 
        class="project-item"
        :class="{'project-item_active':board.id==boardId}"
        @click="openBoard"

    >
        <p class="project-title"
            :class="{'project-title_active':board.id==boardId}"
        >{{ board.name }}</p>
        <div>
            <button @click.stop="showEditBoard" >
                <img v-if='boardPermission.includes("manage-board")' class="edit-icon" :class="{'trash-icon-hidden':board.id==boardId}" src="../assets/image/icons8-редактировать.svg">
                <img v-if='boardPermission.includes("manage-board")' class="edit-icon" :class="{'trash-icon-hidden':board.id!=boardId}" src="../assets/image/icons8-редактировать-white.svg">
            </button>
            <button @click.stop="deleteBoard" >
                <img v-if='boardPermission.includes("delete-board")' class="trash-icon" :class="{'trash-icon-hidden':board.id==boardId}" src="../assets/image/icons8-trash.svg">
                <img v-if='boardPermission.includes("delete-board")' class="trash-icon" :class="{'trash-icon-hidden':board.id!=boardId}" src="../assets/image/icons8-trash-white.svg">
            </button>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import instance from "@/utils/axios.config";
export default {
    name: 'project-item',
    data(){
        return{
            boardPermission: ''
        }
    },
    props: {
        board: {
            type: Object,
            requared: true
        }
    },
    computed: {
        ...mapGetters({
            boardId: 'columnModule/boardId',
     })   
    },  
    methods: {
        ...mapActions({
            axiosDeleteBoard: 'boardsModule/axiosDeleteBoard',
            loadind: 'boardsModule/loadind',
            getBoardId: 'columnModule/getBoardId',
            getBoardDescription: 'columnModule/getBoardDescription',
            axiosGetStatuses: 'columnModule/axiosGetStatuses',
            axiosGetCurrentPermissions: 'usersModule/axiosGetCurrentPermissions',
            openEditBoard: 'dialogModule/openEditBoard',
            setOwnerName: 'usersModule/setOwnerName', 
        }),
        async axiosGetBoardPermission() {
            const userId = localStorage.getItem('userId');
            await instance.get(`/boards/${this.board.id}/users/${userId}/permissions`
            ).then(response => {
                this.boardPermission = response.data
            }).catch(response => {
                this.boardPermission = response.data
            })
        },
        async openBoard() {
            this.loadind({ value: true });
            this.$router.push('/board/' + this.board.id);
            this.getBoardId({ boardId: this.board.id });
            this.setOwnerName({ name: this.board.owner.name });
            this.getBoardDescription({ description: this.board.description });
            this.axiosGetCurrentPermissions();
            await new Promise(resolve => setTimeout(resolve, 1000));
            await this.axiosGetStatuses();
            this.loadind({ value: false });
        },
        deleteBoard() {
            this.axiosDeleteBoard({boardId: this.board.id});
        },
        showEditBoard() {
            this.openEditBoard({ board: this.board });
        },
    },
    created(){
        this.axiosGetBoardPermission();
        this.axiosGetCurrentPermissions();
    },
}
</script>
<style scoped>
.project-title{
    font-weight: 500;
    font-size: 12px;
    padding: 5px;
    padding-left: 15px;
    color: var(--main-text);
}
.project-title_active{
    color: white;
}
.project-item{
    display: flex;
    align-items: center;
    min-height: 32px;
    border: 2px solid var(--main-border);
    border-radius: 6px;
    justify-content: space-between;
}
.project-item_active{
    background-color: var(--main-active);
    border: 2px solid var(--main-active);
}
.project-item:hover{
    cursor: pointer;
}
.trash-icon{
    width: 22px;
    margin-right: 5px;
}
.edit-icon{
    width: 19px;
    margin-right: 5px;
}
.trash-icon-hidden{
    display: none;
}
</style>