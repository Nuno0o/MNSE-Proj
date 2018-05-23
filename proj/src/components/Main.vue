<template>
  <div class="main">
    <!-- Here goes the background choosing menu -->
    <button id="toggle" @click="toggle">Toggle Interface</button>
    <!-- Background image -->
    <img id="background" v-bind:src="background_image">
    <!-- Background interface -->
    <div class="interface backgrounds">
      <h2>Background</h2>
      <ul>
         <li v-for="bg in backgrounds" v-bind:key="bg.Name">
           <BackgroundCard :title="bg.Name" v-on:click="changeBackground(bg)"></BackgroundCard>
         </li>
         <li></li>
      </ul>
      <h2>Volume</h2>
      <VolumeSlider id="volume-slider"></VolumeSlider>
    </div>
    <div>

    </div>
  </div>
</template>

<script>
import BackgroundCard from './BackgroundCard.vue';
import VolumeSlider from './VolumeSlider.vue';
export default {
  name: "Main",
  components: {
    BackgroundCard,
    VolumeSlider
  },
  data() {
    return {
      show_interface: true,
      background_audio: null,
      background_volume: 0.4,
      backgrounds: [
        {'Name':'City','Image':'city.jpg','Sound':'city.mp3'},
        {'Name':'Field','Image':'field.jpg','Sound':'field.mp3'}
      ],
      background_image: require('../assets/placeholder.png'),
    };
  },
  methods: {
    changeBackground(bg){
      this.background_image = require('../assets/' + bg.Image)
      if(this.background_audio != null){
        this.background_audio.pause()
        this.background_audio = null
      }
      this.background_audio = new Audio(require('../assets/' + bg.Sound))
      this.background_audio.volume = this.background_volume
      this.background_audio.play()
    },
    toggle () {
      if (this.show_interface) {
        $('.interface').css('visibility','hidden')
      }else{
        $('.interface').css('visibility','visible')
      }
      this.show_interface = !this.show_interface;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
body{
  background-color:rgb(236, 236, 236);
  margin: 0px;
}
</style>
<style scoped>
.main {
  text-align: center;
  height:100vh;
  width:100%;
  background-repeat: no-repeat;
}

#toggle {
  text-align:right;
  float:left;
  margin-left:10px;
  background-color:rgb(255, 255, 255);
  padding:10px;
  border:solid;
  border-color: green;
  border-width: 2px;
  border-radius: 30px;
}

#toggle:hover {
  background-color:rgb(201, 201, 201);
}

#background {
  left:0;
  top:0;
  right:0;
  left:0;
  width:100%;
  min-width:1000px;
  min-height:700px;
  height:100%;
  position: absolute;
  z-index: -1;
}

.backgrounds {
  background-color: rgb(156, 156, 156);
  margin-left: auto;
  margin-right: 10px;
  margin-top: 10px;
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

#volume-slider {
  position: relative;
  left: 100px;
}
</style>
