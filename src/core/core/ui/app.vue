<template>
    <div class="content" v-if="service">
        <service-card :service="service">
            <div slot="menu">
                <v-list-tile @click="createLog">
                    <v-list-tile-title>Create Log</v-list-tile-title>
                </v-list-tile>
                <v-list-tile @click="createWarn">
                    <v-list-tile-title>Create Warning</v-list-tile-title>
                </v-list-tile>
                <v-list-tile @click="createError">
                    <v-list-tile-title>Create Error</v-list-tile-title>
                </v-list-tile>
                <v-divider></v-divider>
                <v-list-tile @click="changeStatus">
                    <v-list-tile-title>Change Status</v-list-tile-title>
                </v-list-tile>
            </div>
            <div slot="list">
                <v-list-tile>
                    <v-list-tile-sub-title>Incrementation</v-list-tile-sub-title>
                    <v-list-tile-title>{{status.a}}</v-list-tile-title>
                </v-list-tile>
                <v-list-tile>
                    <v-list-tile-sub-title>Boolean</v-list-tile-sub-title>
                    <v-list-tile-title>{{status.b}}</v-list-tile-title>
                </v-list-tile>
                <v-list-tile>
                    <v-list-tile-sub-title>Some text</v-list-tile-sub-title>
                    <v-list-tile-title>{{status.c}}</v-list-tile-title>
                </v-list-tile>
            </div>
        </service-card>
    </div>
</template>

<script>
   import ServiceCard from '../../utilits/ui/service-card.vue';
  export default {
    name: 'CoreEnvmon',
    components: {ServiceCard},
    data() {
      return {
        endpoint: null,
        service: null,
        status: {},
      }
    },
    methods: {
        createLog() {
          this.service.createLog('This is test log');
        },
        createWarn() {
          this.service.createWarn('This is test warning');
        },
        createError() {
          this.service.createError('This is test error');
        },
        changeStatus() {
          let st = Object.assign({}, this.status);
          st.a += 1;
          st.b = Math.random() >= 0.5;
          this.service.changeStatus(st);
        }
    },
    async mounted() {
        this.endpoint = await this.$connectToEndpoint('localhost:8080');
        this.service = await this.endpoint.getService('Test Service');
        setTimeout(async () => {
          this.status = await this.service.getStatus();
        }, 1000)
       /* this.status = await this.service.getStatus();
        /!*this.service.subscribe('info', (e) => {
          this.status = e;
        })*!/*/
    }
  }
</script>

<style scoped>
    .content {
        margin: 30px;
        display: flex;
        width: 800px;
        height: 300px;
    }
</style>