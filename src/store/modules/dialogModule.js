import instance from "@/utils/axios.config";
import store from '..';

const dialogModule = {
    namespaced: true,
    state: {
        oldBoard: '',
        oldColumn: '',
        oldTask: '',
        
        ColumnId: '',

        CreateTaskdialogVisible: false,
        EditTaskdialogVisible: false,
      
        ColumndialogVisible: false,
        EditColumndialogVisible: false,

        CreateBoardDialogVisible: false,
        EditBoardDialogVisible: false,

        UserBoardDialogVisible: false
    },
    getters: {
        oldBoard: (state) => state.oldBoard,
        oldColumn: (state) => state.oldColumn,
        oldTask: (state) => state.oldTask,
        CreateTaskdialogVisible: (state) => state.CreateTaskdialogVisible,
        EditTaskdialogVisible: (state) => state.EditTaskdialogVisible,
        EditColumndialogVisible: (state) => state.EditColumndialogVisible,
        ColumndialogVisible: (state) => state.ColumndialogVisible,
        CreateBoardDialogVisible: (state) => state.CreateBoardDialogVisible,
        EditBoardDialogVisible: (state) => state.EditBoardDialogVisible,
        UserBoardDialogVisible: (state) => state.UserBoardDialogVisible,
    },
    mutations: {
        SET_OLD_BOARD(state, oldBoard) {
            state.oldBoard = oldBoard;
        },
        SET_OLD_COLUMN(state, oldColumn) {
            state.oldColumn = oldColumn;
        },
        SET_OLD_TASK(state, oldTask) {
            state.oldTask = oldTask;
        },
        SET_CREATE_TASK_VISIBLE(state) {
            state.CreateTaskdialogVisible = true;
        },
        SET_EDIT_TASK_VISIBLE(state) {
            state.EditTaskdialogVisible = true;
        },
        SET_CREATE_COLUMN_VISIBLE(state) {
            state.ColumndialogVisible = true;
        },
        SET_EDIT_COLUMN_VISIBLE(state) {
            state.EditColumndialogVisible = true;
        },
        SET_CREATE_BOARD_VISIBLE(state) {
            state.CreateBoardDialogVisible = true;
        },
        SET_EDIT_BOARD_VISIBLE(state) {
            state.EditBoardDialogVisible = true;
        },
        SET_USER_BOARD_VISIBLE(state) {
            state.UserBoardDialogVisible = true;
        },
        SET_DIALOG_HIDE(state) {
            state.CreateTaskdialogVisible = false;
            state.EditTaskdialogVisible = false;
            state.ColumndialogVisible = false;
            state.CreateBoardDialogVisible = false;
            state.EditBoardDialogVisible = false;
            state.EditColumndialogVisible = false;
            state.UserBoardDialogVisible = false;
        },
        SET_COLUMN_ID(state, ColumnId) {
            state.ColumnId = ColumnId;
        }
    },
    actions: {
        async axiosCreateBoard({ dispatch }, { board }) {
            await instance.post(`user/${localStorage.getItem('userId')}/boards`,{
                formData: {
                    name: board.title,
                    description: board.description
                    }
            }).then(() => {
                dispatch('boardsModule/axiosGetBoards', null, {root: true});
            })
        },
        async axiosEditBoard({ dispatch, state }, { board }) {
            await instance.put(`user/${localStorage.getItem('userId')}/boards/${state.oldBoard.id}`,{
                formData: {
                    name: board.title,
                    description: board.description
                    }
            }).then(() => {
                dispatch('boardsModule/axiosGetBoards', null, { root: true });
            })
        },
        async axiosCreateTask({ dispatch, state }, { task }) {
            await instance.post(`boards/${store.state.columnModule.boardId}/tasks`, {
                formData: {
                    statusId: state.ColumnId,
                    name: task.title,
                    description: task.description,
                    plannedCompletionAt: task.date
                  }
            }).then(() => {
                dispatch('columnModule/axiosGetStatuses', null, { root: true });
              })
        },
        async axiosEditTask({ dispatch, state }, { task }) {
            await instance.put(`boards/${store.state.columnModule.boardId}/tasks/${state.oldTask.id}`, {
                formData: {
                    statusId: state.oldTask.statusId,
                    name: task.title,
                    description: task.description,
                    plannedCompletionAt: task.date
                  }
            }).then(() => {
                dispatch('columnModule/axiosGetStatuses', null, { root: true });
              })
        },
        async axiosCreateColumn({ dispatch }, { column }) {
            await instance.post(`boards/${store.state.columnModule.boardId}/statuses`, {
                formData: {
                    name: column.title
                    }
            }).then(() => {
                dispatch('columnModule/axiosGetStatuses', null, { root: true });
              })
        },
        async axiosEditColumn({ dispatch, state }, {columnTitle}) {
            await instance.put(`boards/${store.state.columnModule.boardId}/statuses/${state.oldColumn.id}`, {
                formData: {
                    name: columnTitle
                  }
            }).then(() => {
                dispatch('columnModule/axiosGetStatuses', null, { root: true });
              })
        },
        openEditBoard({ commit }, { board }) {
            commit('SET_OLD_BOARD', board);
            commit('SET_EDIT_BOARD_VISIBLE')
        },
        openCreateBoard({ commit }) {
            commit('SET_CREATE_BOARD_VISIBLE')
        },
        openCreateColumn({ commit }) {
            commit('SET_CREATE_COLUMN_VISIBLE')
        },
        openEditColumn({ commit }, { column }) {
            commit('SET_EDIT_COLUMN_VISIBLE')
            commit('SET_OLD_COLUMN', column)
        },
        openCreateTask({ commit }, { columnId }) {
            commit('SET_CREATE_TASK_VISIBLE')
            commit('SET_COLUMN_ID', columnId)
        },
        closeModal({ commit }) {
            commit('SET_DIALOG_HIDE')
            store.state.usersModule.searchUsers = [];
        },
        openEditTask({ commit }, { task }) {
            commit('SET_OLD_TASK', task);
            commit('SET_EDIT_TASK_VISIBLE')
        }, 
        openUserBoard({ commit }) {
            commit('SET_USER_BOARD_VISIBLE')
        }
    }
}

export default dialogModule