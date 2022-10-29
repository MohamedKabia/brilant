<template>
    <div>
        <v-container>
            <Titlebar :title="title"/>
            <v-menu>
                <template v-slot:activator="{ on: menu, attrs }">
                    <v-tooltip bottom color="primary">
                    <template v-slot:activator="{ on: tooltip }">
                        <v-btn
                        color="white"
                        dark
                        v-bind="attrs"
                        v-on="{ ...tooltip, ...menu }"
                        icon
                        class="primary"
                        elevation="4"
                        >
                        <v-icon color="info">mdi-microsoft-windows-classic</v-icon>
                        </v-btn>
                    </template>
                    <span >Select Class Group</span>
                    </v-tooltip>
                </template>
                <v-list>
                    <v-list-item
                    v-for="(item, index) in items"
                    :key="index"
                    class="pointer"
                    >
                    <v-list-item-title @click="getStudents(item.title)">{{ item.title }}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
            <GradeTableVue/>
        </v-container>
    </div>
</template>
<script>
    import GradeTableVue from "../../components/default/GradeTable.vue";
    import Titlebar from "../../components/default/Titlebar.vue";
export default {
    name:'StudentList',
    components:{GradeTableVue,Titlebar},
    data() {
        return {
            title:'',
            items: [
                {title:"Jss1 Green"},
                {title:"Jss1 Yellow"},
                {title:"Jss1 Blue"},
            ]
        }
    },

    methods: {
        getStudents(val){
            this.title="Grades for " + val
            console.log(val)
        }
    },
}
</script>