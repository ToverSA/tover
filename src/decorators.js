import Vue from 'vue';
import { createDecorator } from 'vue-class-component';
import { ComponentOptions } from 'vue';
import { DefaultData } from 'vue/types/options';

export const Computed = createDecorator((options, key) => {
  // component options should be passed to the callback
  // and update for the options object affect the component
  options.computed[key].cache = false;
});
