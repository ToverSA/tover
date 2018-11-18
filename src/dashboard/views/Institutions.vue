<template>
  <div class="institutions">
    <dashboard>
      <sidebar title="Institutions">
        <span>Add Institution</span>
        <span>Add Campus</span>
        <span @click="onBack">Back</span>
      </sidebar>
      <main-content>
        <div class="content-card">Hello</div>
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
