<template>
    <div>
        <v-dialog 
            v-model="dialog"
            width="500"
            persistent
             >
            <v-card>
                <v-card-text class="pt-5 pb-5">
                    <v-form>
                        <div class="center heading-1 primary--text capitalised ">{{ formTitle }}</div>
                        <v-row class="align-center">
                            <v-col cols="12" md="4" sm="6">
                                <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                <v-img
                                    :src="editedItem.badg"
                                    aspect-ratio="0.9"
                                    v-bind="attrs"
                                    v-on="on"
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
                            </template>
                            <span>School Badg</span>
                            </v-tooltip>
                            </v-col>
                            <v-col cols="6" md="4" sm="6" class="center" v-if="editedIndex !=-1">
                                <div v-if="image">
                                    <v-btn @click="uploadBadg">Upload</v-btn>
                                </div>
                            </v-col>
                        </v-row>
                        <v-row>
                        <v-col cols="12" md="6">
                            <v-text-field
                            class="text-uppercase"
                            v-model="editedItem.name"
                            label="School Name"
                            outlined
                            dense
                        ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field
                            class="text-uppercase"
                            v-model="editedItem.displayName"
                            label="Display Name"
                            outlined
                            dense
                        ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field
                            class="text-uppercase"
                            v-model="editedItem.location"
                            label="Location"
                            outlined
                            dense
                        ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <ColorPickerVue @update:option="getColor"/>
                        </v-col>
                        </v-row>
                        
                        <v-card-actions>
                            <v-btn color="primary" v-if="this.editedIndex ==-1" @click="create('create')">Create <v-icon>mdi-gear</v-icon></v-btn> 
                            <v-btn color="primary" v-else @click="create('update')">Save <v-icon>mdi-kite</v-icon></v-btn>
                            <v-btn outlined color="secondary" @click="close" class="ml-5">Close</v-btn>
                        </v-card-actions>
                    </v-form>
                </v-card-text>
               
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
import ColorPickerVue from './ColorPicker.vue'
export default {
    components:{ColorPickerVue},
    props:['dialog','defaultItem','editedItem','editedIndex'],
    data(){
        return{
            image:null,
            preview:'/placeholder.jpg',
            
            
            editingItem:null,
            highletedItem:null,
            selectedItems:null,
            
            staffDepartment:[
                {
                    name:"Literature",_id:"73",
                    school:{name:"Aws SSS", _id:"32",icon: 'mdi-clock',departments:[
                        {name:"Literature",_id:"73"},{name:"Computer ITC",_id:"43"}
                    ]}
                }
            ],
            selectedSchool:[
            {name:"Aws SSS", _id:"32",icon: 'mdi-clock',departments:[
                    {name:"Literature",_id:"73"},{name:"Computer ITC",_id:"43"}
                ]}
            ],

            departmentOption:null,
            selectedDepartment:null
           
        }
    },
    computed: {
        formTitle () {
        return this.editedIndex === -1 ? 'Add New School' : 'Edit School'
      },
        schools(){
            return  this.$store.getters['school/schools']
        },
       

       
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

    },
    methods: {
        getColor(val){
            console.log(val)
            this.editedItem.color=val
        },
        
        chooseFiles(){
            document.getElementById("fileUpload").click()
        },
        preview_image() {  
        if(this.image != null){
            this.editedItem.badg= URL.createObjectURL(this.image)
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
        prpFormData(data, formData, parentKey){
            
        },
        create(action){
            if(true){
                let formData=null;
                if(this.image){
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
                    formData=(convertToFormData({badg:this.image})) 
                }

                let data={
                    payload:{
                        name:this.editedItem.name,
                        displayName:this.editedItem.displayName,
                        color:this.editedItem.color,
                        location:this.editedItem.location,
                    },
                    formData
                }
                if(action == 'create'){
                    this.$store.dispatch('school/createSchool',data)
                }else{
                    let updata ={
                        _id:this.editedItem._id,
                        ...data
                    };
                    this.$store.dispatch('school/update',updata)
                }
            }
        },
       
        uploadBadg(){

        },
        close (date) {
          this.$emit('update:option', false);
        },
    },
}
</script>