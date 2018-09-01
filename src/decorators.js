// decorators.js
import { createDecorator } from 'vue-class-component';

export const Computed = createDecorator((options, key) => {
  // component options should be passed to the callback
  // and update for the options object affect the component
  options.computed[key].cache = false;
});
