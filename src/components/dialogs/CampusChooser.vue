<template>
  <app-dialog class="campus-chooser" :class="{active: choosingCampus}">
    <h3>Publish in:</h3>
    <div class="campuses">
      <div class="item" v-for="i in insties" :key="i.id">
        <img :src="i.image">
        <div>
          <span
            v-for="j in i.campuses"
            :key="j.id"
            @click="publish(j.id)"
          >{{j.name}}</span>
        </div>
      </div>
    </div>
  </app-dialog>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import AppDialog from '@/components/AppDialog.vue';
import store from '@/store';

@Component({
  components: {
    AppDialog,
  },
})
export default class CampusChooser extends Vue {

  @Prop(Function) private onDone!: () => void

  private get insties() {
    return store.getters['insties/institutions'];
  }

  private get choosingCampus() {
    return store.getters['posts/choosingCampus'];
  }

  private async publish(id: number) {
    try {
      await store.dispatch('posts/publishPost', id);
      this.onDone();
    } catch (error) {
      // TODO catch error here
    }
  }
}
</script>
<style lang="scss" scoped>
div.campus-chooser {
  display: none;
  &.active {
    display: block;
  }

  .campuses {
    padding: 5px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    overflow: auto;
    max-height: 400px;

    .item {
      display: flex;
      align-items: flex-start;
      img {
        height: 40px;
        width: 40px;
        border-radius: 20px;
        margin: 5px;
      }
      div {
        width: 100%;
        span {
          display: block;
          padding: 10px 5px;
          margin: 5px 0;
          font-size: 0.95em;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          user-select: none;
          cursor: pointer;
          &:hover {
            background-color: rgb(235, 235, 235);
          }
          &:active {
            background-color: var(--primary-color-hover);
          }
        }
      }
    }
  }
  @media screen and (max-width: 450px) {
    .campuses {
      grid-template-columns: 1fr;
      max-height: auto;
      max-height: calc(100vh - 150px);

      .item {
        div {
          width: 100%;
          span {
            display: block;
            font-size: 1em;
            padding: 10px;
          }
        }
      }
    }
  }
}
</style>
