<template>
  <div class="image-uploader">
    <span class="label">
      Add up to four images of what you're advertising
    </span>
    <div class="image" v-for="i in images" :key="i">
      <div class="closer" @click="removeImage(images.indexOf(i))" v-if="editing">
        <close-icon/>
      </div>
      <img :src="i">
    </div>
    <div class="image adder" v-if="images.length < 4 && editing">
      <span class="text">Click to add an image</span>
      <div class="adder-icon">
        <add-icon/>
      </div>
      <input type="file" accept="image/*" @change="onImageChange($event.target.files[0])">
      <div class="loader" v-if="loading">
        <loader-icon/>
      </div>
    </div>
    <div class="image" v-for="i in spaces" :key="i" v-if="editing">
    </div>
  </div>
</template>


<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { addIcon, closeIcon, loaderIcon } from '@/icons';
import store from '@/store';

@Component({
  components: {
    closeIcon,
    addIcon,
    loaderIcon,
  },
})
export default class ImageUploader extends Vue {

  @Prop({ type: Boolean, default: false }) private editing!: boolean;

  private get images(): string[] {
    return store.getters['posts/postImages'];
  }

  private get spaces() {
    const list = [1, 2, 3];
    list.splice(0, this.images.length);
    return list;
  }

  private loading = false;

  private removeImage(index: number) {
    store.commit('posts/removeImage', index);
  }

  private onImageChange(file: File) {
    this.loading = true;
    const reader = new FileReader();
    const image = new Image();
    reader.onload = (e) => {
      image.src = reader.result as string;
    };
    image.onload = (e) => {
      const canvas = document.createElement('canvas');
      canvas.height = 512;
      canvas.width = 512;

      const ctx: CanvasRenderingContext2D = canvas.getContext('2d', { alpha: false })!;
      ctx.fillStyle = '#F5F5F5';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      const w = image.naturalWidth;
      const h = image.naturalHeight;
      let x = 0;
      let y = 0;
      let sW = w;
      let sH = h;
      if (w > h) {
        x = (w - h) / 2;
        sW = w - 2 * x;
      } else {
        y = (h - w) / 2;
        sH = h - 2 * y;
      }
      ctx.drawImage(image, x, y, sW, sH, 0, 0, 512, 512);
      store.commit('posts/postImage', canvas.toDataURL());
      this.loading = false;
    };
    reader.readAsDataURL(file);
  }

}
</script>

<style lang="scss" scoped>
div.image-uploader {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding-top: 0;
  .label {
    grid-column: 1 / 5;
    margin: 0;
    display: block;
    padding: 10px 0;
    font-size: 0.9em;
    color: rgb(104, 104, 104);
    border-bottom: 1px solid rgba(224, 224, 224, 0.534);
  }
  .image {
    --bg: rgb(236, 236, 236);
    width: 130px;
    height: 130px;
    background-color: var(--bg);
    display: block;
    margin: 10px auto;
    position: relative;
    overflow: hidden;

    img {
      display: block;
      height: 100%;
      width: 100%;
    }
    .closer {
      background-color: rgba(0, 0, 0, 0.103);
      position: absolute;
      right: 5px;
      top: 5px;
      height: 30px;
      width: 30px;
      border-radius: 15px;
      svg {
        opacity: 0.5;
      }
    }
    .text {
      display: block;
      position: absolute;
      bottom: 0;
      text-align: center;
      color: grey;
      padding: 5px;
    }
    .adder-icon {
      position: absolute;
      right: 0;
      left: 0;
      top: 0;
      bottom: 20px;
      padding: 25px;
      svg {
        fill: grey;
      }
    }
    &.adder {
      cursor: pointer;
      box-shadow: 0 0 3px 1px #ccc inset;
      input {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        opacity: 0;
      }
      .loader {
        background-color: var(--bg);
        position: absolute;
        height: 100%;
        width: 100%;
        padding: 50px;
      }
    }
  }
  @media screen and (max-width: 768px) {
    .image {
      width: 120px;
      height: 120px;
    }
  }
  @media screen and (max-width: 450px) {
    .image {
      width: 75px;
      height: 75px;

      .closer {
        right: 2px;
        top: 2px;
      }
      .text {
        display: block;
        position: absolute;
        bottom: 0;
        text-align: center;
        color: grey;
        padding: 5px;
        font-size: 0.7em;
      }
      .adder-icon {
        position: absolute;
        right: 0;
        left: 0;
        top: 0;
        bottom: 20px;
        padding: 10px;
        svg {
          fill: grey;
        }
      }
      &.adder {
        .loader {
          padding: 25px;
        }
      }
    }
  }
}
</style>
