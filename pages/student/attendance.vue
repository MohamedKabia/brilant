<template>
    <div>
        <v-container>
            <v-row>
                <v-col cols="12" sm="2">
                    <v-img
                    src="/pp.png"
                    aspect-ratio="0.9"
                    ></v-img>
                </v-col>
                <v-col cols="12" sm="6">
                    <v-row>

                        <v-col cols="4">
                            <ul class="u-list">
                                <li>ID:</li>
                                <li>Name:</li>
                                <li>DOB:</li>
                                <li>Gender:</li>
                                <li>Gade/Form:</li>
                                <li>Departmetn:</li>
                            </ul>
                        </v-col>

                        <v-col cols="6">
                            <ul class="u-list">
                                <li>{{id}}1</li>
                                <li>Medvik kabia mohamed</li>
                                <li>30/05/2002</li>
                                <li>Male</li>
                                <li>12</li>
                                <li>Pure Science</li>
                            </ul>
                        </v-col>
                    </v-row>
                </v-col>

                <v-col cols="12" class="primary mt-3">
                    <Attendance/>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>
<script>
import Attendance from "../../components/default/Attendance.vue"
export default {
    components:{Attendance},
    data() {
        return {
            attend:false,
        }
    },
    computed: {
        id(){
            return this.$route.params.id
        },
        student(){
            return this.$store.getters['management/getStudentById'](this.id)
        },
        currentTime(){
            return this.today.getHours() +":"+this.today.getMinutes()
        }
    },
}
</script>