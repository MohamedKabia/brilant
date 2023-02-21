<template>
    <div>
    <d-flex>
        <v-col cols="6">
            <v-color-picker :mode.sync="mode" v-mode="Newcolor" @change="select"></v-color-picker>
        </v-col>
        <v-col cols="6"><v-select
            v-model="mode"
            :items="modes"
            dense
            outlined
        ></v-select>
        </v-col>
    </d-flex>
    </div>
</template>
<script>
export default {
    props:['color'],
    data(){
        return{
            Newcolor:null,
            mode: 'hsla',
            modes: ['hsla', 'rgba', 'hexa'],
        }
    },
   computed: {
    
   },
    methods: {

        select() {
           let color =this.Newcolor
            console.log(color)
          this.$emit('update:option', color);
        },
    },
}
</script>