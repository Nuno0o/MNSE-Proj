<template>
  <div class="main">
    <!-- Here goes the background choosing menu -->
    <button id="toggle" @click="toggle">Toggle Interface</button>
    <!-- Background image -->
    <img v-if="background_image != null" id="background" v-bind:src="background_image">
    <div v-for="asset in active_assets" v-bind:key="asset.Name">
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
          <li v-for="asset in active_background.Assets" v-bind:key="asset.Name">
           <BackgroundCard :title="asset.Name" v-on:click="clickAsset(asset)"></BackgroundCard>
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
      backgrounds: [
        {'Name':'City','Image':'city.jpg','Sound':'city.mp3', 'Assets': [
          {'Name': 'Rain', 'Image': 'rain.gif', 'Sound': 'rain.mp3'},
          {'Name': 'Birds', 'Sound': 'birds.mp3'}]},
        {'Name':'Field','Image':'field.jpg','Sound':'field.mp3'},
        {'Name':'Beach','Image':'beach.jpg','Sound':'beach.mp3'},
        {'Name':'Forest','Image':'forest.jpg', 'Sound': null, 'Assets': [
          {'Name': 'Birds', 'Image': null, 'Sound': 'birds.mp3'},
        ]}
      ],
      show_interface: true,
      volume: 0.5,
      active_background: {},
      background_image: require('../assets/placeholder.png'),
      active_assets: [],
      active_audio: []
    };
  },
  computed: {
    computedVisibility: function() {
      return this.visibility;
    }
  },
  methods: {
    changeVolume(volume) {
      this.volume = volume / 100.0
      this.active_audio.forEach(function(elem) {
        elem.Audio.volume = this.volume
      }.bind(this))
    },
    playAudio(filename) {

        // invalid filename
        if (filename == undefined || filename == null || filename == 'null') {
          return;
        }

        // check if audio is already active
        var found = this.active_audio.find(function(elem) {
          return elem.Name == filename
        })

        // audio is NOT active
        if (found == undefined) {

          // create plauer
          var audio = new Audio(require('../assets/' + filename)) 

          // loop audio
          audio.addEventListener('ended', function() {
              this.currentTime = 0;
              this.play();
          }, false);

          // set volume to actual value
          audio.volume = this.volume

          // add audio to active list and playt it
          this.active_audio.push({'Name': filename, 'Audio': audio});
          audio.play();
        }

        // audio IS already active
        else {

          // get audio index
          var index = this.active_audio.indexOf(found)

          // pause audio and remove it from the active list
          if (index >= 0) {
            this.active_audio[index].Audio.pause()
            this.active_audio.splice(index, 1)
          }          
        }
    },
    clickAsset(asset) {

      // check if asset is already active
      var found = this.active_assets.find(function(elem) {
        return elem.Name == asset.Name
      })

      // asset is NOT active
      if (found == undefined && asset.Image != undefined && asset.Image != null && asset.Image != 'null')
      {
        // add asset to active list
        this.active_assets.push(asset)
      }
      
      // asset IS already active
      else {
        // remove asset from active list
        var index = this.active_assets.indexOf(found)
        if (index >= 0) {
          this.active_assets.splice(index, 1)
        }
      }

      // play asset's audio
      this.playAudio(asset.Sound)
    },
    changeBackground(bg){

      // reset active assets
      this.active_assets = []

      // pause and reset active audios
      this.active_audio.forEach(function(elem) {
        elem.Audio.pause()
      })
      this.active_audio = []
      
      // play audio from this background
      this.playAudio(bg.Sound)

      // set background as active
      this.active_background = bg
      this.background_image = require('../assets/' + bg.Image)     
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
