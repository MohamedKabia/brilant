<template>
    <div>
        <v-color-picker mode="hexa" v-model="newcolor"></v-color-picker>
    </div>
</template>
<script>
export default {
    props:['color'],
    data(){
        return{
            newcolor:null,
            mode: 'hexa',
        }
    },
   computed: {
    
   },
    methods: {

        
    },
    watch:{
        newcolor(val){
            this.$emit('update:option', val.hexa);
        }
    },
    
}
</script>