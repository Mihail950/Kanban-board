import {createStore} from "vuex";
import authModule from "./modules/authModule.js";
import boardsModule from "./modules/boardsModule.js";
import dialogModule from "./modules/dialogModule.js";
import columnModule from "./modules/columnModule.js";
import usersModule from "./modules/usersModule.js";
const store = createStore({
  modules: {
    authModule,
    boardsModule,
    dialogModule,
    columnModule,
    usersModule
  },
});

export default store;
