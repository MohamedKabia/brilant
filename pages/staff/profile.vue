<template>
    <div>
        <v-container v-if="user">
            <v-row>
                <v-col cols="12" sm="3">
                    <v-img
                    :src='baseUrl+"/"+user.pp'
                    aspect-ratio="0.9"
                    ></v-img>
                    <div class="mt-2 caps primary--text">
                        <h3>{{user.jobTitle}}</h3>
                    </div>
                </v-col>
                <v-col cols="12" sm="8">
                    <v-row>
                        <v-col cols="5">
                            <ul class="u-list">
                                <li>Staff ID</li>
                                <li>Name</li>
                                <li>Email</li>
                                <li>Phone</li>
                                <li>DOB</li>
                                <li>Gender</li>
                                <li>Gade</li>
                                <li>Departmetn</li>
                            </ul>
                        </v-col>

                        <v-col cols="4">
                            <ul class="u-list">
                                <li>:{{user.userId}}</li>
                                <li>:{{user.firstName}} <span v-if="user.middleName">{{user.middleName}}</span> {{user.lastName}}</li>
                                <li>:{{user.email}}</li>
                                <li>:{{user.phone}}</li>
                                <li>:{{user.dob }}</li>
                                <li>:{{user.gender}}</li>
                                <li>:{{user.grade}}</li>
                                <li>: <span v-if="user.department">{{user.department.name}}</span> </li>
                            </ul>
                        </v-col>
                        <v-col cols="12" sm="3" >
                            <v-btn
                                    dense
                                    outlined  
                                    color="info"
                                    @click="logout"
                                >Logout <v-icon>mdi-exit</v-icon></v-btn>
                        </v-col>
                    </v-row>
                   
                </v-col>
            </v-row>

            <v-row justify-center >
                <v-col cols="12">
                    <v-card flat color="gray">
                        <v-card-text>
                            <v-icon large color="error">mdi-cash-100 </v-icon> Salary: {{user.salary | currency}}
                             <v-icon large color="info" class="ml-5">mdi-cash</v-icon> Allowance: {{user.allowance | currency}} 
                            <v-icon large color="success" class="ml-5">mdi-cash-multiple </v-icon> Gross Incom: {{user.allowance +user.salary | currency}} 
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col cols="12" md="4" sm="6">
                    <v-card>
                        <v-toolbar class="primary" dark>
                            <v-card-title >
                            Profesional Details
                        </v-card-title>
                        </v-toolbar>
                        <v-card-text>
                            <p>Work as {{user.employmentType}} {{user.jobTitle}}</p>
                            <p>Has {{user.experience}} years of experience</p>
                            <p>Started working here on {{user.dateStarted | moment("dddd, MMMM Do YYYY")}}</p>
                            <p><span v-if="user.gender =='Male'">He</span><span v-else>She</span> is a grade {{user.grade}} employee</p>
                        </v-card-text>
                    </v-card>
                </v-col>

                <v-col cols="12" md="4" sm="6">
                    <v-card>
                        <v-toolbar class="secondary" dark>
                            <v-card-title >
                            Address & other details
                        </v-card-title>
                        </v-toolbar>
                        <v-card-text>
                            <p>Address: {{user.address}}</p>
                            <p>Blod Group {{user.bloodGroup}}</p>
                            <p> {{user.phone}}</p>
                            <p>{{user.email}}</p>
                        </v-card-text>
                    </v-card>
                </v-col>

                <v-col cols="12" md="4" sm="6">
                    
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>
<script>
export default {
    data() {
        return {
            roles:['user','Admin']
        }
    },
    computed: {
        id(){
            return this.$route.params.id
        },
        user(){
            return this.$store.getters['account/getUser']
        },
        baseUrl(){
            return this.$store.getters['management/baseUrl']
        },
        admin(){
          if(this.user){
            let u =this.user;
            if(u.role =='Admin'){
                return true
            }
            else return false
          }
        }
    },
    methods: {
        logout(){
            this.$store.dispatch("account/logout");
        }
    },
}
</script>