<template>
    <v-card style="width: 100%;">
        <v-card-title>
                <v-dialog v-model="dialog" width="600">
                    <v-btn slot="activator">{{loggerName}}
                            <div style="width: 10px;"></div>
                            {{countLogs.log}}/<span class="warn">{{countLogs.warn}}</span>/
                            <span class="error">{{countLogs.error}}</span>
                    </v-btn>
                    <v-card>
                        <v-card-title><span class="title">{{loggerName}} logs</span></v-card-title>
                        <v-list>
                            <template v-for="(item, index) in logs">
                                <v-list-tile :key="index">
                                    <v-list-tile-content>
                                        <v-list-tile-sub-title>
                                            {{item.timestamp}}
                                        </v-list-tile-sub-title>
                                        <v-list-tile-title>
                                            <span :class="item.type">{{item.text}}</span>
                                        </v-list-tile-title>
                                    </v-list-tile-content>
                                </v-list-tile>
                                <v-divider :key="index+logs.length"></v-divider>
                            </template>
                        </v-list>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                    color="primary"
                                    flat
                                    @click="dialog = false"
                            >
                                OK
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <v-spacer></v-spacer>
                <v-menu bottom left>
                    <v-btn slot="activator" icon>
                        <v-icon>more_vert</v-icon>
                    </v-btn>
                    <v-list>
                        <slot name="menu"></slot>
                    </v-list>
                </v-menu>
        </v-card-title>
        <v-divider></v-divider>
        <v-list>
            <slot name="list"></slot>
        </v-list>
    </v-card>
</template>

<script>
  export default {
    name: 'ServiceCard',
    props: ['service'],
    data() {
      return {
        logs: [],
        loggerName: '',
        dialog: false,
      }
    },
    computed: {
      countLogs() {
        let count = {
          log: 0,
          warn: 0,
          error: 0,
        };
        this.logs.forEach((el) => {
            count[el.type] += 1;
        });
        return count;
      }
    },
    methods: {
    },
    async mounted() {
        this.loggerName = await this.service.getLoggerName();
        this.logs = await this.service.getExistingLogs();
        this.service.subscribe('logs', (log) => {
          this.logs.push(log);
        });
    },
  }
</script>

<style scoped>
    .warn {
        color: #FB9A1E;
    }
    .error {
        color: #FF6666;
    }
</style>