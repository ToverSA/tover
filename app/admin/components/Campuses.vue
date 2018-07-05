<template lang="html">
  <div class="campuses">
    <div class="insti-list">
      <div class="institution">
        <p>Institution</p>
        <p>
          <i class="material-icons md-20">bookmark_border</i>
          <span>Adverts</span>
        </p>
      </div>
      <div class="institution" v-for="i in [1, 2, 3, 4, 5]">
        <p>University of Zululand</p>
        <p>{{i}}</p>
      </div>
      <div class="institution form">
        <input type="text" placeholder="Institution name">
        <p>
          <i class="material-icons md-20">add</i>
          <span>Add</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import dialog from "../../util/dialog";
export default {
  methods: {
    evaluateText() {}
  }
};
</script>

<style lang="scss" scoped>
@import "../../app.scss";
div.campuses {
  .insti-list {
    padding: 20px;
    @media screen and (max-width: 768px) {
      padding: 5px;
    }

    .institution {
      display: grid;
      grid-template-columns: 3fr 1fr;
      grid-gap: 2px;
      cursor: pointer;
      @media screen and (max-width: 768px) {
        grid-template-columns: 1fr 70px;
        grid-gap: 0;
      }
      &:hover {
        p {
          background-color: rgba(#fff, 0.5);
        }
      }
      &:first-child {
        margin-bottom: 2px;
      }

      p,
      input {
        background-color: #fff;
        margin: 0;
        padding: 15px 10px;
        display: flex;
        border: 0;
        outline: none;
        font-size: 1em;
        width: 100%;

        i,
        span {
          padding: 0;
          margin: 0;
          &:last-child {
            padding-left: 5px;
            @media screen and (max-width: 768px) {
              display: none;
            }
          }
        }
      }
      &.form {
        margin-top: 5px;

        p,
        input {
          background-color: #fff0;
          &:first-child {
            border-bottom: 4px solid rgba($primary-color-dark, 0.2);
          }
          &:last-child {
            color: $accent-color;
            // background-color: rgba($accent-color, 0.1);
          }
        }
      }
    }
  }
}
</style>
