<template>
    <div>
        <v-container>
            <Titlebar title="Fees"/>
            <Fees/>
        </v-container>
    </div>
</template>
<script>
    import Fees from '../components/Fees.vue'
    import Titlebar from "../components/default/Titlebar.vue";
export default {
    name:'StudentList',
    components:{Fees,Titlebar},
    data() {
        return {
            
        }
    },
}
</script>