<template>
    <div>
        <v-container>
            <Titlebar title="Departments"/>
            <Table/>
        </v-container>
    </div>
</template>
<script>
    import Table from "../../components/default/departments.vue"
    import Titlebar from "../../components/default/Titlebar.vue";
export default {
    name:'StudentList',
    components:{Table,Titlebar},
    data() {
        return {
            
        }
    },
}
</script>