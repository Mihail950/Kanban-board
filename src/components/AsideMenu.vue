<template>
        <div class="aside-menu">
        <div class="projects">
            <h1 class="aside-menu-title">Projects</h1>
            <project-item
                v-for="board in boardsGetter"
                :key="board.id"
                :board="board"
                @open-board="openBoard"
            />
            <button @click="showDialog" class="new-board-btn">+ Новый проект</button>
        </div>
        <div v-if="boardId">
            <div class="analytics">
            <h2>Analytics</h2>
            <div class="board-time">
                <h3 class="analytic-title">TOTAL TIME</h3>
                <p class="analitic-time">2d 3h</p>
                <img src="../assets/image/time-graph.svg" height="60px">
            </div>
        </div>
        <div class="analytics">
            <h2>Описание: {{ description }}</h2>
        </div>
        <div class="analytics">
            <h2>Владелец: {{ ownerName }}</h2>
        </div>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import ProjectItem from './ProjectItem.vue';
export default {
    components: { ProjectItem },
    name: 'aside-menu',
    computed:{
        ...mapGetters({
            boardsGetter: 'boardsModule/boards',
            ownerName: 'usersModule/ownerName',
            description: 'columnModule/description',
            boardId: 'columnModule/boardId',
        })
    },
    methods: {
        ...mapActions({
            openCreateBoard: 'dialogModule/openCreateBoard',
        }),
        showDialog() {
            this.openCreateBoard();
        }
    }
}
</script>
<style scoped>
    .aside-menu{
    position: fixed;
    display: flex;
    flex-direction: column;
    padding: 11px;
    padding-left: 79px;
    width: 205px;
    height: 100%;
    overflow-x: scroll;
    border-right: 3px solid var(--main-border);
    z-index: 20;
    background-color: var(--main-background);
}
.projects{
    display: flex;
    flex-direction: column;
    gap: 8px;
}
.aside-menu-title{
    padding-left: 6px;
    padding-bottom: 10px;
}
.analytics{
    margin-top: 54px;
}
.board-time{
    border: 2px solid var(--main-border);
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 8px;
    height: 132px;
}
.analytic-title{
    color: var(--labet-text);
    font-weight: 400;
    font-size: 10px;
    margin-top: 15px;
}
.analitic-time{
    font-weight: 600;
    font-size: 24px;
}
.new-board-btn{
    min-height: 32px;
    border: 2px solid var(--main-border);
    background-color: var(--main-border);
    border-radius: 6px;
    color: var(--main-text);
}
.new-board-btn:hover{
    transform: scale(1.1);
    opacity: 1;
    box-shadow: 0px 8px 8px 0px rgba(0, 0, 0, 0.1);
}
.new-board-btn:active{
    transform: scale(1.05);
    transition: 0.1s;
    opacity: 1;
    box-shadow: 0px 8px 8px 0px rgba(0, 0, 0, 0.1);
}
</style>