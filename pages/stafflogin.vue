<template>
    <div>
        <v-container>
                <v-row>
                <v-col cols="12" sm="10" class="offset-sm-1">
                    <v-card flat>
                        <v-card-text>
                            <v-row class="align-center">
                                <v-col cols="12" sm="6" class="primary light pattern-bg vh-90">
                                
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <div class="center">
                                    <h1 class="mb-5 pb-5">{{title}}</h1>
                                    
                                    
                                </div>
                                    <v-form>
                                        <v-text-field
                                            class="text-uppercase"
                                            v-model="staffId"
                                            
                                            label="Staf ID"
                                            outlined
                                            dense
                                        ></v-text-field>
                                        <v-text-field
                                            class="text-uppercase"
                                            v-model="password"
                                            
                                            label="Password"
                                            outlined
                                            dense
                                        ></v-text-field>

                                        <v-btn color="primary" dense @click="login">
                                            Login <v-icon>mdi-account</v-icon>
                                        </v-btn>
                                    </v-form>

                                    <div class="mt-5 center">
                                        <div class="mt-4">
                                        <div>
                                            Are you a student?  
                                            <v-btn text color="info" to="/studentlogin">login as student</v-btn>
                                        </div>
                                    </div>
                                    <v-divider></v-divider>
                                    <div class="mt-4">
                                        <div>
                                            Are you a parent?  
                                            <v-btn text color="info" dense to="/parentlogin">login as Parent</v-btn>
                                        </div>
                                    </div>
                                    </div>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-col>
                </v-row>
       
        </v-container>

        <v-dialog
            v-model="dialog"
            width="600px"
            persistent
          >
          <v-card>
            <div v-if="staffSchools">
                <v-row class="justify-center align-center"  >
                    <v-col md="4" cols="12" v-for="school in staffSchools" :key="school._id">
                    <v-card-text>
                        <div class="school" @click="selectSchool(school)">
                            <v-avatar
                            size="56"
                            class="mt-3 mb-3"
                            >
                                <img src="/logo.jpeg"/>
                            </v-avatar>
                        <div class="name capitalised">
                            {{school.name}}
                            <v-divider color="primary mt-1 mb-1"></v-divider>
                            <small>{{ school.displayName }}</small>
                        </div>
                        </div>
                    </v-card-text>
                    </v-col>
                </v-row>
            </div>
          </v-card>
        </v-dialog>

    </div>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
    data() {
        return {
            dialog:false, 
            staffId:null,
            password:null,
            title:"Staff Login",
        }
    },
    computed: {
        user(){
            return this.$store.getters['account/getUser']
        },
        schools(){
            return this.$store.getters['school/schools']
        },
        staffSchools(){
            if(this.schools && this.user){
                const schools =this.schools.filter(school =>
                    this.user.schools.some(uschool => uschool.school == school._id)
                );
                return schools
            }
            else return null
        }
	},
    methods: {
        selectSchool(val){
            let newVal =JSON.stringify(val)
            window.localStorage.setItem("Sschool", newVal);
            
            let data={
                roles:["Staff","Accountant"],
                ...val
            }
            this.$store.commit('school/setData',{itemsName:"school",data});
            if(this.user.role !="Admin"){this.$store.dispatch('account/getData',newVal);}
            this.dialog=false;
        },
        login(){
           let  data={
            staffId:this.staffId,
            password:this.password
            }
            this.$store.dispatch("account/staffLogin",data);
        }
    },
    watch: {
		user(val){
			if(val){
				if(val.role=="Admin"){
                    this.$router.push('/') 
                }else{
                    this.dialog =true;
                }
			}
			
		}
	  },
}
</script>