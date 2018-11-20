<template>
    <div class="auth-form">
      <div class="closer" @click="onCancel">
        <close-icon/>
      </div>
      <logo-icon/>
      <slot></slot>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';
import store from '@/store';
import api from '@/api';
import { closeIcon, chevronRightIcon, chevronLeftIcon, logoIcon } from '@/icons';

@Component({
  components: {
    logoIcon,
    closeIcon,
  },
})
export default class AuthForm extends Vue {

  private onCancel(): void {
    if (window.history.state === null) {
      this.$router.push({ name: 'home' });
    } else {
      this.$router.go(-1);
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/app.scss';
div.auth-form {
  max-width: 450px;
  background-color: white;
  margin: auto;
  border-radius: 5px;
  box-shadow: 0 1px 2px 1px rgb(202, 202, 202);
  padding: 50px;
  padding-bottom: 30px;
  position: relative;

  svg {
    height: 70px;
  }

  .closer {
    svg {
      fill: var(--primary-color);
      position: absolute;
      height: 30px;
      width: 30px;
      padding: 5px;
      top: 10px;
      right: 10px;
      cursor: pointer;
      display: block;
    }
  }

  input {
    display: block;
    margin: 20px auto;
    width: 100%;
    padding: 10px;
    font-size: 1em;
    outline: none;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: var(--primary-color-hover);

    &:focus {
      border-color: var(--primary-color);
    }

    &.error {
      border-color: #f44336;
      background-color: #f4433657;
    }
  }

  .auth-buttons {
    display: flex;
    justify-content: space-between;
  }
  > button {
    flex-grow: 1;
    width: calc(100% - 10px);
  }

  @media screen and (max-width: 450px) {
    border-radius: 0;
    padding-left: 10px;
    padding-right: 10px;

    button {
      span {
        font-size: 0.85em;
      }
    }
  }
}
</style>
