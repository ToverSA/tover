<template>
    <div class="search">
      Search
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import AppFooter from '@/components/AppFooter.vue';
import { searchIcon, helpIcon } from '@/icons';

@Component
export default class Search extends Vue {}
</script>

<style lang="scss" scoped>
@import '@/app.scss';
</style>
