import instance from "@/utils/axios.config";

const authModule = {
    namespaced: true,
    state: {
        token: '',
        userId: ''
    },
    getters: {
        token: (state) => state.token,
        userId: (state) => state.userId
    },
    mutations: {
        SET_USER_INFO(state, userInfo) {
            state.userId = userInfo.userId;
            state.token = userInfo.token;
        }
    },
    actions: {
        async axiosSignIn({commit}, { authForm }) {
            await instance.post('auth/signin', {
                formData: {
                    email: authForm.login,
                    password: authForm.password
                }
            }).then(response => {
                const token = response.data.token;
                const userId = response.data.userId;
              
                localStorage.setItem('token', token);
                localStorage.setItem('userId', userId);
                
                commit('SET_USER_INFO', { userId, token });
                window.location.reload();
            }).catch(error => {
                console.log(error.response.data.cause)
            })
        },
        async axiosSignUp({ dispatch },{ regForm }) {
            await instance.put('auth/signup', {
                formData: {
                    name: regForm.name,
                    email: regForm.login,
                    password: regForm.password
                    }
            }).then(() => {
                dispatch('axiosSignIn', { authForm: regForm });
            })
        },
        
        ExitUser() {
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            window.location.reload();
        },
        
        addUserInfo({ commit }, { userId, token }) {
            commit('SET_USER_INFO', { userId, token })
        }
    }
}

export default authModule