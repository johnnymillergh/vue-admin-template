<template>
  <div class="footer-container">
    <h1 class="footer-font">{{ appAuthorArray[0]+' '+appAuthorArray[1]+' '+appAuthorArray[2] }} © {{ currentYear }}</h1>
    <h1 class="footer-font">Version {{ appVersion }}</h1>
  </div>
</template>

<script>
import { formatDate } from '@/utils/datetime'

export default {
  name: 'LoginFooter',
  data() {
    return {
      appAuthorArray: [],
      appVersion: null,
      currentYear: formatDate(new Date(), 'yyyy')
    }
  },
  mounted() {
    const projectProperty = JSON.parse(unescape(process.env.PACKAGE_JSON))
    this.appAuthorArray = projectProperty.author.split(' ')
    this.appVersion = projectProperty.version
  }
}
</script>

<style scoped>
.footer-container {
}
.footer-font {
  font-size: 12px;
  text-align: center;
  color: #6a737d;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
}
</style>
