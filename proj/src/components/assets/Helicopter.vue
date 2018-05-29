<template>
   <img id="helicopter" class="asset-image" v-bind:src="require('../../assets/' + image)" />
</template>

<script>
export default {
  name: "Helicopter",
  created () {
    this.$nextTick(function () {
        this.dragElement(document.getElementById("helicopter"))
    })  
  },
  data() {
    return {
      image: "helicopter.gif"
    };
  },
  methods: {
      dragElement(elmnt) {
        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        if (document.getElementById(elmnt.id)) {
          /* if present, the header is where you move the DIV from:*/
          document.getElementById(elmnt.id).onmousedown = dragMouseDown;
        } else {
          /* otherwise, move the DIV from anywhere inside the DIV:*/
          elmnt.onmousedown = dragMouseDown;
        }

        function dragMouseDown(e) {
          e = e || window.event;
          // get the mouse cursor position at startup:
          pos3 = e.clientX;
          pos4 = e.clientY;
          document.onmouseup = closeDragElement;
          // call a function whenever the cursor moves:
          document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
          e = e || window.event;
          // calculate the new cursor position:
          pos1 = pos3 - e.clientX;
          pos2 = pos4 - e.clientY;
          pos3 = e.clientX;
          pos4 = e.clientY;
          // set the element's new position:
          elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
          elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        }

        function closeDragElement() {
          /* stop moving when mouse button is released:*/
          document.onmouseup = null;
          document.onmousemove = null;
        }
    }
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
  min-width:500px;
  min-height:250px;
  position: absolute;
  z-index: 100;
}
</style>