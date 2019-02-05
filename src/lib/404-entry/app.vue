<template>
    <div>this is 404 page</div>
</template>

<script>
  export default {
    name: 'Page404',
    async mounted() {
      let endpoint = await this.$connectToEndpoint('localhost:8080');
      console.log(endpoint);
    }
  }
</script>

<style scoped>

</style>