<template>
    <div>
        <v-container>
            <Titlebar title="Staffs"/>
            <Table/>
        </v-container>
    </div>
</template>
<script>
    import Table from "../../components/default/Table.vue"
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