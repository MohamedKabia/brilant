<template>
    <div>
        <v-container>
            <Titlebar title="BIlls"/>
            <BIlls/>
        </v-container>
    </div>
</template>
<script>
    import BIlls from '../components/Bills.vue'
    import Titlebar from "../components/default/Titlebar.vue";
export default {
    name:'StudentList',
    components:{BIlls,Titlebar},
    data() {
        return {
            
        }
    },
}
</script>