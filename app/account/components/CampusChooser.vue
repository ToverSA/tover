<template lang="html">
  <div class="campus-chooser">
    <div class="status-bar">
      <router-link :to="{ name: 'Home' }" :replace="true"><i class="material-icons md-20">chevron_left</i></router-link>
      <h3>Choose your campus</h3>
      <i class="material-icons md-20">info</i>
    </div>
    <div class="institution-list">
      <div class="institution" v-for="i in [1]">
        <img src="../../../assets/images/albumart.jpg" alt="">
        <div>
          <h2>University of Zululand</h2>
          <h3 @click="finishDialog = true">KwaDlangezwa Campus</h3>
          <h3 @click="finishDialog = true">Richard's Bay Campus</h3>
        </div>
      </div>
    </div>
    <dialog-container v-if="finishDialog">
      <h3 class="subtitle">You have chosen Richard's Bay Campus from University of Zululand as your campus.</h3>
      <dialog-buttons
        v-bind:negative="closeDialog"
        v-bind:positive="saveCampus"
        v-bind:text="'FINISH'"
        />
    </dialog-container>
  </div>
</template>

<script>
import store from "../../../store";
import dialog from "../../util/dialog";
export default {
  data() {
    return {
      finishDialog: false
    };
  },
  methods: {
    closeDialog() {
      this.finishDialog = false;
    },
    saveCampus() {
      store.commit("campusId", 3);
      if (this.$route.params.id === "guest") {
        if (this.$route.query.hasOwnProperty("redirect")) {
          this.$router.push({
            path: this.$route.query.redirect
          });
        }
      }
    }
  },
  components: {
    dialogContainer: dialog.Container,
    dialogButtons: dialog.Buttons
  }
};
</script>

<style lang="scss" scoped>
@import "../../app.scss";
.subtitle {
  color: $primary-color-dark;
}
div.campus-chooser {
  background-color: $primary-color;
  height: 100vh;
  width: 100vw;
  overflow: auto;
  color: $primary-color-text;

  .status-bar {
    display: grid;
    grid-template-columns: $bar-height 1fr $bar-height;
    align-items: flex-start;
    a {
      text-decoration: none;
    }
    i {
      height: $bar-height;
      padding: 15px;
      color: #fff;
    }
    h3 {
      text-align: center;
      margin: 0;
      padding: 15px;
      font-family: Lato Light;
    }
  }
  .institution-list {
    margin: auto;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 5px;
    @media screen and (max-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media screen and (max-width: 450px) {
      grid-template-columns: repeat(1, 1fr);
    }

    .institution {
      display: inherit;
      grid-template-columns: 90px 1fr;
      grid-gap: 5px;
      align-items: flex-start;
      @media screen and (max-width: 450px) {
        grid-template-columns: 50px 1fr;
      }
      img {
        width: 100%;
        border-radius: 15px;
        display: block;
        padding: 5px;
      }
      > div {
        padding: 5px 0;

        h2 {
          margin: 0;
        }
        h3 {
          margin: 0;
          font-family: Lato Light;
          padding: 10px 0 10px 20px;
          cursor: pointer;
          &:hover {
            background-color: rgba($primary-color-dark, 0.5);
          }
          @media screen and (max-width: 450px) {
            padding: 5px 0 5px 10px;
          }
        }
      }
    }
  }
}
</style>
