<template>
    <div>
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
          :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
          min="01-01-1950"
          @change="save"
        ></v-date-picker>
      </v-menu>
    </div>

  </template>
  <script>
    export default {
        props:[
        "dateTitle","date"
        ],
      data: () => ({
        activePicker: null,
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