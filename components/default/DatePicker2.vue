<template>
    <div>
    <div v-if="false">
        =====================
        -------this date picker requires date-range min and max
        =====================
    </div>
      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="date"
            :label="dateTitle"
            append-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
            dense
            outlined
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="date"
          :active-picker.sync="activePicker"
          :max="dateRange.max"
          :min="dateRange.min"
          @change="save"
        ></v-date-picker>
      </v-menu>
    </div>

  </template>
  <script>
    export default {
        props:[
        "dateTitle",
        "dateRange"
        ],
      data: () => ({
        activePicker: null,
        date: null,
        menu: false,
      }),
      watch: {
        menu (val) {
          val && setTimeout(() => (this.activePicker = 'YEAR'))
        },
      },
      methods: {
        save (date) {
          this.$refs.menu.save(date);
          this.$emit('update:option', this.date)
        },
      },
    }
  </script>