<template lang="html">
  <div class="events">
    <action-bar/>
    <div class="event-container">
      <div class="poster" v-for="i in ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']">
        <img src="../../../assets/images/poster.jpg" alt="">
        <div class="stamp">
          <span>16</span>
          <span>{{i}}</span>
          <span class="description">tenetur voluptates.</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ActionBar from './ActionBar';
export default {
  components: { ActionBar }
}
</script>

<style lang="scss">
@import '../../app.scss';
div.event-container{
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 10px 30px;
  margin: auto;
  padding: 10px 30px;

  .poster{
    background-color: red;
    min-height: 100px;
    position: relative;

    img{
      width: 100%;
      object-fit: contain;
      display: block;
    }
    .stamp{
      position: absolute;
      bottom: 0;
      background-color: #0008;
      width: 100%;
      display: grid;

      span{
        color: #FFF;
        &:first-child{
          font-size: 2em;
          font-family: Lato Bold;
          grid-column: 1 / 2;
        }
        &:nth-child(2){
          padding: 0 3px;
          font-size: 1.3em;
          grid-column: 1 / 2;
        }
        &:last-child{
          grid-column: 2 / 3;
          grid-row: 1 / 3;
        }
      }
    }
  }
}
</style>
