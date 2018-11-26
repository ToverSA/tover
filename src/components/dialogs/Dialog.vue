<template>
  <div class="dialog">
    <div class="container">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/app.scss';
div.dialog {
  position: fixed;
  background-color: rgba(0, 0, 0, 0.233);
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;

  .container {
    background-color: white;
    position: absolute;
    padding: 20px;
    left: 50%;
    transform: translateX(-50%);
    bottom: 20px;
    max-width: 425px;
    width: 100%;
    border-radius: 3px;
    overflow: hidden;
    @media screen and (max-width: 425px) {
      bottom: 0;
      border-radius: 0;
    }
  }
  &.loader {
    .container {
      display: grid;
      grid-template-columns: 50px 1fr;

      .status {
        margin: 0;
        padding: 14px;
      }
    }
  }
  &.confirm {
    .container {
      padding: 0;

      .title {
        margin: 15px 10px;
        margin-top: 35px;
      }
      .message {
        margin: 10px;
      }
      .actions {
        display: flex;
        width: 100%;
        justify-content: flex-end;
        span {
          padding: 15px 10px;
          flex-basis: 100px;
          text-align: center;
          color: $primary-color;
        }
        .spacer {
          flex-grow: 1;
        }
        .alternative {
          color: $primary-color-light;
        }
        .negative {
          margin-right: 5px;
        }
        .alternative,
        .negative,
        .positive {
          cursor: pointer;
        }
      }
    }
  }
}
</style>
