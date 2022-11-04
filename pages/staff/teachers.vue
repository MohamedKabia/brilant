<template>
    <div>
        <v-container>
            <Titlebar title="Teachers"/>
            <Teachers/>
        </v-container>
    </div>
</template>
<script>
    import Teachers from "../../components/default/Teacher.vue"
    import Titlebar from "../../components/default/Titlebar.vue";
export default {
    name:'StudentList',
    components:{Teachers,Titlebar},
    data() {
        return {
            
        }
    },
}
</script>