<template>
    <div 
        class="column"
        @dragover="DragOver"
    >
                <div class="column-header">
                    <div class="column-header-information">
                        <p class="column-title">{{ column.status.name }}</p>
                        <p class="column-task-quantity">{{ column.tasks.length }}</p>
                    </div>
                    <div class="task-top-section task-menu">
                        <button @click="showTaskMenu" class="more-btn">
                            <img src="../assets/image/more-icon.svg" alt="">
                        </button>
                        <div :class="'task-menu-window--hiden '+ showMenuClass">
                            <button 
                                :class="'task-menu-window--hiden button_edit ' + showButtonClass"
                                @click="EditColumn"
                            >Редактировать
                            </button>
                            <button 
                                :class="'task-menu-window--hiden button_del ' + showButtonClass" 
                                @click="DeleteColumn"
                            >Удалить
                            </button>
                        </div>
                    </div>
                </div>
                    <the-task
                        v-for="task in column.tasks"
                        :task="task"
                        :key="task.id"
                    />
                <button 
                    class="add-task-btn" 
                    @click="AddTask"
                >
                    <p>+ Add task</p>
                </button>
            </div>
</template>
<script>
import TheTask from './TheTask.vue';
import { mapActions } from 'vuex';
export default {
    components: { TheTask },
    data() {
        return {
            showMenu: false,
            showMenuClass: '',
            showButtonClass: ''
        }
    },
    props: {
        column: {
            type: Object,
            requared: true
        }
    },
    methods: {
        ...mapActions({
            openCreateTask: 'dialogModule/openCreateTask',
            openEditColumn: 'dialogModule/openEditColumn',
            getDragColumnId: 'columnModule/getDragColumnId',
            axiosRemoveColumn: 'columnModule/axiosRemoveColumn',
        }),
        AddTask() {
            this.openCreateTask({ columnId: this.column.status.id });
        },
        DeleteColumn() {
            this.axiosRemoveColumn({ columnId: this.column.status.id });
        },
        EditColumn() {
            this.openEditColumn({ column: this.column.status });
        },
        DragOver() {
            this.getDragColumnId({columnId: this.column.status.id});
        },
        showTaskMenu() {
            if (this.showMenu === false) {
                this.showMenuClass = 'task-menu-window';
                this.showButtonClass = 'menu-button';
                this.showMenu = true
            }
            else {
                this.showMenu = false;
                this.showMenuClass = '';
                this.showButtonClass = '';
            }
        },
    }
}
</script>
<style scoped>
    .column{
    width: 250px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding-left: 20px;
    padding-top: 18px;
    height: max-content;
}
.column-header{
    display: flex;
    justify-content: space-between;
    padding: 0 15px 0 15px;
    align-items: center;
    padding-bottom: 18px;
}
.column-header-information{
    display: flex;
    gap: 14px;
    align-items: center;
}
.column-title{
    font-size: 14px;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 150px;
}
.column-task-quantity{
    width: 32px;
    height: 20px;
    font-size: 10px;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--main-background);
    border-radius: 10px;
}
.more-btn{
    display: flex;
    justify-content: center;
    align-items: center;
}
.add-task-btn{
    background-color: var(--main-background);
    min-height: 32px;
    width: 250px;
    border: 1px solid var(--main-label-text);
    border-radius: 6px;
    color: var(--main-label-text);
    margin-top: 8px;
}
.add-task-btn:hover{
    transform: scale(1.1);
    opacity: 1;
    box-shadow: 0px 8px 8px 0px rgba(0, 0, 0, 0.1);
}
.add-task-btn:active{
    transform: scale(1.05);
    transition: 0.1s;
    opacity: 1;
    box-shadow: 0px 8px 8px 0px rgba(0, 0, 0, 0.1);
}
.task-menu-window--hiden{
    display: none;
}
.task-menu-window{
    position: absolute;
    height: 50px;
    width: 100px;
    margin: 5px 0 0 0;
    box-shadow: 8px 8px 8px 0px rgba(0, 0, 0, 0.2);
    background: none;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    overflow: hidden;
    right: 0;
    border-radius: 5px;
    z-index: 1;
    margin-top: 10px;
}
.menu-button{
    justify-self:center;
    border: none;
    background-color: #2e3036;
    color: white;
    font-size: 11px;
    font-weight: 600;
    text-align: center;
    width: 110px;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;

}
.button_del{
    background-color: #ad0a0a;
}
.button_edit:hover{
    background-color: var(--main-active);
    opacity: 1;
}
.button_del:hover{
    background-color: #e22222;
    opacity: 1;
}
.button_edit:active{
    opacity: 0.7;
}
.task-menu{
    position: relative;
}
</style>
