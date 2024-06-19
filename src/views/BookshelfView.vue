<template>
  <div class="bookshels-cont">
    <div class="quanity-figures" v-if="authorize.isAuth">
      <p class="quanity-readen">Прочитано {{ readenSt.readen.length}}</p>
      <p class="quanity-readen">Планируется прочесть {{ planReadSt.planRead.size}}</p>
      <p class="quanity-readen">Читаю {{ nowRead.nowRead.size}}</p>
    </div>
    <button class="btn btn-exit" @click.prevent="authLeave">Выйти</button>
    <input type="text" class="search-book" v-model="filtredName" placeholder="Найти книгу">
    <h1>Bookshelf list</h1>
    <div class="lists">
      <ul class="books-list">
        <li>
          <h2 class="list-title">Список книг</h2>
        </li>
        <li class="book" v-for="(book) in sortedList" :key="book.id">
          <img :src="book.cover_image" class="book-image">
          <h3 class="book-title">{{ book.title }}</h3>
          
          <p class="book-author">{{ book.author }}</p>
          <span class="publicat-year"> {{ book.publication_year }} </span>
          <div class="btn-group">
            <div class="btn-plan-group"
                 :class="{noauth: !authorize.isAuth}"
            >
              <button
                class="plan-read"
                v-if="!planReadSt.planRead.has(book.id)"
                @click="planReadSt.addToPlan(book)"
              >
                Запланировать
              </button>
              <button
                class="plan-read"
                v-else
                @click="planReadSt.removePlan(book)"
              >
                Распланировать
              </button>
            </div>
            <div class="btn-now-group"
                 :class="{noauth: !authorize.isAuth}"
            >
              <button
                class="now-read"
                v-if="!nowRead.nowRead.has(book.id)"
                @click="nowRead.addToReadNow(book)"
              >
                Отметить читаю
              </button>
              <button
                class="now-read"
                v-else
                @click="nowRead.removeReadNow(book)"
              >
                Удалить читаю
              </button>
            </div>
            <button class="to-readen" :class="{noauth: !authorize.isAuth}"  @click="readenSt.addToReaden(book)" >
              В прочитанные
            </button>
          </div>
          
          <span class="plan-label" v-if="nowRead.nowRead.has(book.id)"
            >Читаю</span
            >
          <span class="plan-label" v-if="planReadSt.planRead.has(book.id)"
            >Запланировано</span
          >
        </li>
      </ul>
      <ul class="readen-books" v-if="authorize.isAuth">
        <li>
          <h2 class="list-title">Список прочитанных</h2>
        </li>
        <li class="readen-book" v-if="readenSt.readen.length === 0">
          Список пуст
        </li>
        <li
          class="readen-book"
          v-for="(book, index) in readenSt.readen"
          :key="book.id"
        >
          <h3 class="readen">{{ book.title }}</h3>
          <button
            class="remove-readen"
            @click="
              () => {
                readenSt.readen.splice(index, 1);
              }
            "
          >
            Удалить из прочитанных
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import {
  useAuthorizationStore,
  useReadenStore,
  usePlanReadStore,
  useEntryStore,
  useNowReadStore,
  useGetBooksStore
} from "@/stores/stores";
import { useRouter } from "vue-router";
import { getBooksServer } from "../types/book";
import type { IBook } from "../types/book";
// import {books} from '../types/book'

const readenSt = useReadenStore();
const planReadSt = usePlanReadStore();
const entrySt = useEntryStore();
const authorize = useAuthorizationStore();
const nowRead = useNowReadStore()
const booksStore = useGetBooksStore()

const booksList = ref<IBook[]>([]);


const filtredName = ref<string>('')

const sortedList = computed(() => {
  return booksList.value.filter(book => {
    if(!book.title.includes(filtredName.value)) {
      console.log(sortedList)
      return false
    } else { return true }
  })
})

const loadBooks = async() => {
  const response = await booksStore.getBooksServer()
  console.log(response)
  booksList.value = response 
}

loadBooks()

const router = useRouter();

const authLeave = () => {
  authorize.isAuth = false;
  entrySt.isEntry = !entrySt.isEntry 
  if (!authorize.isAuth) {
    router.replace("/");
  } 
};

watch([planReadSt.planRead, readenSt.readen], ()=> {
    // console.log(planReadSt.planRead.size)
    // console.log(readenSt.readen.length)
  })

</script>

<style>
.btn-exit {
  position: fixed;
  top: 20px;
  right: 20px;
}

.lists {
  display: flex;
  justify-content: space-between;
}
.noauth {
  display: none;
}
.book-image {
  width: 100px;
  height: 100px;
}
.books-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  row-gap: 15px;
  padding: 50px;
  background-color: rgb(131, 189, 131);
}
.list-title {
  margin-bottom: 30px;
}
.book {
  padding: 30px;
  position: relative;
  border: 2px solid green;
}
.btn-group {
  position: absolute;
  top: 5px;
  right: 5px;
  display: flex;
  flex-direction: column;
  align-items: start;
}
.plan-label {
  display: inline;
  margin-left: 40px;
  padding: 5px;
  border: 2px solid currentColor;
  color: green;
}
.btn-group button {
  background-color: greenyellow;
  padding: 3px 8px;
  margin-bottom: 7px;
  border: none;
  font-weight: 700;
  color: green;
  cursor: pointer;
}
.quanity-readen {
  color: green;
  font-weight: 700;
}
.readen-books {
  padding: 50px;
  display: flex;
  flex-direction: column;
  row-gap: 3px;
  list-style-type: none;
  background-color: rgb(204, 206, 114);
} 
.readen-book {
  display: flex;
  column-gap: 20px;
  justify-content: space-between;
}
.remove-readen {
  background-color: transparent;
  cursor: pointer;
}
.quanity-figures {
  position: fixed;
  left: 50%;
  top: 400px;
}
</style>
