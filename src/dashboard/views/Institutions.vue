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
        <institution-form class="content-card" v-else/>
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
import store from '@/store';
import { closeIcon } from '@/icons';
import { createInstitution } from '@/api';
import Dashboard from '@/dashboard/components/Dashboard.vue';
import Sidebar from '@/dashboard/components/Sidebar.vue';
import MainContent from '@/dashboard/components/MainContent.vue';
import InstitutionForm from '@/dashboard/components/InstitutionForm.vue';
import { Campus, Institution } from '@/store/insties';
const prev = require('@/assets/clear.gif');

@Component({ components: { Dashboard, Sidebar, MainContent, InstitutionForm, closeIcon } })
export default class Institutions extends Vue {

  private steps: number = 0;
  private uploadButton = 'upload';

  private addingInsti = true;

  private fileChosen = false;
  private file!: string

  private imageLabel: String = 'Choose image';
  private imagePreview: string | ArrayBuffer | null = prev;

  private instiName: string | boolean = false;
  private instiInput: string = ''

  private campuses: Campus[] = []

  private loading = false;

  private onFileChange(file: File) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.file = reader.result as string;
      this.fileChosen = true;
      this.imageLabel = 'Press enter to capture';
      this.steps++;
      this.uploadButton = 'change';
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

  private async finishInsti() {
    const instie: Institution = {
      id: 0,
      name: this.instiName as string,
      imageData: this.file,
      campuses: this.campuses
    }
    await store.dispatch('insties/addInstitution', instie);
    this.cancelInsti();
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
  }
  @media screen and (max-width: 450px) {
    .content-card {
      padding: 5px;
    }
  }
}
</style>
