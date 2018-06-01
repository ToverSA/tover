<template>
  <router-view></router-view>
</template>

<script>
import AccountHeader from './AccountHeader'
import store from '../../../store'
export default {
  components: { AccountHeader }
}
</script>
