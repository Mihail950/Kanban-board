import instance from "@/utils/axios.config";

const boardsModule = {
    namespaced: true,
    state: {
        boards: [],
        isLoadBoard: false
    },
    getters: {
        boards: (state) => state.boards,
        isLoadBoard: (state) => state.isLoadBoard,
    },
    mutations: {
        SET_BOARDS(state, boards) {
            state.boards = boards;
        },
        SET_IS_LOAD_BOARD(state, isLoad) {
            state.isLoadBoard = isLoad;
        }
    },
    actions: {
        async axiosGetBoards({commit}) {
            await instance.get(`user/${localStorage.getItem('userId')}/boards`
            ).then(response => {
                commit('SET_BOARDS', response.data)
            })
        },
        async axiosDeleteBoard({ dispatch }, { boardId }) {
            await instance.delete(`user/${localStorage.getItem('userId')}/boards/${boardId}`
            ).then(() => {
                dispatch('axiosGetBoards');
            }).catch(error => {
                console.log(error.response.data.cause)
            })
        },
        loadind({commit}, {value}) {
            commit('SET_IS_LOAD_BOARD', value)
        }
    }
}

export default boardsModule