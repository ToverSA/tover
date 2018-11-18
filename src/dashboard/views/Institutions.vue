<template>
  <div class="institutions">
    <dashboard>
      <sidebar title="Institutions">
        <span>Add Institution</span>
        <span>Add Campus</span>
        <span @click="onBack">Back</span>
      </sidebar>
      <main-content>
        <div class="buttons">
          <button>
            <span>Add institution</span>
          </button>
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
  }
}
</style>
