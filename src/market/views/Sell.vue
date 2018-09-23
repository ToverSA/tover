<template>
  <div class="sell">
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import AppHeader from '@/market/components/AppHeader.vue';

@Component({
  components: { AppHeader },
})
export default class Sell extends Vue {
  @Prop({ default: 'home', type: String })
  public name!: string;
}
</script>

<style lang="scss" scoped>
div.sell {
  margin: auto;
  margin-top: 100px;
  max-width: 768px;
  padding: 30px;
  background-color: white;
}
</style>
