<template>
  <div class="institutions">
    <dashboard>
      <sidebar title="Institutions">
        <span @click="onBack">Back</span>
      </sidebar>
      <main-content>
        <div class="buttons"  v-if="!addingInsti">
          <button @click="addInsti">
            <span>Add institution</span>
          </button>
        </div>
        <div class="content-card" v-else>
          <div class="image-section">
            <img :src="imagePreview" alt="try this" v-if="fileChosen">
            <span class="label">
              {{imageLabel}}
            </span>
            <button class="borderless">
              <span>upload</span>
              <input type="file" name="image" accept="image/*" @change="onFileChange($event.target.files[0])">
            </button>
          </div>
          <div class="info-section" v-if="steps > 0">
            <span class="label" v-if="instiName">{{instiName}}</span>
            <input @keyup.enter="captureName" type="text" v-else name="institution" placeholder="Institution name" v-model="instiInput">
          </div>
          <div class="campus-section" v-if="steps > 1">
            <div class="campus" v-for="c in campuses" :key="c.id">
              <span>{{c.name}}</span>
              <span @click="removeCampus(campuses.indexOf(c))">
                <close-icon/>
              </span>
            </div>
            <input @keyup.enter="captureCampus" type="text" placeholder="Campus name" v-model="instiInput">
          </div>
          <div class="buttons">
            <button class="borderless" @click="cancelInsti">
              <span>cancel</span>
            </button>
            <button
              @click="finishInsti"
              :disabled="campuses.length === 0 || loading">
              <span>finish</span>
            </button>
          </div>
        </div>
        <div class="content-card">
          <div class="insti labels">
            <span>Name</span>
            <span>Campuses</span>
          </div>
          <div class="insti" :key="i" v-for="i in [1, 2, 3, 4]">h</div>
        </div>
      </main-content>
    </dashboard>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { closeIcon } from '@/icons';
import { createInstitution } from '@/api';
import Dashboard from '@/dashboard/components/Dashboard.vue';
import Sidebar from '@/dashboard/components/Sidebar.vue';
import MainContent from '@/dashboard/components/MainContent.vue';
import { Campus, Institution } from '@/store/insties';
const prev = require('@/assets/clear.gif');

@Component({ components: { Dashboard, Sidebar, MainContent, closeIcon } })
export default class Institutions extends Vue {

  private steps: number = 0;

  private addingInsti = false;

  private fileChosen = false;
  private file!: File

  private imageLabel: String = 'Choose image';
  private imagePreview: string | ArrayBuffer | null = prev;

  private instiName: string | boolean = false;
  private instiInput: string = ''

  private campuses: Campus[] = []

  private loading = false;

  private onFileChange(file: File) {
    this.setPreview(file);
    this.file = file;
  }

  private setPreview(file: File) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imagePreview = reader.result;
      this.fileChosen = true;
      this.imageLabel = 'Press enter to capture';
      this.steps++;
    }
    reader.readAsDataURL(file);
  }

  private captureName() {
    this.instiName = this.instiInput;
    this.instiInput = '';
    this.steps++;
  }

  private captureCampus() {
    let exists = false;
    this.campuses.some((e) => {
      if (e.name === this.instiInput) {
        exists = true;
      }
      return exists;
    })
    if (!exists) {
      let campus: Campus = {
        id: this.campuses.length,
        name: this.instiInput
      }
      this.campuses.push(campus);
      this.instiInput = '';
    }
  }

  private removeCampus(i: number) {
    this.campuses.splice(i, 1);
  }

  private addInsti(): void {
    this.addingInsti = true;
    this.steps = 0;
  }

  private cancelInsti(): void {
    this.addingInsti = false;
    this.steps = 0;
    this.fileChosen = false;
    this.imageLabel = 'Choose image';
    this.imagePreview = prev;
  }

  private finishInsti() {
    const formData = new FormData();
    formData.append('institutionName', this.instiName as string);
    formData.append('image', this.file);
    this.campuses.forEach((e) => {
      formData.append('campuses[]', e.name);
    })
    createInstitution(formData).then((response) => {
      console.log(response);
    }).catch((error) => {
      // Do nothing
    });
    this.loading = true;
  }

  private onBack(): void {
    if (window.history.state === null) {
      this.$router.push({ name: 'home' });
    } else {
      this.$router.go(-1);
    }
  }
}
</script>
<style lang="scss" scoped>
div.institutions {
  .buttons {
    display: flex;
    justify-content: flex-end;
    padding: 0 0 10px;
  }
  .content-card {
    padding: 20px;
    margin-bottom: 20px;

    .insti {
      display: grid;
      grid-template-columns: 1fr 100px;

      span {
        display: inline-block;
        padding: 5px 0;
      }
      &.labels {
        span {
          font-weight: bold;
        }
      }
    }
    .image-section {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;

      .label {
        display: block;
        padding: 12px;
        flex-grow: 1;
        color: #ccc;
      }
      img {
        flex-shrink: 0;
        --box: 70px;
        height: var(--box);
        width: var(--box);
        background-color: rgba(168, 168, 168, 0.603);
        object-fit: cover;
      }
      button {
        position: relative;
        overflow: hidden;
        input {
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          opacity: 0;
        }
      }
    }
    .info-section {
      padding: 5px 0;
      margin-top: 10px;
      display: flex;
      justify-content: space-between;

      .label {
        display: block;
        padding: 10px;
        font-size: 1.6em;
      }
      input {
        border: none;
        outline: none;
        font-size: 1.6em;
        padding: 10px;
        border-bottom: 2px solid #ccc;
        flex-grow: 1;
      }
    }
    .campus-section {
      padding: 20px 0;
      display: flex;
      flex-wrap: wrap;

      .campus {
        display: flex;
        border-radius: 20px;
        margin: 10px 5px;
        box-shadow: 0 1px 2px 1px rgba(133, 133, 133, 0.459);
        overflow: hidden;

        span {
          display: block;
          padding: 10px;
          padding-top: 12px;

          &:last-child {
            cursor: pointer;
          }
          svg {
            height: 20px;
            width: 20px;
            display: block;
            fill: black;
          }
        }
      }
      input {
        flex-grow: 1;
        flex-basis: 100%;
        border: none;
        outline: none;
        padding: 10px;
        font-size: 1.2em;
        border-bottom: 2px solid #ccc;
      }
    }
  }
  @media screen and (max-width: 450px) {
    .content-card {
      padding: 5px;

      .campus-section {
        .campus {
          margin: 5px 0;
          width: 100%;
          justify-content: space-between;
          border-radius: 5px;
        }
      }
    }
  }
}
</style>
