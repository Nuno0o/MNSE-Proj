<template>
  <div class="main">
    <!-- Here goes the background choosing menu -->
    <button id="toggle" @click="toggle">Toggle Interface</button>
    <!-- Background image -->
    <img v-if="background_image != null" id="background" v-bind:src="background_image"/>

    <Rain v-if="active_assets['rain'] !== undefined && active_assets['rain'] === true"></Rain>

    <Birds v-if="active_assets['birds'] !== undefined && active_assets['birds'] === true"></Birds>

    <Boat v-if="active_assets['boat'] !== undefined && active_assets['boat'] === true"></Boat>

    <Helicopter v-if="active_assets['helicopter'] !== undefined && active_assets['helicopter'] === true"></Helicopter>

    <!-- Background interface -->
    <div v-if="show_video" class="interface video">
      <h2>How to use:</h2>
      <video-player  class="video-player-box"
                 ref="videoPlayer"
                 :options="playerOptions"
                 :playsinline="true"
                 customEventName="customstatechangedeventname">
      </video-player>
      <BackgroundCard style="margin-bottom:15px" :title="'Close'" v-on:click="closeVideo"></BackgroundCard>
    </div>
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
      <div v-for="audio in active_audio">
        <h3>{{audio.Name}}</h3>
        <VolumeSlider class="volume-slider" @input="changeVolume(audio.Name, $event)"></VolumeSlider>
        <br>
      </div>
    </div>
  </div>
</template>

<script>
import BackgroundCard from './BackgroundCard.vue';
import VolumeSlider from './VolumeSlider.vue';
import Rain from './assets/Rain.vue';
import Birds from './assets/Birds.vue';
import Boat from './assets/Boat.vue';
import Helicopter from './assets/Helicopter.vue';
export default {
  name: "Main",
  components: {
    BackgroundCard,
    VolumeSlider,
    Rain,
    Birds,
    Boat,
    Helicopter
  },
  data() {
    return {
      backgrounds: [
        {'Name':'City','Image':'city.gif','Sound':null, 'Assets': [
          {'Name': 'Rain', 'Image': 'rain', 'Sound': 'rain.mp3'},
          {'Name': 'Birds', 'Image': 'birds', 'Sound': 'birds.mp3'},
          {'Name': 'Traffic', 'Sound': 'city.mp3'},
          {'Name': 'Siren', 'Sound': 'ambulance.mp3'},
          {'Name': 'Heli','Image':'helicopter' ,'Sound': 'helicopter.mp3'}]},
        {'Name':'Field','Image':'field.gif','Sound':null, 'Assets': [
          {'Name': 'Breeze', 'Sound': 'breeze.mp3'},
          {'Name': 'Birds', 'Image': 'birds','Sound': 'birds.mp3'},
          {'Name': 'River', 'Sound': 'river.mp3'}
        ]},
        {'Name':'Beach','Image':'beach.jpg','Sound':null, 'Assets': [
          {'Name': 'Seaguls', 'Sound': 'beach.mp3'},
          {'Name': 'Ship', 'Image':'boat' ,'Sound': 'ship.mp3'}
        ]}
      ],
      playerOptions: {
          // videojs options
          muted: true,
          language: 'en',
          playbackRates: [0.7, 1.0, 1.5, 2.0],
          width: 450,
          sources: [{
            type: "video/mp4",
            src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
          }],
          poster: "/static/images/author.jpg",
      },
      show_interface: true,
      show_video: true,
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
    closeVideo() {
      this.show_video = false
    },
    changeVolume(name, volume) {
      this.volume = volume / 100.0
      this.active_audio.forEach(function(elem) {
        if(elem.Name === name)
            elem.Audio.volume = this.volume
      }.bind(this))
    },
    clickAsset(asset) {
      // check if image/animation is active or not, and enable/disable it
      if(asset.Image != undefined){
        if(this.active_assets[asset.Image] == undefined){
          this.active_assets[asset.Image] = true
        } else {
          this.active_assets[asset.Image] = !this.active_assets[asset.Image]
        }
      }
      
      // play asset's audio
      this.playAudio(asset.Name, asset.Sound)

    },
    playAudio(name, filename) {
        // invalid filename
        if (filename == undefined || filename == null || filename == 'null') {
          return;
        }

        // check if audio is already active
        var found = this.active_audio.find(function(elem) {
          return elem.Name == name
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
          this.active_audio.push({'Name': name, 'Audio': audio});
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
  z-index: -3;
}

.video-player-box{
  text-align:center;
  margin:auto;
  margin-left:30px;
  margin-bottom:30px;
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

</style>
