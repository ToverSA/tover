<template>
  <div class="quick-search" v-bind:class="{scrolled}">
    <div class="search-bar">
      <div class="cat-button">
        <school-icon/>
        <span>KwaDlangezwa Campus</span>
      </div>
      <input type="search" placeholder="Searching for books, chargers, a fridge, or a burger maybe? Find it here.">
      <div class="search-button">
        <search-icon/>
        <span>search</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { searchIcon, schoolIcon } from '@/icons';

@Component({
  components: { searchIcon, schoolIcon },
})
export default class QuickSearch extends Vue {

  private scrolled: boolean = false;

  private created() {
    window.addEventListener('scroll', this.handleScroll);
  }

  private destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  private handleScroll(event: Event) {
    this.scrolled = window.scrollY > 50;
  }

  private gotoBrowse(): void {
    this.$router.push({ name: 'browse' });
  }

  private gotoSearch() {
    this.$router.push({ name: 'search' });
  }

}
</script>
<style lang="scss" scoped>
@import '@/app.scss';
div.quick-search {
  z-index: 2;
  position: absolute;
  top: $bar-height;
  width: 100%;
  padding: 10px;
  background-color: var(--primary-color-header);

  &.scrolled {
    position: fixed;
    top: 0;
    box-shadow: 0 1px 1px 1px rgba(0, 0, 0, 0.192);
  }
  .search-bar {
    background-color: var(--primary-color);
    max-width: 768px;
    margin: auto;
    border-radius: 10px;
    overflow: hidden;
    display: flex;

    .cat-button,
    .search-button {
      flex-basis: 50px;
      flex-shrink: 0;
      display: flex;
      padding: 10px;
      cursor: pointer;

      svg {
        height: 18px;
        width: 18px;
        margin-right: 7px;
      }
      span {
        color: white;
        max-width: 150px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .search-button {
      flex-basis: 50px;
      flex-shrink: 0;
    }
    input {
      padding: 10px;
      font-size: 1em;
      border: 0;
      flex-grow: 1;
      min-width: auto;
      outline: none;
    }
  }
  @media screen and (max-width: 450px) {
    .cat-button,
    .search-button {
      svg {
        margin: auto;
      }
      span {
        display: none;
      }
    }
  }
}
</style>
