import instance from "@/utils/axios.config";


const columnModule = {
    namespaced: true,
    state: {
        columns: [],
        boardId: '',
        DragColumnId: '',
        description: ''
    },
    getters: {
        columns: (state) => state.columns,
        boardId: (state) => state.boardId,
        description: (state) => state.description,
    },
    mutations: {
        SET_COLUMNS(state, columns) {
            state.columns = columns;
        },
        SET_BOARD_ID(state, boardId) {
            state.boardId = boardId;
        },
        SET_BOARD_DESCRIPTION(state, description) {
            state.description = description;
        },
        SET_DRAG_COLUMN_ID(state, DragColumnId) {
            state.DragColumnId = DragColumnId;
        }
    },
    actions: {
        async axiosGetStatuses({ commit, state }) {
            await instance.get(`boards/${state.boardId}/tasks`
            ).then(response => {
                commit('SET_COLUMNS', response.data)
              })
        },
        async axiosRemoveTask({ dispatch, state },{taskId}) {
            await instance.delete(`boards/${state.boardId}/tasks/${taskId}`
            ).then(() => {
                dispatch('axiosGetStatuses')
              })
        },
        async axiosRemoveColumn({ dispatch, state },{columnId}) {
            await instance.delete(`boards/${state.boardId}/statuses/${columnId}`
            ).then(() => {
                dispatch('axiosGetStatuses')
              })
        },
        async axiosDragEnd({ dispatch, state }, { taskId }) {
            await instance.patch(`boards/${state.boardId}/tasks/${taskId}`, {
                formData: {
                    statusId: state.DragColumnId
                  }
            }).then(() => {
                dispatch('axiosGetStatuses')
            }).catch(() => {
                console.log(state.boardId);
                console.log(state.DragColumnId);
                console.log(taskId);
            })
        },
        getDragColumnId({ commit }, { columnId }) {
            commit('SET_DRAG_COLUMN_ID', columnId);
        },
        getBoardId({ commit }, { boardId }) {
            commit('SET_BOARD_ID', boardId);
        },
        getBoardDescription({ commit }, { description }) {
            commit('SET_BOARD_DESCRIPTION', description);
        }
    }
}

export default columnModule