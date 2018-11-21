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
import Dashboard from '@/dashboard/components/Dashboard.vue';
import Sidebar from '@/dashboard/components/Sidebar.vue';
import MainContent from '@/dashboard/components/MainContent.vue';
import InstitutionForm from '@/dashboard/components/InstitutionForm.vue';
import { Campus, Institution } from '@/store/insties';


@Component({ components: { Dashboard, Sidebar, MainContent, InstitutionForm, closeIcon } })
export default class Institutions extends Vue {

  private get addingInsti() {
    return store.getters['insties/addingInstitution'];
  }

  private addInsti() {
    store.commit('insties/addInstitution');
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
  }
  @media screen and (max-width: 450px) {
    .content-card {
      padding: 5px;
    }
  }
}
</style>
