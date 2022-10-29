<template>
    <div>
        <v-container>
            <v-form>
                <v-row>
                    <v-col cols="12">
                        <v-card class="primary pa-2 light">
                            <v-row>
                                <v-col cols="12" sm="6" md="3">
                                    <v-img
                                        :src="preview"
                                        aspect-ratio="0.9"
                                        >
                                        <v-file-input  
                                            class="d-none"
                                            v-model="image"
                                            id="fileUpload" 
                                            type="file" hidden 
                                            @change="preview_image" 
                                            accept='image/x-png,image/gif,image/jpeg'/>
                                        <v-btn icon color="primary" @click="chooseFiles">
                                            <v-icon>mdi-camera</v-icon>
                                        </v-btn>
                                    </v-img>
                                </v-col>
                                 <v-col cols="12" sm="6" md="8">
                                    <v-row>
                                        <v-col cols="12">
                                            <v-btn color="info" @click="logout">Logout</v-btn>
                                        </v-col>
                                        <v-col cols="12" md="6">
                                            <v-text-field
                                                class="text-uppercase"
                                                v-model="firstName"
                                                :rules="required"
                                                label="First Name"
                                                outlined
                                                required
                                                dense
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" md="6">
                                            <v-text-field
                                                class="text-uppercase"
                                                v-model="middleName"
                                                label="Middle Name"
                                                outlined
                                                dense
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" md="6">
                                            <v-text-field
                                                class="text-uppercase"
                                                v-model="lastName"
                                                :rules="required"
                                                label="Last Name"
                                                outlined
                                                required
                                                dense
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" md="6">
                                            <DatePicker dateTitle="DOB"  @update:option="getDob"/>
                                        </v-col>
                                        <v-col cols="12" md="6">
                                            <v-combobox
                                            v-model="gender"
                                            :items="genderOption"
                                            label="Gender"
                                            dense
                                            outlined  
                                            ></v-combobox>
                                        </v-col>
                                        <v-col cols="12" md="6">
                                            <v-text-field
                                                class="text-uppercase"
                                                v-model="email"
                                                :rules="emailRules"
                                                label="Email"
                                                outlined
                                                dense
                                            ></v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-col>

                </v-row>
            </v-form>
        </v-container>
    </div>
</template>
<script>
    import DatePicker from "./default/DatePicker.vue"
export default {
    components:{DatePicker},
    data() {
        return {
            firstName:"",
            lastName:"",
            middleName:"",
            dob:null,

            profile:null,
            image:null,
            pp:'',
            gender:'',
            genderOption:['Male', 'Female'],
            email:'',
            preview:'/placeholder.jpg',

            gradeoptions: [
			{ value: "Male", text: "Male" },
			{ value: "Female", text: "Female" },
			],
            programOptions: [
			{ value: "jss1", text: "JSS1" },
			{ value: "jss2", text: "JSS2" },
			{ value: "JSS3", text: "JSS3" },
			],

            p1country: "Sierra Leone",



            required: [
            v => !!v || 'This field is required',
            ],
            emailRules: [
                //v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],

        }
    },

   
    methods:{
        logout(){
            this.$store.dispatch("account/logout");
        },
        getDob(value){
            this.dob =value
        },
        chooseFiles: function() {
            document.getElementById("fileUpload").click()
        },
        preview_image() {  
            console.log("file")
            this.preview= URL.createObjectURL(this.image)
             //create img for upload
        this.createImage(this.image);
    },
    createImage(file) {  
      if (file !== undefined) {
        const fileName = file.name
        if (fileName.lastIndexOf('.') <= 0) {
          alert('please choose avalid file')
        }
        const fileReader = new FileReader()
        fileReader.addEventListener('load', () => {
          this.profile = fileReader.result
        })
        fileReader.readAsDataURL(file)
        }
    },
    addStudent(){
        this.$refs.verified
        if(valid){

           
			}
        }
    

    }
}
</script>