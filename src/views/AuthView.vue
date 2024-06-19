

<template>
  <form class="authForm" @submit="authirisation">
    <h2 class="auth-title">Авторизация</h2>
    <label class="form-label">
      <span class="form-title">Введите логин</span>
      <input class="form-input" type="text">
    </label>
    <label class="form-label">
      <span class="form-title">Введите пароль</span>
      <input class="form-input" type="text">
    </label>
    <button class="btn" type="submit" @click.prevent="authirisation">Войти</button>
  </form>
</template>

<script setup >

import {ref} from 'vue'
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { useAuthorizationStore } from '@/stores/stores';

const authorize = useAuthorizationStore()
const router = useRouter()

// const isAusorised = ref(false)

const authirisation = () => {
  router.replace('/bookshelf')
  // isAusorised.value = true
  authorize.isAuth = !authorize.isAuth
}

</script>

<style scoped>
  .auth-title {
    align-self: center;
  }
  .auth-title {
    font-weight: 700;
    color: #032b03;
  }
  .authForm {
    width: 350px;
    max-height: 100%;
    border: 1px solid green;
    padding: 10px 25px;
    justify-content: space-between;
    gap: 20px;
    display: flex;
    flex-direction: column;
    margin: 400px auto;
    background-color: rgb(141, 221, 141);
    transform: translate(0, -50%);
  }
  .form-label {
    display: flex;
    justify-content: space-between;
  }
  .form-button {
    padding: 10px 20px;
    align-self: center;
    background-color: transparent;
    color: #032b03;
    border: 2px solid currentColor;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.3s background-color;
  }
  .form-button:hover {
    background-color: #6ead68;
  }
  .form-button:active {
    background-color: #285c23;
  }
  .form-input {
    background-color: transparent;
    border: 2px solid #032b03;
  }
  .form-input:focus {
    background-color: #b6e9b2;
  }
</style>
@/stores/stores