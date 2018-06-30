<template lang="html">
  <div class="dialog-buttons">
    <span @click="negative()" v-if="isNegative">CANCEL</span>
    <span @click="positive()" v-if="isPositive">{{ posText }}</span>
  </div>
</template>

<script>
export default {
  created() {
    if (typeof this.positive === "function") {
      this.isPositive = true;
    }
    if (typeof this.negative === "function") {
      this.isNegative = true;
    }
    if (typeof this.text === "string") {
      this.posText = this.text;
    }
  },
  props: ["negative", "positive", "text"],
  data() {
    return {
      isNegative: false,
      isPositive: false,
      posText: "OK"
    };
  }
};
</script>

<style lang="scss" scoped>
@import "../../app.scss";
div.dialog-buttons {
  background-color: #fff;
  display: flex;
  justify-content: flex-end;

  > span {
    padding: 10px 15px;
    display: block;
    margin-left: 5px;
    color: $accent-color;
    cursor: pointer;
    &:active {
      background-color: rgba($accent-color, 0.2);
    }
  }
}
</style>
