<template>
  <div class="form-todo">
    <h3>Add a To-Do</h3>
    <br>
    <input type="text" name="todo" id="todo-input" v-model="todoToAdd">
    <br><br>
    <button v-on:click="addToTodo()">Submit</button>
  </div>
</template>

<script>
export default {
  name: 'formTODO',
  data () {
    return {
      todoToAdd: ''
    }
  },
  methods: {
    addToTodo () {
      if (this.todoToAdd != '') {
        this.$parent.todolist.push(this.todoToAdd)
        const str = this.todoToAdd;
        this.todoToAdd = ''
        fetch('http://localhost:3000/addTodo', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({str})
        })
        .then(res => {
          // Reussit
          console.log('Add', res)
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
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
