<template>
  <div class="profile">
    <app-header/>
    <div class="section">
      <h3>Personal details</h3>
      <div class="sub avatar">
        <label for="avatar">Avatar</label>
        <img src="@/assets/clear.gif" alt="avatar">
        <button class="theme">
          <edit-icon/>
          <input type="file" name="avatar" tabindex="-1">
        </button>
      </div>
      <div class="sub info">
        <label for="names">Full name</label>
        <input type="text" name="names">
        <label for="username">Username</label>
        <input type="text" name="username">
        <label for="number">Phone number</label>
        <input type="text" name="number">
        <label for="email">Primary email</label>
        <input type="email" name="email">
        <div class="buttons">
          <button class="plain">
            <span>cancel</span>
          </button>
          <button>
            <span>save</span>
          </button>
        </div>
        <div class="divider"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import AppHeader from '@/market/components/AppHeader.vue';
import { editIcon } from '@/icons';

@Component({ components: { AppHeader, editIcon } })
export default class Profile extends Vue {
  @Prop({ default: 'home', type: String })
  public name!: string;
  public goBack(): void {
    // this.$router.back();
  }
}
</script>

<style lang="scss" scoped>
@import '@/app.scss';
div.profile {
  background-color: $primary-color;
  > button {
    margin: 5px auto;
    margin-right: 0;
    display: block;
  }
  .section {
    background-color: white;
    max-width: 768px;
    margin: auto;
    padding: 30px 60px;

    h3 {
      color: #546e7a;
    }

    .sub {
      &.avatar {
        display: flex;
        align-items: flex-start;
        flex-wrap: wrap;
        label {
          flex-grow: 1;
          flex-basis: 100%;
          margin: 10px 0;
        }
        img {
          background-color: rgba(0, 0, 0, 0.123);
          height: 130px;
        }
        button {
          min-width: 0;
          position: relative;
          overflow: hidden;

          input {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            opacity: 0;
          }
        }
      }
      &.info {
        display: grid;
        grid-template-columns: 130px 1fr;
        grid-gap: 20px 10px;
        padding: 20px 50px 20px 20px;

        label {
          margin: 10px 0;
          text-align-last: auto;
          text-align: right;
          opacity: 0.5;
        }
        input {
          outline: none;
          border: none;
          border-bottom: 2px solid lightgrey;
          font-size: 1em;
          padding: 10px;
        }
        .buttons {
          grid-column: 1 / 3;
          display: flex;
          justify-content: flex-end;
        }
        .divider {
          height: 1px;
          margin: 10px 0;
          background-color: $primary-color-light;
          grid-column: 1 / 3;
        }
      }
    }
  }
  @media screen and (max-width: 450px) {
    .section {
      padding: 10px;

      .sub {
        &.info {
          grid-gap: 5px;
          padding: 10px;

          label,
          input {
            grid-column: 1 / 3;
          }
          label {
            text-align: left;
          }
        }
      }
    }
  }
}
</style>
