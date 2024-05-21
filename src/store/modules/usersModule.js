import instance from "@/utils/axios.config";
import store from '..';

const usersModule = {
    namespaced: true,
    state: {
        searchUsers: [],
        boardUsers: [],
        permissionsVisible: false,
        allPermissions: [],
        currentPermissions: [],
        currentUserId: '',
        userPermissions: [],
        ownerName: ''
    },
    getters: {
        searchUsers: (state) => state.searchUsers,
        boardUsers: (state) => state.boardUsers,
        permissionsVisible: (state) => state.permissionsVisible,
        allPermissions: (state) => state.allPermissions,
        currentPermissions: (state) => state.currentPermissions,
        userPermissions: (state) => state.userPermissions,
        ownerName: (state) => state.ownerName,
        currentUserId: (state) => state.currentUserId,
    },
    mutations: {
        SET_SEARCH_USERS(state, searchUsers) {
            state.searchUsers = searchUsers.slice(0, 8);
        },
        SET_BOARD_USERS(state, boardUsers) {
            state.boardUsers = boardUsers;
        },
        SET_PERMISSIONS_OPEN(state) {
            state.permissionsVisible = true;
        },
        SET_PERMISSIONS_CLOSE(state) {
            state.permissionsVisible = false;
        },
        SET_ALL_PERMISSIONS(state, permission) {
            state.allPermissions = permission;
        },
        SET_CURRENT_PERMISSIONS(state, permission) {
            state.currentPermissions = permission;
        },
        SET_USER_PERMISSIONS(state, permission) {
            state.userPermissions = permission;
        },
        SET_OWNER_NAME(state, name) {
            state.ownerName = name;
        },
        SET_CURRENT_USER_ID(state, id) {
            state.currentUserId = id;
        },
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
        async axiosGetCurrentPermissions({ commit }) {
            const userId = localStorage.getItem('userId');
            await instance.get(`/boards/${store.state.columnModule.boardId}/users/${userId}/permissions`
            ).then(response => {
                commit('SET_CURRENT_PERMISSIONS', response.data)
            }).catch(response => {
                commit('SET_CURRENT_PERMISSIONS', response.data)
            })
        },
        async axiosGetUserPermissions({ commit }, {userId}) {
            await instance.get(`/boards/${store.state.columnModule.boardId}/users/${userId}/permissions`
            ).then(response => {
                commit('SET_USER_PERMISSIONS', response.data)
                commit('SET_CURRENT_USER_ID', userId)
            }).catch(response => {
                commit('SET_USER_PERMISSIONS', response.data)
                commit('SET_CURRENT_USER_ID', userId)
            })
        },
        async axiosAddUserToBoard({dispatch},{userId}){
            const BOARD_ID = store.state.columnModule.boardId;

            await instance.post(`boards/${BOARD_ID}/users`, {formData: {ids: [userId]}})
            .then(() => dispatch('axiosGetUsers'));
        },
        async axiosDeleteUserFromBoard({dispatch}, {userId}){
            const BOARD_ID = store.state.columnModule.boardId;
            await instance.delete(`/boards/${BOARD_ID}/users/${userId}`)
            .then(() => dispatch('axiosGetUsers'));
        },
        async axiosDeletePermission({dispatch, state},{permission}){
            await instance.delete(`boards/${store.state.columnModule.boardId}/users/${state.currentUserId}/permissions/${permission}`)
            .then(() => {
                dispatch('axiosGetUserPermissions', {userId: state.currentUserId});
            });
        },
        async axiosAddPermission({dispatch, state}, {permission}){
            await instance.put(`boards/${store.state.columnModule.boardId}/users/${state.currentUserId}/permissions/${permission}`)
            .then(()=>{
                dispatch('axiosGetUserPermissions', {userId: state.currentUserId});
            })
        },
        setOwnerName({commit}, {name}) {
            commit('SET_OWNER_NAME', name)
        },
        openPermissions({commit}) {
            commit('SET_PERMISSIONS_OPEN')
        },
        closePermissions({commit}) {
            commit('SET_PERMISSIONS_CLOSE');
            commit('SET_CURRENT_USER_ID', undefined);
        },
    }
}

export default usersModule