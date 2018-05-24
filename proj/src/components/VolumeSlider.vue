<template>
   <input class="volume" type="range" min="0" max="100" value="50" @input="onChange"/>
</template>

<script>
export default {
  name: "VolumeSlider",
  methods: {
    onChange({target}) {
      this.$emit('input', target.value)
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

/* --- HIDE DEFAULT APPEARANCE --- */

.volume {
  -webkit-appearance: none; /* Hides the slider so that custom slider can be made */
  width: 200px; /* Specific width is required for Firefox. */
  background: transparent; /* Otherwise white in Chrome */
}

.volume:focus {
  outline: none; /* Removes the blue border. */
}


/* --- CHROME --- */

.volume::-webkit-slider-thumb {
  -webkit-appearance: none;
  border: 2px solid white;
  height: 25px;
  width: 25px;
  border-radius: 50%;
  background: black;
  cursor: pointer;
  margin-top: -9px; /* You need to specify a margin in Chrome, but in Firefox and IE it is automatic */
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d; /* Add cool effects to your sliders! */
}

.volume::-webkit-slider-runnable-track {
  width: 100%;
  height: 8.4px;
  cursor: pointer;
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  background: rgb(13,0,82);
  background: -webkit-linear-gradient(90deg, rgba(13,0,82,1) 0%, rgba(18,244,241,1) 100%);
  background: linear-gradient(90deg, rgba(13,0,82,1) 0%, rgba(18,244,241,1) 100%);
  border-radius: 1.3px;
  border: 0.2px solid #010101;
}


/* --- FIREFOX --- */

.volume::-moz-range-thumb {
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  border: 2px solid white;
  height: 25px;
  width: 25px;
  border-radius: 50%;
  background: black;
  cursor: pointer;
}

.volume::-moz-range-track {
  width: 100%;
  height: 8.4px;
  cursor: pointer;
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  background: rgb(13,0,82);
  background: -moz-linear-gradient(90deg, rgba(13,0,82,1) 0%, rgba(18,244,241,1) 100%);
  background: linear-gradient(90deg, rgba(13,0,82,1) 0%, rgba(18,244,241,1) 100%);
  border-radius: 1.3px;
  border: 0.2px solid #010101;
}


/* --- IE --- */

.volume::-ms-thumb {
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  border: 2px solid white;
  height: 25px;
  width: 25px;
  border-radius: 50%;
  background: black;
  cursor: pointer;
}

.volume::-ms-track {
  width: 100%;
  height: 8.4px;
  cursor: pointer;
  background: transparent;
  border-color: transparent;
  border-width: 16px 0;
  color: transparent;
}

.volume::-ms-fill-lower {
  background: #2a6495;
  border: 0.2px solid #010101;
  border-radius: 2.6px;
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
}

.volume::-ms-fill-upper {
  background: #3071a9;
  border: 0.2px solid #010101;
  border-radius: 2.6px;
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
}
</style>