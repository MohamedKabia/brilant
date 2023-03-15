<template>
    <div>
        <v-container>
            <v-row v-if="student">
                <v-col cols="12" sm="2">
                    <v-img
                    :src='baseUrl+"/"+student.pp'
                    aspect-ratio="0.9"
                    ></v-img>
                </v-col>
                <v-col cols="12" sm="6">
                    <v-row>

                        <v-col cols="6">
                            <ul class="u-list">
                                <li>ID:</li>
                                <li>Name:</li>
                                <li>DOB:</li>
                                <li>Gender:</li>
                                <li>Gade/Form:</li>
                                <li>Program:</li>
                            </ul>
                        </v-col>

                        <v-col cols="6">
                            <ul class="u-list">
                                <li>:{{student.studentId}}</li>
                                <li>:{{ student.firstName }} 
                                    <span v-if="student.middleName">{{ student.middleName }}</span>
                                    {{ student.lastName  }}
                                 </li>
                                <li>:{{student.dob |moment("DD-MM-YY")}}</li>
                                <li>:{{student.gender}} </li>
                                <li>:{{student.level.level}}/{{ student.level.grade}}</li>
                                <li v-if="student.program">{{student.program.name}} </li>
                            </ul>
                        </v-col>
                    </v-row>
                </v-col>

                <v-col cols="12" class="primary mt-3">
                    <StudentBills :studentBills="studentbills"/>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>
<script>
import StudentBills from "../../components/StudentBills.vue"
export default {
    components:{StudentBills},
    data() {
        return {
        }
    },
    mounted() {
        this.$store.dispatch('accounting/getStudentBills',this.$route.params.id)
    },
    computed: {
        baseUrl(){
          return this.$store.getters['management/baseUrl'];
        },
        studentbills(){
               return this.$store.getters['accounting/studentBills'];
        },
        student(){
            if(this.studentbills){
                return this.studentbills[0].student
            }
            else return null
        },
        id(){
            console.log(this.$route.params.id)
            return this.$route.params.id
        },
        today(){
            return new Date()
        },
        currentTime(){
            return this.today.getHours() +":"+this.today.getMinutes()
        }
    },
}
</script>