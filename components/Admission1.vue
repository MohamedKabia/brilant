<template>
    <div>
        <v-container>
           <v-row>
            <v-col cols="6" md="3" >
                        <v-combobox
                            v-model="school"
                            :items="schoolOptions"
                            label="School"
                            :rules="required"
                            dense
                            outlined  
                        ></v-combobox>
                    </v-col>
                    <v-col cols="6" md="3" >
                        <v-combobox
                            v-model="academicYear"
                            :items="acYearOptions"
                            label="Academic Year"
                            :rules="required"
                            dense
                            outlined  
                        ></v-combobox>
                    </v-col>

                    <v-col cols='6' md="6">
                        <div v-if="school" class="caps primary--text">{{ school.text }} student admission</div>
                    </v-col>
           </v-row>
            <v-form ref="form" v-model="valid">
                <v-row v-if="academicYear && school">
                    <v-col cols="12" sm="4" md="3">
                        <v-img
                            :src="preview"
                            aspect-ratio="0.9"
                            >
                            <v-file-input  
                                class="d-none"
                                v-model="image"
                                id="fileUpload" 
                                :rules="required"
                                type="file" hidden 
                                @change="preview_image" 
                                
                                accept='image/x-png,image/gif,image/jpeg'/>

                                
                            <v-btn icon color="primary" @click="chooseFiles">
                                <v-icon>mdi-camera</v-icon>
                            </v-btn>
                        </v-img>
                    </v-col>
                    <v-col cols="12" sm="8" md="9">
                        <v-row>
                            <v-col cols="12" md="4" sm="6">
                                <v-text-field
                                    class="text-uppercase"
                                    v-model="admNumb"
                                    label="Admission Number"
                                    outlined
                                    dense
                                    color="secondary"
                                 ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="4" sm="6">
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
                            <v-col cols="12" md="4" sm="6">
                                <v-text-field
                                    class="text-uppercase"
                                    v-model="middleName"
                                    label="Middle Name"
                                    outlined
                                    dense
                                 ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="4" sm="6">
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
                            <v-col cols="12" md="4" sm="6">
                                <DatePicker dateTitle="DOB"  @update:option="getDob"/>
                            </v-col>
                            <v-col cols="12" md="4" sm="6">
                                <v-combobox
                                v-model="gender"
                                :items="genderOption"
                                :rules="required"
                                label="Gender"
                                dense
                                outlined  
                                ></v-combobox>
                            </v-col>
                            <v-col cols="12" md="4" sm="6">
                                <v-text-field
                                    class="text-uppercase"
                                    v-model="email"
                                    :rules="emailRules"
                                    label="Email"
                                    outlined
                                    dense
                                 ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="4" sm="6">
                                <v-text-field
                                    class="text-uppercase"
                                    v-model="phone"
                                    :rules="required"
                                    label="Phone"
                                    outlined
                                    dense
                                 ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="4" sm="6">
                                <v-text-field
                                    class="text-uppercase"
                                    v-model="address"
                                    :rules="required"
                                    label="Address"
                                    outlined
                                    dense
                                 ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="4" sm="6" v-if="programOptions">
                                <v-combobox
                                    v-model="program"
                                    :items="programOptions"
                                    label="Program"
                                    :rules="required"
                                    dense
                                    outlined  
                                ></v-combobox>
                            </v-col>
                             <v-col cols="12" md="4" sm="6">
                                <DatePicker dateTitle="Date Started"  @update:option="getdate"/>
                             </v-col>
                            
                             <v-col cols="12" md="4" sm="6">
                                 <v-combobox
                                 v-model="level"
                                 :items="gradeOptions"
                                 :rules="required"
                                 label="Level/Grade"
                                 dense
                                 outlined  
                                 ></v-combobox>
                             </v-col>  
                        </v-row>
                    </v-col>

                    

                    <v-col cols="12">
                        <h2>Primary Guardian Contact</h2>
                        <v-row class="mt-3">
                            <v-col cols="12" md="3" sm="6">
                                <v-text-field
                                    class="text-uppercase"
                                    v-model="e1name"
                                    :rules="required"
                                    label="Name"
                                    outlined
                                    dense
                                ></v-text-field>
                            </v-col>

                            <v-col cols="12" md="3" sm="6">
                                <v-text-field
                                    class="text-uppercase"
                                    v-model="e1phone"
                                    :rules="required"
                                    label="Phone"
                                    outlined
                                    dense
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="3" sm="6">
                                <v-text-field
                                    class="text-uppercase"
                                    v-model="e1email"
                                    :rules="emailRules"
                                    label="Email"
                                    outlined
                                    dense
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="3" sm="6">
                                <v-text-field
                                    class="text-uppercase"
                                    v-model="e1occupation"
                                    label="Occupation"
                                    outlined
                                    dense
                                ></v-text-field>
                            </v-col>

                            <v-col cols="12" md="3" sm="6">
                                <v-text-field
                                    class="text-uppercase"
                                    v-model="e1relationship"
                                    :rules="required"
                                    label="Relationship"
                                    outlined
                                    dense
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="9" sm="6">
                                <v-text-field
                                    class="text-uppercase"
                                    v-model="e1address"
                                    :rules="required"
                                    label="Address "
                                    outlined
                                    dense
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-col>

                    <v-col cols="12">
                        <h2>Second Guardian Contact</h2>
                        <v-row class="mt-3">
                            <v-col cols="12" md="3" sm="6">
                                <v-text-field
                                    class="text-uppercase"
                                    v-model="e2name"
                                    label="Name"
                                    outlined
                                    dense
                                ></v-text-field>
                            </v-col>

                            <v-col cols="12" md="3" sm="6">
                                <v-text-field
                                    class="text-uppercase"
                                    v-model="e2phone"
                                    label="Phone"
                                    outlined
                                    dense
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="3" sm="6">
                                <v-text-field
                                    class="text-uppercase"
                                    v-model="e2email"
                                    label="Email"
                                    outlined
                                    dense
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="3" sm="6">
                                <v-text-field
                                    class="text-uppercase"
                                    v-model="e2occupation"
                                    label="Occupation"
                                    outlined
                                    dense
                                ></v-text-field>
                            </v-col>

                            <v-col cols="12" md="3" sm="6">
                                <v-text-field
                                    class="text-uppercase"
                                    v-model="e2relationship"
                                    label="Relationship"
                                    outlined
                                    dense
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="9" sm="6">
                                <v-text-field
                                    class="text-uppercase"
                                    v-model="e2address"
                                    label="Address "
                                    outlined
                                    dense
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="9" sm="6">
                                <v-btn color="primary" @click="save">
                                    Save <v-icon class="ml-2">mdi-kite</v-icon>
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-form>

            <v-snackbar
                v-model="snackbar"
                >
                {{ text }}

            <template v-slot:action="{ attrs }">
                <v-btn
                color="pink"
                text
                v-bind="attrs"
                @click="snackbar = false"
                >
                Close
                </v-btn>
            </template>
            </v-snackbar>

            <v-dialog
                v-model="fileDialog"
                width="400"
                class="text-center"
                >
                <div class="d-flex text-center justify-center transparent" >
                    <v-btn color="info" small @click="selectImage">Select an image</v-btn> 
                <v-btn color="primary" class="ml-2" small @click="capturePhoto" > Take a Photo</v-btn>
                </div>
            </v-dialog>

            <v-dialog
                v-model="cameraDialog"
                width="400"
                
                >
                <v-card class="text-center">
                    <div class="camera-canvas">
                        <video ref="camera" width="100%" :height="canvasHeight" autoplay></video>
                        <canvas v-show="false" id="photoTaken" ref="canvas" :width="canvasWidth" :height="canvasHeight"></canvas>
                    </div>
                    <v-btn @click="capture" >Capture <v-icon>mdi-camera</v-icon></v-btn>
                </v-card>
            </v-dialog>

            <v-dialog
                v-model="studentDetailsDialog"
                width="500"
                persistent
                
                >
                <v-card class="text-center pa-5">
                   <p>Please write down student credentials before closing this dialog</p> 
                   <ul v-if="student">
                        <li>Name: {{ student.lastName }}  
                            <span v-if="student.middleName">{{ student.middleName }}</span> {{ student.firstName }}</li>
                        <li class="mt-2 info--text">Staff ID: {{ student.studentId }}</li>
                        <li color="info" class="mt-2 info--text">Password: {{ generatedPassword }}</li>
                   </ul>
                   <v-card-actions>
                    <v-btn color="error" @click="studentDetailsDialog = !studentDetailsDialog">Close</v-btn>
                </v-card-actions>
                </v-card>
                
            </v-dialog>
        </v-container>
    </div>
