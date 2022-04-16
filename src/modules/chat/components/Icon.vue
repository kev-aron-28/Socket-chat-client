<template>
  <div class="icon__name" :style="{ 'background': generateColor() }">
    {{ letter[0] }}

    <div class="icon__active" v-if="active != 'not-show'" :style="{ 'background': active == 'connected' ? '#43aa8b' : '#f94144'}"></div>
  </div>
</template>

<script>
export default {
  props: {
    letter: {
      type: String,
    },
    active: {
      type: String
    }
  },

  setup(props) {
    const generateColor = () => {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
      return color;
    }
    
    return {
        generateColor
    }
 
 }

}
</script>

<style lang="scss">
@import "../styles/chat.scss";
</style>