import { baseUrl } from "./base";
export const state = () => ({
        departments:[],
        teachers:[],
        students:[],
        staff:[],
        st:null,
        student:null,
        subjects:[],
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
        addDepartment({commit},payload){
            this.$axios
            .$post(`${baseUrl}/api/department/create`, payload)
            .then((res) => {
                commit("pushTodepartment",res.data);
            }).catch(err=>{
                console.log(err)
            })
        },
        updateDepartment({commit},payload){
            this.$axios
            .$post(`${baseUrl}/api/department/update/${payload._id}`, payload)
            .then((res) => {
                commit("updateItem",{data:payload, itemNmae:"departments"});
            }).catch(err=>{
                console.log(err)
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

        addStudent({commit},payload){
            this.$axios
            .$post(`${baseUrl}/api/student/create`, payload)
            .then((response) => {
                commit("pushData", {itemsName:"students",data:response});
              
            }).catch(err=>{
                console.log(err)
            })
        },

        //subjects
        addSubject({commit},payload){
            this.$axios
            .$post(`${baseUrl}/api/subject/create`, payload)
            .then((response) => {
                commit("pushData", {itemsName:"subjects",data:response});
              
            }).catch(err=>{
                console.log(err)
            })
        },
        updateSubject({commit},payload){
            this.$axios
            .$post(`${baseUrl}/api/subject/update/${payload._id}`, payload)
            .then((response) => {
                //commit("pushData", {itemsName:"subjects",data:response});
              
            }).catch(err=>{
                console.log(err)
            })
        },

       

        getStaff({commit }, payload) {
            let token = payload;
            this.$axios
             .$get(`${baseUrl}/api/staff/getStaff`, {
                headers: {
                  authtoken: token,
                },
              })
              .then((response) => {
                commit("setData", {itemsName:"staff",data:response});
              })
          },
           //get single staff by id
        getStaffById({commit }, payload) {
            let token = payload;
            this.$axios
               .$get(`${baseUrl}/api/staff/get/${payload}`, {
                headers: {
                    authtoken: token,
                },
                })
                .then((response) => {
                commit("setData", {itemsName:"st",data:response});
                })
        },
        //get department 
        getdepartments({commit }, payload) {
            let token = payload;
            this.$axios
             .$get(`${baseUrl}/api/department/getDepartments`, {
                headers: {
                  authtoken: token,
                },
              })
              .then((response) => {
                commit("setData", {itemsName:"departments",data:response});
              })
          },

          //subjects
          getSubjects({commit }, payload) {
            let token = payload;
            this.$axios
             .$get(`${baseUrl}/api/subject/getSubjects`, {
                headers: {
                  authtoken: token,
                },
              })
              .then((response) => {
                commit("setData", {itemsName:"subjects",data:response});
              })
          },

          //get students 
        getStudents({commit }, payload) {
            let token = payload;
            this.$axios
             .$get(`${baseUrl}/api/student/getStudents`, {
                headers: {
                  authtoken: token,
                },
              })
              .then((response) => {
                console.log(response)
                commit("setData", {itemsName:"students",data:response});
              })
          },
        //get single student
        getStudent({commit }, payload) {
        let token = payload;
        this.$axios
            .$get(`${baseUrl}/api/student/get/${payload}`, {
            headers: {
                authtoken: token,
            },
            })
            .then((response) => {
            commit("setData", {itemsName:"student",data:response});
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
        }
    }
  
