<template>
  <div class="create-insti">
    <app-title/>
    <div class="form file-upload">
      <img :src="image" alt="upload" ref="image-upload">
      <button class="theme">
        <span v-if="imageChosen">change</span>
        <span v-else>choose image</span>
        <input type="file" name="image" id="image" @change="onFileChanged" accept="image/*">
      </button>
      <input type="text" v-model="institutionName" placeholder="Institution name">
      <button @click="onFinish">
        <span>finish</span>
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import AppLoader from '@/components/AppLoader.vue';
import AppTitle from '@/dashboard/components/AppTitle.vue';
import { loaderIcon } from '@/icons';
import { createInstitution } from '@/api';


@Component({ components: { AppLoader, AppTitle, loaderIcon } })
export default class CreateInstitution extends Vue {
  private imageChosen: boolean = false;
  private image = require('@/assets/clear.gif');
  private file!: Blob;
  private institutionName = '';

  private onFileChanged(event: any) {
    this.file = event.target.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (evt: ProgressEvent) => {
      this.image = reader.result + '';
      this.imageChosen = true;
    });
    reader.readAsDataURL(this.file);
  }

  private onFinish(): void {
    if (this.institutionName.length <= 1) {
      return;
    }
    if (!this.imageChosen) {
      return;
    }
    createInstitution(this.file, this.institutionName).then((response) => {
      this.$router.push({ name: 'dashboard' });
    });
  }
}
</script>


<style lang="scss" scoped>
@import '@/app.scss';
div.create-insti {
  background-color: white;

  .form {
    margin: 100px auto 5px;
    max-width: 400px;
    padding: 20px 50px;

    input {
      margin: 10px 0;
      border: 0;
      width: 100%;
      padding: 10px;
      font-size: 1em;
      border-bottom: 2px solid $primary-color-light;
      outline: none;
      &:focus {
        border-bottom-color: $primary-color;
      }
    }
    select,
    option {
      width: 100%;
      padding: 10px;
      outline: none;
      font-size: 1em;
      border: none;
      background-color: white;
      border-bottom: 2px solid $primary-color-light;
      &:focus {
        border-bottom-color: $primary-color;
      }
    }
    button,
    .btn {
      display: inline-block;
    }
    &.file-upload {
      img {
        margin: auto;
        display: block;
        background-color: rgba(0, 0, 0, 0.144);
        height: 100px;
        width: 100px;
        border-radius: 50px;
        object-fit: contain;
        padding: 10px;
      }
      h3 {
        text-align: center;
      }
      button {
        display: flex;
        margin: 5px auto;
        position: relative;
        overflow: hidden;

        input {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          margin: 0;
          border: none;
          padding: 0;
          opacity: 0;
        }
      }
    }
  }
  @media screen and (max-width: 450px) {
    .form {
      padding: 20px;
    }
  }
}
</style>
