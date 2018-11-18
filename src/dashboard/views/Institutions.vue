<template>
  <div class="institutions">
    <dashboard>
      <sidebar title="Institutions">
        <span @click="onBack">Back</span>
      </sidebar>
      <main-content>
        <div class="buttons">
          <button>
            <span>Add institution</span>
          </button>
        </div>
        <div class="content-card">
          <div class="image-section">
            <span class="label">
              No image file chosen
            </span>
            <button class="borderless">
              <span>Upload image</span>
              <input type="file" name="image" accept="image/*">
            </button>
          </div>
          <div class="info-section">
            <span class="label">Institution name</span>
            <input type="text" name="institution">
            <!-- <button class="borderless">
              <span>edit</span>
            </button> -->
          </div>
        </div>
        <!-- <div class="content-card">
          <div class="insti labels">
            <span>Name</span>
            <span>Campuses</span>
          </div>
          <div class="insti" :key="i" v-for="i in [1, 2, 3, 4]">h</div>
        </div> -->
      </main-content>
    </dashboard>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Dashboard from '@/dashboard/components/Dashboard.vue';
import Sidebar from '@/dashboard/components/Sidebar.vue';
import MainContent from '@/dashboard/components/MainContent.vue';

@Component({ components: { Dashboard, Sidebar, MainContent } })
export default class Institutions extends Vue {

  public onBack(): void {
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

      .label {
        display: block;
        padding: 12px;
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
        padding: 12px;
      }
      input {
        border: none;
        outline: none;
        // background-color: var(--primary-color-hover);
        font-size: 1em;
        padding: 10px;
        border-bottom: 2px solid #ccc;
        flex-grow: 1;
      }
    }
  }
}
</style>
