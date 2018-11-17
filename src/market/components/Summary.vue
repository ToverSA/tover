<template>
  <div class="section">
        <div class="header">
          <div class="info">
            <h3>KwaDlangezwa Campus</h3>
            <h4>Most viewed</h4>
          </div>
          <button>
            <span>MORE</span>
          </button>
        </div>
        <div class="scrolling-wrapper">
          <router-link :to="{ name: 'item', params: { id: j } }" class="card" v-bind:key="j" v-for="j in [1, 2, 3, 4, 5, 6, 7, 8]">
            <div class="content">
              <img src="@/assets/clear.gif" alt="galaxy">
              <h3>R12 345</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div>
          </router-link>
        </div>
      </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import { Route } from 'vue-router';

@Component
export default class Summary extends Vue {

  // @Watch('$route')
  // private onRoute(route: Route) {
  //   if (route.name === 'home') {
  //     this.loadHomeRoute();
  //   }
  //   if (route.name === 'campus') {
  //     this.loadCampusRoute();
  //   }
  // }
  // private created() {
  //   this.onRoute(this.$route);
  // }

  // private loadCampusRoute() { }
  // private loadHomeRoute() { }
}
</script>

<style lang="scss" scoped>
@import '@/app.scss';

div.section {
  margin-bottom: 15px;

  .header {
    padding: 5px;
    display: grid;
    grid-template-columns: 1fr minmax(68px, min-content);
    max-width: 960px;
    width: 100vw;
    margin: auto;
    padding: 30px;
    padding-bottom: 0;
    min-height: 0; /* NEW */
    min-width: 0;

    .info {
      width: 100%;
      overflow: hidden;
      min-width: 0;

      h3,
      h4 {
        margin: 0;
        padding-left: 5px;
        color: #607d8b;
        width: 100%;
      }
      h4 {
        font-weight: normal;
        opacity: 0.5;
      }
    }
    button {
      align-self: flex-end;
    }
  }

  .scrolling-wrapper {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    max-width: 960px;
    margin: auto;
    padding: 5px 0;

    .card {
      padding: 15px;
      text-decoration: none;

      .content {
        background-color: white;
        display: grid;

        img {
          width: 100%;
          height: auto;
          display: block;
          background-color: rgba(0, 0, 0, 0.116);
        }
        h3,
        p {
          margin: 5px;
          color: black;
        }
        p {
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          line-height: 18px;
          height: 36px;
          overflow: hidden;
        }
      }
    }
  }
  @media screen and (max-width: 768px) {
    background-color: white;
    margin: 0;

    .header {
      padding: 10px 5px;
      padding-top: 25px;
    }

    .scrolling-wrapper {
      display: flex;
      flex-wrap: nowrap;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      padding: 0;

      .card {
        flex: 0 0 auto;
        padding: 5px;

        .content {
          width: 130px;
          h3,
          p {
            margin: 5px 0;
          }
        }
      }
      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
  &.shimmer {
    .header {
      height: 75px;
      .info {
        height: 40px;
        h3 {
          height: 20px;
          margin-bottom: 2px;
          width: 90%;
        }
        h4 {
          height: 18px;
          opacity: 1;
          width: 60%;
        }
      }
      button,
      button:hover,
      button:active,
      button:focus {
        height: 40px;
        background-color: #f6f7f8;
      }
    }
    .scrolling-wrapper {
      .card {
        .content {
          img {
            background-color: #f6f7f8;
          }
          h3 {
            height: 22px;
            width: 80px;
            background-color: #f6f7f8;
          }
          p {
            background-color: #f6f7f8;
          }
        }
      }
    }
  }
}
</style>
