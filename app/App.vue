<template lang="html">
  <div class="main-content" v-on:pick-campus="pickCampus">
    <div class="overlay" v-if="campusPick">
      <div class="dialog">
        <h2>Choose your campus <i class="material-icons info">info</i></h2>
        <div class="content">
          <input type="search" placeholder="Search for your campus .e.g 'Bay campus'">
          <div class="item" @click="selectCampus">
            <h3>KwaDlangezwa Campus</h3>
            <span>University of Zululand</span>
          </div>
        </div>
        <div class="controls">
          <span @click="cancelPicker">CANCEL</span>
        </div>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  created () {
    this.$eventBus.$on('pick-campus', this.pickCampus);
  },
  beforeDestroy () {
    this.$eventBus.$off('pick-campus');
  },
  data () {
    return {
      dialogTitle: 'Hello there',
      dialogMessage: 'This is a demo message',
      campusPick: false
    }
  },
  methods: {
    pickCampus () {
      console.log('event called');
      this.campusPick = true;
    },
    cancelPicker () {
      this.campusPick = false;
    },
    selectCampus () {
      this.campusPick = false;
      this.$eventBus.$emit('campus-picked');
    }
  }
}
</script>

<style lang="scss">
@import './app.scss';

@font-face {
  font-family: Lato;
  src:url(./../assets/fonts/Lato-Regular.ttf);
}
@font-face {
  font-family: Lato Bold;
  src:url(./../assets/fonts/Lato-Bold.ttf);
}
@font-face {
  font-family: Lato Light;
  src:url(./../assets/fonts/Lato-Hairline.ttf);
}
@font-face {
  font-family: 'Material Icons';
  font-style: normal;
  font-weight: 400;
  src: url(../assets/fonts/MaterialIcons-Regular.eot); /* For IE6-8 */
  src: url(../assets/fonts/MaterialIcons-Regular.woff) format('woff'),
    url(../assets/fonts/MaterialIcons-Regular.ttf) format('truetype');
}
.material-icons {
  font-family: 'Material Icons';
  font-weight: normal;
  font-style: normal;
  font-size: 24px;  /* Preferred icon size */
  display: inline-block;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;

  /* Support for all WebKit browsers. */
  -webkit-font-smoothing: antialiased;
  /* Support for Safari and Chrome. */
  text-rendering: optimizeLegibility;

  /* Support for Firefox. */
  -moz-osx-font-smoothing: grayscale;

  /* Support for IE. */
  font-feature-settings: 'liga';
}
/* Rules for sizing the icon. */
.material-icons.md-18 { font-size: 18px; }
.material-icons.md-24 { font-size: 24px; }
.material-icons.md-36 { font-size: 36px; }
.material-icons.md-48 { font-size: 48px; }
.material-icons.md-60 { font-size: 60px; }
*{
  box-sizing: border-box;
}

body{
  margin: 0;
  background-color: $background-color;
  font-family: 'Lato';
}
div.overlay{
  z-index: 999;
  position: fixed;
  height: 100%;
  width: 100vw;
  background-color: #0002;
}
div.dialog{
  z-index: 999;
  position: fixed;
  width: 100%;
  max-width: 600px;
  top: 100px;
  left: 50%;
  transform: translate(-50%);
  background-color: #FFF;
  @media screen and (max-width: 768px){
    width: 90%;
  }
  @media screen and (max-width: 450px){
    bottom: 0;
    top: auto;
    width: 100%;
  }

  h2{
    margin: 0;
    padding: 20px 20px 0 20px;

    i{
      color: $accent-color;
      cursor: pointer;
    }
  }
  .content{
    padding: 10px 20px;
    max-height: 450px;
    overflow-y: auto;

    input{
      padding: 10px;
      font-size: 1em;
      width: 100%;
      border: none;
      background-color: $primary-color + unquote('1f');
    }
    .item{
      margin: 5px 0;
      padding: 10px;
      cursor: pointer;

      h3{
        margin: 0;
        font-family: Lato;
      }
      span{
        opacity: 0.6;
      }
    }
  }
  .controls{
    display: flex;
    justify-content: flex-end;
    padding: 10px 5px;

    span{
      font-family: Lato Bold;
      color: $accent-color;
      padding: 10px 15px;
      margin: 0 5px;
      cursor: pointer;
    }
  }
}
</style>
