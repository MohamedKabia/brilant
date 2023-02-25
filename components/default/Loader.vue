<template>
    <div v-if="loading">
      <v-dialog
        v-model="loading.loading"
        persistent
        width="700"
        overflow
      >
      <div class="text-center pa-5 loading">
          <v-progress-circular
          :size="170"
          :width="7"
          color="success"
          indeterminate
        ></v-progress-circular>
      </div>  
      </v-dialog>
    </div>
  </template>
  <script>
  export default {
    
    computed: {
      loading(){
        return this.$store.getters['settings/loading']
      }
    },
    watch: {
      dialog (val) {
        if (!val) return

        setTimeout(() => (this.dialog = false), 4000)
      },
    },
  }
</script>
<style scoped>
.v-progress-circular {
  margin: 1rem;
}
</style>