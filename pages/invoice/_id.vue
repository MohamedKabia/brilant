<template>
    <div>
        <Titlebar title="Fee Name"/>
        <v-container>
           {{ id }}
        </v-container>
    </div>
</template>
<script>
     import Titlebar from "../../components/default/Titlebar.vue";
export default {
    components:{Titlebar},
       
    computed: {
        id(){
            return this.$route.params.id
        }
    },
}
</script>