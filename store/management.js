import { baseUrl } from "./base";
export const state = () => ({
        departments:[],
        teachers:[],
        students:[],
        staff:[],
        st:null,
        student:null,
        subjects:[],
        classes:null
     });
export const  mutations= { 
        pushData(state,payload){
            state[payload.itemsName].push(payload.data)
        },
        setData(state,payload){
            state[payload.itemsName]=payload.data
        },        
        //general update
        updateItem(state,payload){
            let items=payload.itemsName
            let a=  state[items].find(item=>{
                return item._id== payload.data._id
            });
            let i =state.items.indexOf(a);
            state.items[i]=payload.date;
        }
     };
     export const    actions= {  
        addDepartment({dispatch,commit},payload){
            this.$axios
            .$post(`${baseUrl}/api/department/create`, payload)
            .then((res) => {
                commit("pushData", {itemsName:"departments",data:res});
            }).catch(err=>{
                console.log(err)
            })
        },
        updateDepartment({dispatch,commit},payload){
            this.$axios
            .$post(`${baseUrl}/api/department/update/${payload._id}`, payload.data)
            .then((res) => {
                commit("updateItem",{data:payload, itemNmae:"departments"});
            }).catch(err=>{
                console.log(err)
            })
        },
        deleteDepartment({dispatch,commit},payload){
            this.$axios
            .$post(`${baseUrl}/api/department/delete/${payload._id}`)
            .then((res) => {
                //commit("pushTodepartment",res.data);
            }).catch(err=>{
                console.log(err)
                dispatch('settings/setLoading',{loading:false,message:''},{root:true});
                dispatch('settings/setRedirect',true,{root:true});
            })
        },
        addStaff({dispatch,commit},payload){
            dispatch('settings/setLoading',{loading:true,message:'Adding Employee'},{root:true})
            this.$axios
            .$post(`${baseUrl}/api/single/staffpp`, payload.pp)
            .then((response) => {
               payload.data.pp=response.pp;
               this.$axios
            .$post(`${baseUrl}/api/staff/create`, payload.data)
            .then((response) => {
                commit("pushData", {itemsName:"staff",data:response.data});
                dispatch('settings/setLoading',{loading:false,message:''},{root:true});
                dispatch('settings/setRedirect',true,{root:true});
            });
            });

        },

        /*addStudent({dispatch,commit},payload){
            dispatch('settings/setLoading',{loading:true,message:'Adding Student'},{root:true});
            this.$axios
            .$post(`${baseUrl}/api/student/create`, payload)
            .then((response) => {

                commit("pushData", {itemsName:"students",data:response});
                dispatch('settings/setLoading',{loading:false,message:''},{root:true});
                dispatch('settings/setRedirect',true,{root:true});
              
            }).catch(err=>{
                console.log(err)
            })
        },*/
        addStudent({dispatch,commit},payload){
            dispatch('settings/setLoading',{loading:true,message:'Adding Employee'},{root:true})
            this.$axios
            .$post(`${baseUrl}/api/single/studentpp`, payload.studentimage)
            .then((response) => {
               payload.data.pp=response.pp;//set student image url
               this.$axios
            .$post(`${baseUrl}/api/student/create`, payload.data)
            .then((response) => {
                commit("pushData", {itemsName:"students",data:response.data});
                dispatch('settings/setLoading',{loading:false,message:''},{root:true});
                dispatch('settings/setRedirect',true,{root:true});
            });
            });

        },

        //subjects
        addSubject({dispatch,commit},payload){
            dispatch('settings/setLoading',{loading:true,message:'adding Subject'},{root:true});
            this.$axios
            .$post(`${baseUrl}/api/subject/create`, payload)
            .then((response) => {
                dispatch('settings/setLoading',{loading:false,message:''},{root:true});
                commit("pushData", {itemsName:"subjects",data:response});
              
            }).catch(err=>{
                console.log(err)
            })
        },
        updateSubject({dispatch,commit},payload){
            dispatch('settings/setLoading',{loading:true,message:'Updating'},{root:true});
            this.$axios
            .$post(`${baseUrl}/api/subject/update/${payload._id}`, payload.data)
            .then((response) => {
                dispatch('settings/setLoading',{loading:false,message:''},{root:true});
              
            }).catch(err=>{
                console.log(err)
            })
        },
        deleteSubject({dispatch,commit},payload){
            this.$axios
            .$post(`${baseUrl}/api/subject/delete/${payload._id}`)
            .then((res) => {
                //commit("pushTodepartment",res.data);
            }).catch(err=>{
                console.log(err)
            })
        },

        addClass({dispatch,commit},payload){
            this.$axios
            .$post(`${baseUrl}/api/classes/create`, payload)
            .then((res) => {
                commit("pushData", {itemsName:"classes",data:response});
            }).catch(err=>{
                console.log(err)
            })
        },
        getClasses({dispatch,commit }, payload) {
            dispatch('settings/setLoading',{loading:true,message:''},{root:true});
            let token = payload;
            this.$axios
             .$get(`${baseUrl}/api/classes/getClasses`, {
                headers: {
                  authtoken: token,
                },
              })
              .then((response) => {
                commit("setData", {itemsName:"classes",data:response});
                dispatch('settings/setLoading',{loading:false,message:''},{root:true});
              })
          },
        getStaff({dispatch,commit }, payload) {
            dispatch('settings/setLoading',{loading:true,message:''},{root:true});
            let token = payload;
            this.$axios
             .$get(`${baseUrl}/api/staff/getStaff`, {
                headers: {
                  authtoken: token,
                },
              })
              .then((response) => {
                commit("setData", {itemsName:"staff",data:response});
                dispatch('settings/setLoading',{loading:false,message:''},{root:true});
              })
          },
           //get single staff by id
        getStaffById({dispatch,commit }, payload) {
            dispatch('settings/setLoading',{loading:true,message:''},{root:true});
            let token = payload;
            this.$axios
               .$get(`${baseUrl}/api/staff/get/${payload}`, {
                headers: {
                    authtoken: token,
                },
                })
                .then((response) => {
                commit("setData", {itemsName:"st",data:response});
                dispatch('settings/setLoading',{loading:false,message:''},{root:true});
                })
        },
        //get department 
        getdepartments({dispatch,commit }, payload) {
            dispatch('settings/setLoading',{loading:true,message:''},{root:true});
            let token = payload;
            this.$axios
             .$get(`${baseUrl}/api/department/getDepartments`, {
                headers: {
                  authtoken: token,
                },
              })
              .then((response) => {
                commit("setData", {itemsName:"departments",data:response});
                dispatch('settings/setLoading',{loading:false,message:''},{root:true});
              })
          },

          //subjects
          getSubjects({dispatch,commit }, payload) {
            dispatch('settings/setLoading',{loading:true,message:''},{root:true});
            let token = payload;
            this.$axios
             .$get(`${baseUrl}/api/subject/getSubjects`, {
                headers: {
                  authtoken: token,
                },
              })
              .then((response) => {
                commit("setData", {itemsName:"subjects",data:response});
                dispatch('settings/setLoading',{loading:false,message:''},{root:true});
              })
          },

          //get students 
        getStudents({dispatch,commit }, payload) {
            dispatch('settings/setLoading',{loading:true,message:''},{root:true});
            let token = payload;
            this.$axios
             .$get(`${baseUrl}/api/student/getStudents`, {
                headers: {
                  authtoken: token,
                },
              })
              .then((response) => {
                commit("setData", {itemsName:"students",data:response});
                dispatch('settings/setLoading',{loading:false,message:''},{root:true});
              })
          },
        //get single student
        getStudent({dispatch,commit }, payload) {
            dispatch('settings/setLoading',{loading:true,message:''},{root:true});
            let token = payload;
            this.$axios
                .$get(`${baseUrl}/api/student/get/${payload}`, {
                headers: {
                    authtoken: token,
                },
            })
            .then((response) => {
                commit("setData", {itemsName:"student",data:response});
                dispatch('settings/setLoading',{loading:false,message:''},{root:true});
            })
        },
    };
    export const getters= { 
        getStudents(state){
            return state.students;
        },
        getStudent(state){
            return state.student;
        },
        getDepartments(state){
            return state.departments;
        },  
        getStaff(state){
            return state.staff;
        },
        getSubjects(state){
            return state.subjects;
        },
        getStaffById:(state) => (id) => {
            return state.staff.find((st) => st._id === id);
        },
        baseUrl(){
            return baseUrl
        },
        getTeachers(state){
           let teachers = state.staff.map((staff) => {
                return {...staff, roles: staff.roles.filter((role) => role.role === "Teacher")}
            })
            return teachers
        },
        clases(state){
            return state.classes
        }
    }
  
