<template>
    <div>
        <v-container>
            <v-row v-if="student">
                <v-col cols="12">
                    <div class="center">
                        <h3 :color="student.school.color">{{ student.school.name }}</h3>
                    </div>
                </v-col>
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
                                <li>Email:</li>
                                <li>DOB:</li>
                                <li>Gender:</li>
                                <li>Gade/Form:</li>
                                <li v-if="student.program">Program:</li>
                            </ul>
                        </v-col>

                        <v-col cols="6">
                            <ul class="u-list">
                                <li>{{student.studentId}}</li>
                                <li>{{student.firstName}} <span v-if="student.middleName">{{ student.middleName }}</span> {{ student.lastName }}</li>
                                <li>{{ student.email }}</li>
                                <li>{{student.dob}}</li>
                                <li>{{student.gender}}</li>
                                <li>{{student.level.grade}}/{{student.level.level}}</li>
                                <li v-if="student.program">{{student.program}}</li>
                            </ul>
                        </v-col>
                    </v-row>

                   
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>
<script>
export default {
    data() {
        return {
            
        }
    },
    computed: {
        id(){
            return this.$route.params.id
        },
        student(){
            return this.$store.getters['management/getStudentById'](this.id)
        },
        baseUrl(){
            return this.$store.getters['management/baseUrl']
        }
    },
}
</script>