</template>
<script>
    import DatePicker from "./default/DatePicker.vue";
    import DatePicker2 from "./default/DatePicker2.vue"
export default {
    components:{DatePicker,DatePicker2},
    data() {
        return {
           
            studentDetailsDialog:false,
            isCameraOpen: false,
            canvasHeight:230,
            canvasWidth:190,
            items: [],

            cameraDialog:false,
            fileDialog:false,
            snackbar:false,
            text: `SUCCESS: New student created`,
            valid:false,
            firstName:"",
            lastName:"",
            middleName:"",
            dob:null,
            address:"",
            profile:null,
            image:null,
            phone:"",
            address:"",
            pp:'',
            gender:'',
            genderOption:['Male', 'Female'],
            email:'',
            preview:'/placeholder.jpg',
			
            programOption: [
			],
            academicYear:null,
            acYearOptions:['2020/2021','2021/2022','2022/2023'],
            dateStarted:null,
            level:null,
            admNumb:"",
            gradeStarted:"",
            school:null,
            program:null,

            e1name:"",
            e1occupation:"",
            e1relationship:"",
            e1phone:"",
            e1email:"",
            e1address:"",

            e2name:"",
            e2occupation:"",
            e2relationship:"",
            e2phone:"",
            e2email:"",
            e2address:"",
            generatedPassword:'',
            required: [
            v => !!v || 'This field is required',
            ],
            emailRules: [
                //v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
            

        }
    },

    computed: {
        departmentOptions(){
           let data=[];
           let department= this.$store.getters['management/getDepartments'];
           if(department.length>0){
             department.forEach(d=>{
                data.push({ value:d._id, text:d.name},)
             })
           }
          return data;
        },
        
        schools(){
            return  this.$store.getters['school/schools']
        },
        levels(){
            return  this.$store.getters['settings/getlevels']
        },
        schoolOptions(){
           let data=[];
           if(this.schools){
             this.schools.forEach(school=>{
                data.push({ value:school._id, text:school.name},)
             })
           }
          return data;
        },
        programOptions(){
            if(this.school){
                let schData= this.schools.find(sch=> {return sch._id ==this.school.value})
                let data=[];
                if(schData.programs){
                    schData.programs.forEach(program=>{
                        data.push({ value:program._id, text:program.name},)
                    })
                }
                return data;
            }
        },
        gradeOptions(){
           let data=[];
           if(this.levels){
             this.levels.forEach(level=>{
                data.push({ value:level._id, text:level.grade},)
             })
           }
          return data;
        },
        redirect(){
            return this.$store.getters['settings/getRedirect']
        },
        user(){
            return this.$store.getters['account/getUser']
        },
        student(){
            let s= this.$store.getters['management/getStaff'];
            if(s){
                return s[s.length-1];
            }
            return []
        },
    },
    methods:{
        getdate(value){
            this.dateStarted =value
        },
        getDob(value){
            this.dob =value
        },
        chooseFiles: function() {
            this.fileDialog=true
        },
        selectImage(){
            document.getElementById("fileUpload").click()
            this.fileDialog=false;
        },
        capturePhoto(){
            this.cameraDialog=true;
            this.fileDialog=false;
            this.startCameraStream();
        },
        startCameraStream() {
            const constraints = (window.constraints = {
                audio: false,
                video: true
            });
            navigator.mediaDevices
                .getUserMedia(constraints)
                .then(stream => {
                    this.$refs.camera.srcObject = stream;
                }).catch(error => {
                alert("Browser doesn't support or there is some errors." + error);
            });
        },
        stopCameraStream() {
            let tracks = this.$refs.camera.srcObject.getTracks();
            tracks.forEach(track => {
                track.stop();
            });
        },
        capture() {
                const FLASH_TIMEOUT = 50;
                let self = this;
                setTimeout(() => {
                    const context = self.$refs.canvas.getContext('2d');
                    context.drawImage(self.$refs.camera, 0, 0, self.canvasWidth, self.canvasHeight);
                    const dataUrl = self.$refs.canvas.toDataURL("image/jpeg")
                        .replace("image/jpeg", "image/octet-stream");
                    self.stopCameraStream();
                    
                    this.cameraDialog=false;
                    this.image = this.dataURLtoFile(dataUrl, 'pp'+'.jpg');
                    this.preview= dataUrl//URL.createObjectURL(this.image);
                }, FLASH_TIMEOUT);
        },
        dataURLtoFile(dataURL, filename) {
        let arr = dataURL.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
    
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, {type: mime});
        },
        preview_image() {  
            if(this.image != null){
                this.preview= URL.createObjectURL(this.image)
                this.createImage(this.image);
            }
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
        generatePassword() {
            let r = Math.random();
            let passwordLength = 7;
            if (r > 0.5) {
                passwordLength = 8;
            }

            let password = Math.floor(Math.random() * Math.pow(10, passwordLength)) + Math.pow(10, passwordLength - 1);
            password = password.toString();
            let uppercaseLetter = String.fromCharCode(Math.floor(Math.random() * 26) + 65);

            let lowercaseLetter = String.fromCharCode(Math.floor(Math.random() * 26) + 97);
            let symbols = '!@#$%^&*()_+-=[]{}|;:\'",.<>/?';
            let symbol = symbols[Math.floor(Math.random() * symbols.length)];
            password += uppercaseLetter + lowercaseLetter + symbol;

            this.generatedPassword =password;
            return password;
        },

        save(){
            this.$refs.form.validate()

            //convert data
            function convertToFormData(data, formData, parentKey) {
                if(data === null || data === undefined) return null;
                formData = formData || new FormData();

                if (typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
                Object.keys(data).forEach(key => 
                    convertToFormData(data[key], formData, (!parentKey ? key : (data[key] instanceof File ? parentKey : `${parentKey}[${key}]`)))
                );
                } else {
                formData.append(parentKey, data);
                }
                return formData;
            }
            let formData =null;
            if(this.image){
                formData=(convertToFormData({studentimage:this.image})) 
            } 
            if(this.valid & this.dob !=null & this.image != null){
                let password =this.generatePassword();
                
                let data={
                    firstName:this.firstName,
                    lastName: this.lastName,
                    middleName:this.middleName,
                    dateStarted: this.dateStarted,
                    dob:this.dob,
                    phone:this.phone,
                    email:this.email,
                    password:password,
                    gender:this.gender,
                    level: {
                        _id:this.level.value
                    },
                    address:this.address,
                    
                    school:{
                        _id:this.school.value
                    },
                    admNumb:this.admNumb,
                    guardians: {
                        p1: {
                            name: this.e1name,
                            phone: this.e1phone,
                            email:this.e1email,
                            occupation:this.e1occupation,
                            relationship: this.e1relationship,
                            address:this.e1address
                        },

                        p2: {
                            name: this.e2name,
                            phone: this.e2phone,
                            email:this.e2email,
                            occupation:this.e2occupation,
                            relationship: this.e2relationship,
                            address: this.e2address
                        }
                    }
                }
                if(this.program){
                    let program= {
                        _id: this.program.value
                    }
                    data.program=program;
                }
                this.$store.dispatch('management/addStudent',{data,studentimage:formData})
            }
        }
        
    },//end methods

    watch: {
        redirect(val){
            if(val){
                this.$store.dispatch("settings/setRedirect",false)
                this.$refs.form.reset();
                this.image=null;
                this.dob=null;
                this.dateStarted=null;
                this.preview='/placeholder.jpg';
                this.snackbar=true;
                this.studentDetailsDialog=true;
            }
        },
        programOptions(val){
            if(val.length ==1) this.program=val[0]
        }
    },

}
</script>
<style>
    .camera-canvas{
        display:flex;
        align-items: center;
        justify-content: center;

    }
</style>