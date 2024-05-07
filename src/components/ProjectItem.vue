<template>
    <div 
        class="project-item"
        :class="{'project-item_active':board.id==boardId}"
        @click="openBoard"

    >
        <p class="project-title"
            :class="{'project-title_active':board.id==boardId}"
        >{{ board.name }}</p>
        <button @click.stop="deleteBoard" >
            <img class="trash-icon" :class="{'trash-icon-hidden':board.id==boardId}" src="../assets/image/icons8-trash.svg">
            <img class="trash-icon" :class="{'trash-icon-hidden':board.id!=boardId}" src="../assets/image/icons8-trash-white.svg">
        </button>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    name: 'project-item',
    props: {
        board: {
            type: Object,
            requared: true
        }
    },
    computed: {
        ...mapGetters({
            boardId: 'columnModule/boardId'
     })   
    },  
    methods: {
        ...mapActions({
            axiosDeleteBoard: 'boardsModule/axiosDeleteBoard',
            loadind: 'boardsModule/loadind',
            getBoardId: 'columnModule/getBoardId',
            axiosGetStatuses: 'columnModule/axiosGetStatuses',
        }),
        async openBoard() {
            this.loadind({ value: true });
            console.log('0');
            this.$router.push('/board/' + this.board.id);
            this.getBoardId({ boardId: this.board.id });
            await new Promise(resolve => setTimeout(resolve, 1000));
            await this.axiosGetStatuses();
            this.loadind({ value: false });
            console.log('1');
        },
        deleteBoard() {
            this.axiosDeleteBoard({boardId: this.board.id});
        }
    }
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
.trash-icon-hidden{
    display: none;
}
</style>