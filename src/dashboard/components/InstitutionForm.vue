<template>
  <div class="institution-form">
    <div class="image-section">
      <img :src="instie.imageData" alt="try this" v-if="instie.imageData !== null">
      <span class="label" v-else>
        Choose image
      </span>
      <button class="borderless">
        <span>{{uploadButton}}</span>
        <input type="file" name="image" accept="image/*" @change="onFileChange($event.target.files[0])">
      </button>
    </div>
    <div class="info-section" v-if="instie.imageData !== null">
      <span class="label" v-if="instie.name !== null">{{instie.name}}</span>
      <div class="campuses" v-if="instie.campuses.length !== 0">
        <div class="campus" v-for="c in instie.campuses" :key="c.id">
          <span>{{c.name}}</span>
          <span @click="removeCampus(instie.campuses.indexOf(c))">
            <close-icon/>
          </span>
        </div>
      </div>
      <input @keyup.enter="capture" type="text" name="institution" :placeholder="inputPlaceholder" v-model="instieInput">
    </div>
    <!-- <div class="campus-section" v-if="steps > 1">
      <div class="campus" v-for="c in campuses" :key="c.id">
        <span>{{c.name}}</span>
        <span @click="removeCampus(campuses.indexOf(c))">
          <close-icon/>
        </span>
      </div>
      <input @keyup.enter="captureCampus" type="text" placeholder="Campus name" v-model="instiInput">
    </div> -->
    <div class="buttons">
      <button class="borderless" @click="cancelInsti">
        <span>cancel</span>
      </button>
      <button
        @click="finishInsti"
        v-if="instie.imageData !== null"
        :disabled="instie.campuses.length === 0 || loading">
        <span>finish</span>
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import store from '@/store';
import { closeIcon } from '@/icons';
import { Institution, Campus } from '@/store/insties';
@Component({ components: { closeIcon } })
export default class InstitutionForm extends Vue {

  private instieInput = '';
  private instie: Institution = {
    id: 0,
    name: null,
    imageData: null,
    campuses: [],
  };

  private created() {
    store.commit('insties/initAdd');
  }

  private get uploadButton() {
    if (this.instie.imageData === null) {
      return 'upload';
    }
    return 'change';
  }

  private get inputPlaceholder() {
    if (this.instie.name === null) {
      return 'Institution name';
    }
    return 'Campus name';
  }

  private get loading() {
    return store.getters['insties/savingInstitution'];
  }

  private capture() {
    if (this.instie.name === null) {
      this.instie.name = this.instieInput;
      this.instieInput = '';
      return;
    }
    let exists = false;
    this.instie.campuses.some((e) => {
      if (e.name === this.instieInput) {
        exists = true;
      }
      return exists;
    });
    if (!exists) {
      const campus: Campus = {
        id: this.instie.campuses.length,
        name: this.instieInput,
      };
      this.instie.campuses.push(campus);
      this.instieInput = '';
    }
  }

  private removeCampus(i: number) {
    this.instie.campuses.splice(i, 1);
  }

  private cancelInsti(): void {
    this.instie.id = 0;
    this.instie.name = null;
    this.instie.imageData = null;
    this.instie.campuses = [];
    store.commit('insties/savingInstitution', false);
  }

  private async finishInsti() {
    await store.dispatch('insties/addInstitution', this.instie);
    this.cancelInsti();
  }

  private onFileChange(file: File) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.instie.imageData = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}
</script>

<style lang="scss" scoped>
div.institution-form {
  .image-section {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    .label {
      display: block;
      padding: 12px;
      flex-grow: 1;
      color: rgb(92, 92, 92);
    }
    img {
      flex-shrink: 0;
      --box: 100px;
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
    --fosi: 1.4em;
    padding: 5px 0;
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .label {
      display: block;
      padding: 10px;
      font-size: var(--fosi);
      flex-grow: 1;
      flex-basis: 100%;
    }
    input {
      border: none;
      outline: none;
      font-size: var(--fosi);
      padding: 10px;
      border-bottom: 2px solid #ccc;
      flex-grow: 1;
    }

    .campuses {
      flex-basis: 100%;
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
    }
  }

  .buttons {
    display: flex;
    justify-content: flex-end;
  }
  @media screen and (max-width: 450px) {
    .info-section {
      .campuses {
        .campus {
          margin: 2px 0;
          width: 100%;
          justify-content: space-between;
          border-radius: 5px;
        }
      }
    }
  }
}
</style>
