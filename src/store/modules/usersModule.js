import instance from "@/utils/axios.config";
import store from '..';

const usersModule = {
    namespaced: true,
    state: {
        searchUsers: [],
        boardUsers: [],
        permissionsVisible: false,
        allPermissions: [],
    },
    getters: {
        searchUsers: (state) => state.searchUsers,
        boardUsers: (state) => state.boardUsers,
        permissionsVisible: (state) => state.permissionsVisible,
        allPermissions: (state) => state.allPermissions,
    },
    mutations: {
        SET_SEARCH_USERS(state, searchUsers) {
            state.searchUsers = searchUsers.slice(0, 8);
        },
        SET_BOARD_USERS(state, boardUsers) {
            state.boardUsers = boardUsers;
        },
        SET_PERMISSIONS_VISIBLE(state) {
            if (state.permissionsVisible === true) {
                state.permissionsVisible = false;
                console.log('close')
                return;
            }
            if (state.permissionsVisible === false) {
                console.log('open')
                state.permissionsVisible = true;
            }
        },
        SET_ALL_PERMISSIONS(state, permission) {
            state.allPermissions = permission;
        }
    },
    actions: {
        async axiosGetSearchUsers({commit}, {email}) {
            await instance.get(`users/match/?email=${email}`
            ).then(response => {
                commit('SET_SEARCH_USERS', response.data.items)
            })
        },
        async axiosGetUsers({commit}) {
            await instance.get(`/boards/${store.state.columnModule.boardId}/users`
            ).then(response => {
                commit('SET_BOARD_USERS', response.data)
            })
        },
        async axiosGetBoardPermissions({ commit }) {
            await instance.get(`/boards/${store.state.columnModule.boardId}/permissions`
            ).then(response => {
                commit('SET_ALL_PERMISSIONS', response.data)
            }).catch(response => {
                commit('SET_ALL_PERMISSIONS', response.data)
            })
        },
        openPermissions({commit}) {
            commit('SET_PERMISSIONS_VISIBLE')
        }
    }
}

export default usersModule