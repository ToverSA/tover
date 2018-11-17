import Vue from 'vue';
import { VeeValidateComponentOptions } from 'vee-validate';
declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    $_veeValidate?: VeeValidateComponentOptions;
  }
}
