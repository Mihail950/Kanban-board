<template>
    <div class="dialog" v-if="CreateBoardDialogVisible">
        <div class="dialog-window">
            <form @submit.prevent="onSubmit" class="dialog__content">
                <h3 class="dialog-title">Новая доска</h3>
                <input
                    required
                    minlength="5"
                    v-model="newBoard.title"
                    type="text"
                    placeholder="Введите заголовок"
                />
                <textarea
                    required
                    minlength="5"
                    v-model="newBoard.description"
                    placeholder="Введите описание"
                ></textarea>
                <button class="button button-new" @click="CreateBoard">Создать доску</button>
            </form>
            <button class=" button btn-close" @click="hideDialog">×</button>
        </div>
    </div>
    <div class="dialog" v-if="ColumndialogVisible">
        <div class="dialog-window">
            <form @submit.prevent="onSubmit" class="dialog__content">
                <h3 class="dialog-title">Новая колонка</h3>
                <input
                    required
                    minlength="5"
                    type="text"
                    placeholder="Введите название колонки"
                    v-model="newColumn.title"
                >
                <button type="submit" class="button button-new" @click="CreateColumn">Создать колонку</button>
            </form>
            <button class=" button btn-close" @click="hideDialog">×</button>
        </div>
    </div>
    <div class="dialog" v-if="CreateTaskdialogVisible">
        <div class="dialog-window">
            <form @submit.prevent="onSubmit" class="dialog__content">
                <h3 class="dialog-title">Новая задача</h3>
                <input
                    required
                    minlength="5"
                    v-model="newTask.title"
                    type="text"
                    placeholder="Введите заголовок"
                />
                <textarea
                    required
                    minlength="5"
                    v-model="newTask.description"
                    placeholder="Введите описание"
                ></textarea>
                <input
                    required
                    v-model="newTask.date"
                    type="date"
                />
                <button class="button button-new" @click="CreateTask">Создать задачу</button>
            </form>
            <button class=" button btn-close" @click="hideDialog">×</button>
        </div>
    </div>
    <div class="dialog" v-if="EditBoardDialogVisible ">
        <div class="dialog-window">
            <form @submit.prevent="onSubmit" class="dialog__content">
                <input
                    required
                    minlength="5"
                    v-model="Board.title"
                    type="text"
                    placeholder="Введите заголовок"
                />
                <textarea
                    required
                    minlength="5"
                    v-model="Board.description"
                    placeholder="Введите описание"
                ></textarea>
                <button type="submit" class="button button-new" @click="EditBoard">Сохранить</button>
            </form>
            <button class=" button btn-close" @click="hideDialog">×</button>
        </div>
    </div>
    <div class="dialog" v-if="EditColumndialogVisible ">
        <div class="dialog-window">
            <form @submit.prevent="onSubmit" class="dialog__content">
                <input
                    required
                    minlength="5"
                    v-model="Column.title"
                    type="text"
                    placeholder="Введите заголовок"
                />
                <button type="submit" class="button button-new" @click="EditColumn">Сохранить</button>
            </form>
            <button class=" button btn-close" @click="hideDialog">×</button>
        </div>
    </div>
    <div class="dialog" v-if="EditTaskdialogVisible">
        <div class="dialog-window">
            <form @submit.prevent="onSubmit" class="dialog__content">
                <input
                    required
                    minlength="5"
                    v-model="Task.title"
                    type="text"
                    placeholder="Введите заголовок"
                />
                <textarea
                    required
                    minlength="5"
                    v-model="Task.description"
                    placeholder="Введите описание"
                ></textarea>
                <input
                    v-model="Task.date"
                    type="date"
                />
                <button class="button button-new" @click="EditTask">Сохранить</button>
            </form>
            <button class=" button btn-close" @click="hideDialog">×</button>
        </div>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    data(){
        return{
            newBoard: {
                title: '',
                description:''
            },
            newColumn: {
                title: ''
            },
            newTask: {
                title: '',
                description:'',
                date: ''
            },
            Board: {
                title: '',
                description:''
            },
            Column: {
                title: '',
            },
            Task: {
                title: '',
                description: '',
                date: '',
            } 
        }
    },
    computed: {
        ...mapGetters({
            CreateBoardDialogVisible: 'dialogModule/CreateBoardDialogVisible',
            ColumndialogVisible: 'dialogModule/ColumndialogVisible',
            CreateTaskdialogVisible: 'dialogModule/CreateTaskdialogVisible',

            oldBoard: 'dialogModule/oldBoard',
            EditBoardDialogVisible: 'dialogModule/EditBoardDialogVisible',

            oldColumn: 'dialogModule/oldColumn',
            EditColumndialogVisible: 'dialogModule/EditColumndialogVisible',

            oldTask: 'dialogModule/oldTask',
            EditTaskdialogVisible: 'dialogModule/EditTaskdialogVisible',
        })  
    },
    watch: {
        'oldBoard': function (board) {
            this.Board.title = board.name;
            this.Board.description = board.description;
        },
        'oldColumn': function (column) {
            this.Column.title = column.name;
        },
        'oldTask': function (task) {
            this.Task.title = task.name;
            this.Task.description = task.description;
            this.Task.date = task.plannedCompletionAt.split("T")[0];
        }
    },
    methods: {
        ...mapActions({
            axiosCreateBoard: 'dialogModule/axiosCreateBoard',
            axiosCreateColumn: 'dialogModule/axiosCreateColumn',
            axiosCreateTask: 'dialogModule/axiosCreateTask',
            axiosEditBoard: 'dialogModule/axiosEditBoard',
            axiosEditColumn: 'dialogModule/axiosEditColumn',
            axiosEditTask: 'dialogModule/axiosEditTask',
            closeModal: 'dialogModule/closeModal',
        }),
        CreateBoard() {
            if (this.newBoard.title.length >= 5 && this.newBoard.description.length >= 5) {
                this.axiosCreateBoard({ board: this.newBoard });
                this.hideDialog()
                this.newBoard = {
                    title: '',
                    description:''
                }
            }
        },
        CreateColumn() {
            this.axiosCreateColumn({column: this.newColumn});
            if (this.newColumn.title.length >= 5) {
                this.hideDialog()
                this.newColumn = {
                    title: '',
                }  
            }
        },
        CreateTask() {
            this.axiosCreateTask({task: this.newTask});
            if (this.newTask.title.length >= 5 && this.newTask.description.length >= 5 && this.newTask.description.length >= 10) {
                this.hideDialog()
                this.newTask = {
                    title: '',
                    description: '',
                    date: ''
                }  
            }
        },
        EditBoard() {
            if (this.Board.title.length >= 5 && this.Board.description.length >= 5) {
                this.axiosEditBoard({ board: this.Board });
                this.hideDialog()
                this.Board = {
                    title: '',
                    description:''
                }
            }
        },
        EditColumn() {
            if (this.Column.title.length >= 5) {
                this.axiosEditColumn({ columnTitle: this.Column.title });
                this.hideDialog()
                this.Column = {
                    title: '',
                }
            }
        },
        EditTask() {
            if (this.Task.title.length >= 5 && this.Task.description.length >= 5 && this.Task.date.length >= 10) {
                this.axiosEditTask({ task: this.Task });
                this.hideDialog()
                this.Task = {
                    title: '',
                    description: '',
                    date: ''
                }  
            }
        },
        hideDialog() {
            this.closeModal();
            this.newBoard = {
                title: '',
                description:''
            },
            this.newColumn = {
                title: ''
            },
            this.newTask = {
                title: '',
                description: '',
                date: ''
            }
        }
    }
}
</script>
<style scoped>
.dialog-title{
    margin-bottom: 10px;
    font-size: 25px;
}
 input[type="text"],
  input[type="date"],
  textarea {
    padding: 10px;
    background-color: var(--main-border);
    border: none;
    border-radius: 5px;
    color: var(--main-text);
  }
  
  textarea {
    resize: vertical; 
  }
.button-new{
    border: none;
    background-color: var(--main-active);
    color: white;
    font-size: 14px;
    line-height: 14px;
    letter-spacing: 0px;
    text-align: center;
    width: 140px;
    height: 38px;
    top: 94px;
    padding: 12px, 24px, 12px, 24px;
    border-radius: 19px;
    margin: 12px 0 0 0;
    align-self: flex-end;
}
.button-new:hover {
    opacity: 90%;
}
.button-new:active {
    opacity: 50%;
}
.dialog{
    top: 0;
    bottom: 0;
    margin: 0;
    right: 0;
    left: 0;
    background: rgba(0,0,0,0.5);
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
    width: 430px;
    gap: 10px;
}
.dialog-window{
    display: flex;
    margin: auto;
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