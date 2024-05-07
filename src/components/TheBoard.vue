<template>
    <div class="board-box">
        <div class="kanban-board">
             <the-column 
             v-for="column in columns"
            :key = "column.status.id"
            :column="column"
             />
        </div>
    </div>
</template>
<script>
import TheColumn from './TheColumn.vue'
import { mapGetters } from 'vuex';
export default {
    components: { TheColumn },
    computed: {
        ...mapGetters({
            columns: 'columnModule/columns'
        })   
    }, 
}
</script>
<style scoped>
.board-box{
    position: fixed;
    height: 100%;
    width: 100%;
    padding-left: 297px;
    padding-top: 155px;
    box-sizing: border-box;
    z-index: 1;
}
.kanban-board{
    height: 100%;
    width: 100%;
    z-index: 10;
    overflow-x: scroll;
    overflow-y: scroll;
    background-color: var(--main-border);
    display: flex;
}
</style>