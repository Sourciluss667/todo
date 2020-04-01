<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <formTODO />
    <TODO v-bind:list="todolist" />
  </div>
</template>

<script>
import TODO from './components/TODO.vue'
import formTODO from './components/formTODO.vue'

export default {
  name: 'App',
  components: {
    TODO,
    formTODO
  },
  data () {
    return {
      todolist: []
    }
  },
  methods: {
    getAll () {
      // Recup les todos
      fetch('http://localhost:3000/getAllTodo')
      .then(res => res.json())
      .then(data => {
        // Reussit
        let arr = []
        data.forEach(element => {
          arr.push(element.str)
        });
        this.todolist = arr;
      })
    }
  },
  mounted () {
    this.getAll()
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
