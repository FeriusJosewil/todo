<template>
  <div> 
  <h1>Selamat Datang</h1>
  <div>Berikut daftar keja kita:</div>
  <ul>
    <li v-for="(item, index) in todos" :key="item.id">{{ item.title }} <button @click="deleteTodo(item.id, index)">X</button></li>
  </ul>
  <input v-model="title">
  <input v-model="time">
<button @click="addTodo">Click Me!</button>
  </div>

</template>

<script>
import axios from 'axios'
export default {
  data: () => {
    return {
      todos: []
    }
  },
mounted() {
  axios.get('http://localhost:3000/todo')
  .then(result => {
    this.todos = result.data
  })
},
  methods:{
    addTodo: function(){
      let newItem = { 
        title: this.title,
        time: this.time,
        status: 1
       }
       axios.post('http://localhost:3000/todo', newItem)
      this.todos.push(newItem)
    },
    deleteTodo: function (id, index) {
      axios.delete(`http://localhost:3000/todo/${id}`)
      this.todos.splice(index, 1)
    }
  }
}

</script>