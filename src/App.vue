<template>
  <RouterView v-if="!isLoad"/>
  <h1 v-if="isLoad">sdasda</h1>
</template>

<script>
import {mapActions} from 'vuex';

export default {
  methods: {
    ...mapActions({
      addUserInfo: 'authModule/addUserInfo',
      GetBoards: 'boardsModule/axiosGetBoards',
    }),
  },
  data () {
        return {
          isLoad: true
        }
    },
  async created() {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    if (token) {
      this.isLoad = true;
        this.addUserInfo({ userId: userId, token: token });
        await this.GetBoards();
    }
    this.isLoad = false;
  }
}

</script>

<style>

</style>
