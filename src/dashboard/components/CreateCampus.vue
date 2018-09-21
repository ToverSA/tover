<template>
  <div class="create-campus">
    <app-title/>
    <div class="form choose" v-if="!institutionChosen">
      <h3>Choose Institution</h3>
      <div class="institution" :key="i.id" v-for="i in institutions" @click="choose(i.id)">
        <span>{{i.name}}</span>
      </div>
    </div>
    <div class="form" v-else>
      <h3>{{institutionChosen}}</h3>
      <input type="text" placeholder="Campus name" v-model="campusName">
      <button @click="onFinish">
        <span>finish</span>
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import AppLoader from '@/components/AppLoader.vue';
import AppTitle from '@/dashboard/components/AppTitle.vue';
import { getInstitutions, createCampus } from '@/api';

@Component({ components: { AppLoader, AppTitle } })
export default class CreateCampus extends Vue {
  private institutions = [];
  private institutionChosen: boolean | string = false;
  private institutionId!: number;
  private campusName: string = '';

  private created() {
    getInstitutions().then((response) => {
      this.institutions = response.data;
    });
  }

  private choose(id: number) {
    this.institutions.some((item: any) => {
      if (item.id === id) {
        this.institutionChosen = item.name;
        return true;
      }
      return false;
    });
    this.institutionId = id;
  }

  private onFinish() {
    if (this.campusName.length === 0) {
      return;
    }
    createCampus(this.institutionId, this.campusName).then((response) => {
      this.$router.push({ name: 'dashboard' });
    });
  }
}
</script>


<style lang="scss" scoped>
@import '@/app.scss';
div.create-campus {
  background-color: white;

  .form {
    margin: 100px auto 5px;
    max-width: 400px;
    padding: 20px 50px;

    &.choose {
      margin: 5px auto;

      .institution {
        padding: 15px 5px;
        display: block;
        cursor: pointer;
      }
    }
    input {
      margin: 10px 0;
      border: 0;
      width: 100%;
      padding: 10px;
      font-size: 1em;
      border-bottom: 2px solid $primary-color-light;
      outline: none;
      &:focus {
        border-bottom-color: $primary-color;
      }
    }
    select,
    option {
      width: 100%;
      padding: 10px;
      outline: none;
      font-size: 1em;
      border: none;
      background-color: white;
      border-bottom: 2px solid $primary-color-light;
      &:focus {
        border-bottom-color: $primary-color;
      }
    }
    button,
    .btn {
      display: inline-block;
    }
  }
  @media screen and (max-width: 450px) {
    .form {
      padding: 20px;
    }
  }
}
</style>
