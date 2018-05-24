<template>
  <div class="main">
    <!-- Here goes the background choosing menu -->
    <button id="toggle" @click="toggle">Toggle Interface</button>
    <!-- Background image -->
    <img id="background" v-bind:src="background_image">
    <div v-for="asset in active_assets" v-bind:key="asset">
      <img class="asset-image" v-bind:src="require('../assets/' + asset.Image)" />
    </div>
    <!-- Background interface -->
    <div class="interface backgrounds">
      <h2>Background</h2>
      <ul>
         <li v-for="bg in backgrounds" v-bind:key="bg.Name">
           <BackgroundCard :title="bg.Name" v-on:click="changeBackground(bg)"></BackgroundCard>
         </li>
         <li></li>
      </ul>
    </div>
    <div class="interface secondary-backgrounds">
        <h2>Assets</h2>
        <ul>
          <li v-for="asset in active_background.Assets" v-bind:key="asset">
           <BackgroundCard :title="asset.Name" v-on:click="changeAsset(asset)"></BackgroundCard>
         </li>
        </ul>
    </div>
    <div class="interface volume">
      <h2>Volume</h2>
      <VolumeSlider id="volume-slider" @input="changeVolume"></VolumeSlider>
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
      visibility: 'hidden',
      show_interface: true,
      background_audio: null,
      background_volume: 0.5,
      active_background: {},
      backgrounds: [
        {'Name':'City','Image':'city.jpg','Sound':'street.mp3', 'Assets': [{'Name': 'Rain', 'Image': 'rain.gif', 'Sound': 'rain.mp3'}]},
        {'Name':'Field','Image':'field.jpg','Sound':'field.mp3'},
        {'Name':'Beach','Image':'beach.jpg','Sound':'beach.mp3'},
        {'Name':'Birds','Image':'birds.jpg','Sound':'birds.mp3'},
        {'Name':'Forest','Image':'forest.jpg','Sound':'null'}
      ],
      background_image: require('../assets/placeholder.png'),
      active_assets: [],
    };
  },
  computed: {
    computedVisibility: function() {
      return this.visibility;
    }
  },
  methods: {
    changeVolume(volume) {
      this.background_volume = volume / 100.0
      this.background_audio.volume = this.background_volume
    },
    changeAsset(asset) {
      var found = this.active_assets.find(function(elem) {
        return elem.Name == asset.Name
      })

      if (found == undefined)
      {
        this.active_assets.push(asset)
      } else {
        var index = this.active_assets.indexOf(found)
        this.active_assets.splice(index, 1)
      }

      console.log(this.active_assets)

      if(this.background_audio != null){
        this.background_audio.pause()
        this.background_audio = null
      }
      if (asset.Sound != 'null' && asset.Sound != undefined)
      {
        this.background_audio = new Audio(require('../assets/' + asset.Sound))
        this.background_audio.volume = this.background_volume
        this.background_audio.play()
      }   
    },
    changeBackground(bg){
      this.active_assets = []
      this.active_background = bg
      this.background_image = require('../assets/' + bg.Image)
      if(this.background_audio != null){
        this.background_audio.pause()
        this.background_audio = null
      }
      if (bg.Sound != 'null' && bg.Sound != undefined)
      {
        this.background_audio = new Audio(require('../assets/' + bg.Sound))
        this.background_audio.volume = this.background_volume
        this.background_audio.play()
      }      
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

#background, .asset-image {
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

.interface {
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
  margin-bottom: 20px;
}
</style>
