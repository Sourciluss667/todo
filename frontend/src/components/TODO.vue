<template>
  <div class="todo">
    <h3>To-Do List</h3>
    <ul>
      <li v-for="(todo, index) in list" :key="index">- {{ todo }} | <a href="#" v-on:click="deleteTodo(index)">delete</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'TODO',
  props: {
    list: Array
  },
  methods: {
    deleteTodo (index) {
      if (index < this.list.length) {
        this.list.splice(index, 1)
        fetch('http://localhost:3000/deleteTodo/' + index, {
        method: 'DELETE',
        mode: 'cors',
        headers: new Headers()
        })
        .then(res => {
          // Reussit
          console.log('Delete', res)
        })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin-bottom: 20px;
}
a {
  color: #42b983;
}
</style>
