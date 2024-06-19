

<template>
  <div class="container">
    <div class="main-btns" v-if="!entrySt.isEntry">
      <button class="btn" @click.prevent="entryAuth">Авторизация</button>
      <button class="btn" @click.prevent="entryGuest">Войти гостем</button>
    </div>
    <RouterView v-else/>
  </div>
  
</template>

<script setup lang="ts">
import {ref} from 'vue'
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { useEntryStore } from './stores/stores'

const router = useRouter()
const entrySt = useEntryStore();

const entryGuest = () => {
  entrySt.isEntry = !entrySt.isEntry
  router.replace('/bookshelf')
}
const entryAuth = () => {
  entrySt.isEntry = !entrySt.isEntry
  router.replace('/auth')
}


</script>

<style scoped>
  @import './assets/main.css';
  .main-btns {
    display: flex;
    column-gap: 10px;
    justify-content: center;
    margin-top: 400px;
  }


  
</style>
