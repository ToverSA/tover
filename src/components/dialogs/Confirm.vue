<template>
  <app-dialog class="confirm">
    <h3 v-if="title" class="title">{{title}}</h3>
    <p v-if="message" class="message">{{message}}</p>
    <div class="actions">
      <span @click="onAlternate.callback" v-if="onAlternate" class="alternative">{{onAlternate.label}}</span>
      <span v-if="onAlternate" class="spacer"></span>
      <span @click="onNegative.callback" v-if="onNegative" class="negative">{{onNegative.label}}</span>
      <span @click="onPositive.callback" v-if="onPositive" class="positive">{{onPositive.label}}</span>
    </div>
  </app-dialog>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { Dialog } from '@/components/dialogs';
@Component({
  components: { appDialog: Dialog },
  props: {
    title: {
      type: [String, Boolean],
      default: false,
    },
    message: {
      type: [String, Boolean],
      default: false,
    },

    onNegative: {
      type: [Boolean, Object],
      default: false,
    },
    onPositive: {
      type: [Boolean, Object],
      default: false,
    },
    onAlternate: {
      type: [Boolean, Object],
      default: false,
    },
  },
})
export default class Confirm extends Vue { }
</script>
