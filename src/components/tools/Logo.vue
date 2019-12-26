<template>
  <div class="logo">
    <router-link :to="{path:'/home'}" class="logo-link">
      <LogoSvg alt="logo"/>
      <h1 class="title" v-if="showTitle">{{ title }}</h1>
    </router-link>
  </div>
</template>

<script>
import LogoSvg from '@/assets/logo.svg?inline'

export default {
  name: 'Logo',
  components: {
    LogoSvg
  },
  props: {
    title: {
      type: String,
      default: '二四优递物流管理系统',
      required: false
    },
    showTitle: {
      type: Boolean,
      default: true,
      required: false
    }
  }
}
</script>
<style scoped lang='less'>
.logo {
  .logo-link {
    text-decoration: none;
    h1.title {
      display: inline;
      text-align: center;
      font-size: 15px;
    }
  }
}
</style>
