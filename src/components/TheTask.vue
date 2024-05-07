<template>
    <div 
        class="task"
        draggable="true"
        @dragstart = 'dragStart($event)' 
        @dragend = 'dragEnd($event)'
    >
                    <div class="task-header">
                        <p class="task-title">{{ task.name }}</p>
                        <div class="task-top-section task-menu">
                            <button @click="showTaskMenu" class="more-btn">
                                <img src="../assets/image/more-icon.svg" width="5px">
                            </button>
                            <div :class="'task-menu-window--hiden '+ showMenuClass">
                                <button 
                                    :class="'task-menu-window--hiden button_edit ' + showButtonClass"
                                    @click="ShowEditTask"
                                >Редактировать
                                </button>
                                <button 
                                    :class="'task-menu-window--hiden button_del ' + showButtonClass" 
                                    @click="RemoveTask"
                                >Удалить
                                </button>
                            </div>
                        </div>
                    </div>
                    <p class="task-description">{{ task.description }}</p>
                    <p class="task-date">{{ task.plannedCompletionAt.split("T")[0] }}</p>
                </div>
</template>
<script>
import { mapActions } from 'vuex';
export default {
    props: {
        task: {
            type: Object,
            requared: true
        }
    },
    data() {
        return {
            showMenu: false,
            showMenuClass: '',
            showButtonClass: ''
        }
    },
    methods: {
        ...mapActions({
            axiosRemoveTask: 'columnModule/axiosRemoveTask',
            openEditTask: 'dialogModule/openEditTask',
            axiosDragEnd: 'columnModule/axiosDragEnd',
        }),
        dragStart(event) {
            event.target.classList.add('dragging');
        },
        dragEnd(event) {
            this.axiosDragEnd({taskId: this.task.id});
            event.target.classList.remove('dragging');
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
        RemoveTask() {
            this.axiosRemoveTask({taskId: this.task.id})
        },
        ShowEditTask() {
            this.openEditTask({task: this.task})
            this.showTaskMenu()
            
        }
    }
}
</script>
<style scoped>
.task{
    width: 226px;
    height: 96px;
    background-color: var(--main-background);
    border-radius: 6px;
    padding: 12px;
    transition: .2s;
    position:relative;
}
.task:hover{
    transform: translateY(-4px);
    box-shadow: 0px 8px 8px 0px rgba(0, 0, 0, 0.1);
}
.task-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 8px;
}
.task-title{
    font-size: 14px;
    font-weight: 500;
    text-align: center;
}
.task-description{
    font-size: 12px;
    font-weight: 400;
    color: var(--labet-text);
    padding-bottom: 14px;
}
.task-date{
    height: 22px;
    width: 85px;
    background-color: var(--date-background);
    color: #60BF9D;
    border-radius: 10px;
    font-size: 12px;
    font-weight: 500;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: -4px;
    position: absolute;
    bottom: 15px;
}
.more-btn{
    width: 10px;
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
