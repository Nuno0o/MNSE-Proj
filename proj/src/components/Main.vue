<template>
  <div class="main">
    <!-- Here goes the background choosing menu -->
    <div class="backgrounds">
      <h2>Choose the Background</h2>
      <ul>
         <li v-for="bg in backgrounds" v-bind:key="bg.Name">
           <BackgroundCard :title="bg.Name" v-on:click="changeBg(bg)"></BackgroundCard>
         </li>
      </ul>
    </div>
    <div>

    </div>
  </div>
</template>

<script>
import BackgroundCard from './BackgroundCard.vue';
export default {
  name: "Main",
  components: {
    BackgroundCard
  },
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      backgrounds: [
        {'Name':'City','Path':'../assets/field.jpg'},
        {'Name':'Fields','Path':'../assets/city.jpg'}
      ]
    };
  },
  methods: {
    changeBg(bg){
      console.log(bg.Name)
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
body{
  background-color:rgb(236, 236, 236);
}
</style>
<style scoped>
.main {
  text-align: center;
}

.backgrounds {
  background-color: rgb(156, 156, 156);
  margin-left: auto;
  margin-right: 50px;
  margin-top: 0px;
  min-width: 500px;
  max-width: 30%;
  border: solid;
  border-width: 2px;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline;
  margin: auto;
  margin-left: 10px;
  margin-right: 10px;
}
</style>
