<template lang="html">
  <div class="store-item">
    <div class="navbar">
      <span><i class="material-icons">arrow_back</i></span>
    </div>
    <div class="main">
      <img src="../../../assets/images/albumart.jpg">
      <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas quis iste doloribus autem quibusdam cupiditate repellendus fuga perferendis iusto molestiae?</span>
      <div class="control">
        <h3>R123 456</h3>
        <div>
          <i class="material-icons">chat</i>
          <span>CHAT</span>
        </div>
        <div>
          <i class="material-icons">call</i>
          <span>060 433 5310</span>
        </div>
      </div>
      <div class="info"></div>
      <p class="description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt, veniam, minus? Magni et rem ducimus similique quaerat incidunt, non quae labore quasi iure error quia maxime earum iste tempora, atque exercitationem voluptate cum. Maiores adipisci nesciunt ullam delectus architecto corporis excepturi, odio eaque, sint, deserunt quia. Ipsum dignissimos harum accusantium!</p>
    </div>
    <div class="suggest"></div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
@import '../../app.scss';
div.store-item{
  display: grid;
  grid-template-columns: 3fr 2fr;
  @media screen and (max-width: 768px){
    grid-template-columns: 1fr;
  }

  .navbar{
    height: $bar-height;
    display: grid;
    grid-template-columns: $bar-height 1fr;
    grid-column: 1 / 3;

    span{
      text-align: center;
      padding-top: 12px;
      cursor: pointer;
      color: $primary-color-dark;
    }
  }
  .main{
    background-color: #FFF;
    display: grid;
    grid-template-columns: 4fr repeat(3, 3fr);
    grid-gap: 5px;
    padding: 5px;

    img{
      width: 100%;
      display: block;
    }
    > span{
      grid-column: 2 / 5;
      display: block;
      height: 80px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .control{
      grid-column: 1 / 5;
      display: flex;

      h3{
        margin: 0;
        flex-grow: 1;
        padding: 10px 0;
      }
      > div{
        background-color: $accent-color;
        color: $primary-color-text;
        display: block;
        margin: 0 5px;
        padding: 10px 15px 0 15px;
        cursor: pointer;
        display: flex;

        span{
          padding-left: 5px;
          @media screen and (max-width: 768px){
            display: none;
          }
        }
      }
    }
    .description{
      background-color: red;
      grid-column: 1 / 5;
      margin: 0;
      //TODO add whitespace thingy
    }
  }
  .suggest{}
}
</style>
