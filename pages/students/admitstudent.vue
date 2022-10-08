<template>
    <div>
        <v-container>
            <Titlebar/>
            <Admission/>
        </v-container>
    </div>
</template>
<script>
    import Admission from "../../components/Admission.vue"
    import Titlebar from "../../components/default/Titlebar.vue";
export default {
    name:'StudentList',
    components:{Titlebar,Admission},
    data() {
        return {
            
        }
    },
}
</script>