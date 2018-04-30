<template>
   <button class="card" @click="click()">
       {{title}}
   </button>
</template>

<script>
export default {
  name: "BackgroundCard",
  props: ['title'],
  data() {
    return {
      msg: ""
    };
  },
  methods: {
      click (){
          this.$emit('click')
      }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card {
  text-align: center;
  margin: auto;
  background-color:rgb(255, 255, 255);
  width: 20%;
  height: 60px;
  padding:10px;
  border:solid;
  border-color: green;
  border-width: 2px;
  border-radius: 30px;
  font-size:25px;
}
.card:hover {
    background-color:rgb(201, 201, 201);
}
</style>