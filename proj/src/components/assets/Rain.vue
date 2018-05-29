<template>
   <img class="asset-image" v-bind:src="require('../../assets/' + image)" />
</template>

<script>
export default {
  name: "Rain",
  data() {
    return {
      image: "rain.gif"
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.asset-image {
  left:0;
  top:0;
  right:0;
  left:0;
  width:100%;
  min-width:1000px;
  min-height:700px;
  height:100%;
  position: absolute;
  z-index: -2;
}
</style>