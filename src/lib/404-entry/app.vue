<template>
    <div class="page404">
    <v-card class="mx-auto" max-width="400">
        <v-card-title><span class="title">Oops...</span></v-card-title>
        <v-card-text class="headline">We could not load this page <br> so <b>404</b> is shown, sry =(</v-card-text>
    </v-card>
    </div>
</template>

<script>
  export default {
    name: 'Page404',
  }
</script>

<style>
    body, html {
        width: 100vw;
        height: 100vh;
        overflow: hidden;
    }
    .page404 {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>