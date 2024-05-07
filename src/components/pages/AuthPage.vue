<template lang="">
        <navigation-menu/>
    <main>
            <div class="main-block__head">
                <form v-if='isSignIn' class="main-block__auth-form" @submit.prevent = "">
                    <h1>Вход</h1>
                    <div class="auth-form__login">
                        <label for="email">Почта</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            placeholder="Example@email.com" 
                            required
                            v-model = "AuthForm.login"
                            >
                    </div>
                    <div class="auth-form__password">
                        <label for="password">Пароль</label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            minlength="5" 
                            placeholder="Пароль должен содержать 5 символов" 
                            required
                            v-model = "AuthForm.password"
                        >
                    </div>
                    <button @click = "signIn" type="submit" class="login-button">Войти</button>
                </form>

                <form v-if='isSignUp' class="main-block__auth-form" @submit.prevent = "">
                    <h1>Регистрация</h1>
                    <div class="auth-form__login">
                        <label for="name">Ваше имя</label>
                        <input 
                            type="name" 
                            id="name" 
                            name="name" 
                            placeholder="Имя" 
                            required
                            v-model = "RegForm.name"
                            >
                    </div>
                    <div class="auth-form__login">
                        <label for="email">Почта
                        </label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            placeholder="Example@email.com" 
                            required
                            v-model = "RegForm.login"
                            >
                    </div>
                    <div class="auth-form__password">
                        <label for="password">Пароль
                        </label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            minlength="5" 
                            placeholder="Пароль должен содержать 5 символов" 
                            required
                            v-model = "RegForm.password"
                            >
                    </div>
                    <div class="auth-form__password">
                        <label for="confirm-password">Подтвердите пароль</label>
                        <input 
                            type="password" 
                            id="confirm-password" 
                            name="confirm-password" 
                            minlength="5" 
                            placeholder="Пароли должны совпадать" 
                            required
                            v-model = "RegForm.passwordRepeat"
                            >
                    </div>
                    <button @click = "signUp" type="submit" class="login-button">Регистрация</button>
                </form>

                <div class="auth-form__sign-up">
                    <span v-if='isSignIn'>У меня нет аккаунта!</span>
                    <span v-if='isSignUp'>У меня уже есть аккаунт!</span>
                
                    <a @click = "showSignUp" v-if='isSignIn'>Зарегистрироваться</a>
                    <a @click = "showSignIn" v-if='isSignUp'>Войти</a>
                </div>
            </div>
    </main>
</template>
<script>
import NavigationMenu from '../NavigationMenu.vue'
import { mapActions} from 'vuex';
export default {
    components: { NavigationMenu },
    name: 'AuthPage',
    data(){
        return {
            AuthForm: {
                login: '',
                password: ''
            },
            RegForm: {
                name: '',
                login: '',
                password: '',
                passwordRepeat: '',
            },

            isSignUp: false,
            isSignIn: true, 

            
        }
    },
    methods: {
        ...mapActions({
            axiosSignIn: 'authModule/axiosSignIn',
            axiosSignUp:'authModule/axiosSignUp'
        }),
        showSignUp() {
            this.isSignUp = true;
            this.isSignIn = false;
        },
        showSignIn() {
            this.isSignUp = false;
            this.isSignIn = true;
        },
        signIn() {
            this.axiosSignIn({ authForm: this.AuthForm });
        },
        signUp() {
            this.axiosSignUp({ regForm: this.RegForm });
        }
    },
    

}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat+Alternates:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Montserrat+Alternates:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

.label-error{
    color: red;
}
main{
    width: 80%;
    height: 100%;
    margin: auto;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
}

button{
    color: white;
    border: none;
    padding: 10px;
    border-radius: 12px;
    cursor: pointer;
    transition: .3s;
}
button:hover{
    transform: scale(1.04);
    opacity: 1;
}
button:active{
    transform: scale(1.01);
    transition: 0.1s;
    opacity: 1;
}

.login-button{
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    background-color: var(--main-active);
}

h1{
    font-weight: 600;
    font-size: 34px;
}

h2{
    font-weight: 500;
    font-size: 18px;
    width: 70%;
}


p, label, span{
    font-size: 14px;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    color: var(--main-text);
}

label{
    margin-bottom: 4px;
}
input{
    padding: 10px;
    border: none;
    background-color: var(--main-border);
    border-radius: 6px;
    color: var(--main-text);
}

input::placeholder{
    font-size: 14px;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    color: rgba(136, 151, 173, 1);
}

a{
    text-decoration: none;
    color: var(--main-active);
    font-size: 14px;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    cursor: pointer;
}

.main-block-label{
    text-align: center;
    font-size: 30px;
}
.login-img{
    width: 99.167%;
}

.main-block__head{
    display: flex;
    flex-direction: column;
    min-width: 600px;
    align-items: center;
    border: 2px solid var(--main-border);
    border-radius: 15px;
    padding-bottom: 20px;
    background-color: var(--main-background);
}

.main-block__auth-form{
    width:70%;
}

.main-block__auth-form{
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    gap: 20px;
}

.auth-form__login, .auth-form__password{
    font-family: 'Roboto', sans-serif;
    display: flex;
    flex-direction: column;
}

.auth-form__forgot-password{
    text-align: right;
}

.auth-form__sign-up{
    display: flex;
    gap: 6px;
    justify-content: center;
    align-items: center;
    width: 60%;
    margin-top: 10px;
}

.auth-error{
    color: red;
    margin: 0 auto;
}
</style>