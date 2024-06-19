import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import type { IBook } from '../types/book'

export const useAuthorizationStore = defineStore('auth', {
  state: () => ({
    isAuth: false,
  }),

  actions: {
    changeAuthStatus() {
      this.isAuth = !this.isAuth
    }
  }
})

export const useEntryStore = defineStore('entry', () => {
  const isEntry = ref(false)
  
  function changeEntryStatus () {
    isEntry.value = !isEntry.value
  }

  return { isEntry, changeEntryStatus }
})

export const useReadenStore = defineStore ('readenStore', () => {
  const readen = ref<IBook[]>([])
  
  function addToReaden (item: IBook) {
    if(readen.value.some(el => el.id === item.id)) {
      return false
    } else {
      readen.value.push(item)
    }
    
    // for(const book of readen.value) {
      
    //   console.log(book.id)
    // }
    
    
  }

  return {readen, addToReaden}
})


export const usePlanReadStore = defineStore('planStore', () => {
  const planRead = ref(new Set) 

  function addToPlan(item: any) {
    planRead.value.add(item.id)
  }

  function removePlan (item: any) {
    planRead.value.delete(item.id)
    
  }

  return {planRead, addToPlan, removePlan}

})

export const useNowReadStore = defineStore('nowReadStore', () => {
  const nowRead = ref(new Set) 

  function addToReadNow(item: any) {
    nowRead.value.add(item.id)
  }

  function removeReadNow (item: any) {
    nowRead.value.delete(item.id)
    
  }

  return {nowRead, addToReadNow, removeReadNow}
})

export const useGetBooksStore = defineStore('book', () => {
    const books = getBooksServer()
    

    async function getBooksServer(): Promise<IBook> {
          try {
              const fetchResponse = await fetch('https://freetestapi.com/api/v1/books')
              const response = await fetchResponse.json() 
             
          
              return response
          } catch(err){
              throw new Error('Books response was not ok ')
          }
      }

      return {books, getBooksServer}
})