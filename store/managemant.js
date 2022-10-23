import { baseUrl } from "./base";
//import axios from "axios";
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
            axios
            .post(`${baseUrl}/api/department/create`, payload)
            .then((res) => {
                commit("pushTodepartment",res.data);
            }).catch(err=>{
                console.log(err)
            })
        },
        updateDepartment({commit},payload){
            axios
            .post(`${baseUrl}/api/department/update/${payload._id}`, payload)
            .then((res) => {
                commit("updateItem",{data:payload, itemNmae:"departments"});
            }).catch(err=>{
                console.log(err)
            })
        },
        
        addStaff({commit},payload){
            axios
            .post(`${baseUrl}/api/staff/create`, payload)
            .then((response) => {
                commit("pushData", {itemsName:"staff",data:response.data});
            });
        },

        addStudent({commit},payload){
            axios
            .post(`${baseUrl}/api/student/create`, payload)
            .then((response) => {
                commit("pushData", {itemsName:"students",data:response.data});
              
            }).catch(err=>{
                console.log(err)
            })
        },

        //subjects
        addSubject({commit},payload){
            axios
            .post(`${baseUrl}/api/subject/create`, payload)
            .then((response) => {
                commit("pushData", {itemsName:"subjects",data:response.data});
              
            }).catch(err=>{
                console.log(err)
            })
        },

       

        getStaff({commit }, payload) {
            let token = payload;
            axios
              .get(`${baseUrl}/api/staff/getStaff`, {
                headers: {
                  authtoken: token,
                },
              })
              .then((response) => {
                commit("setData", {itemsName:"staff",data:response.data});
              })
          },
           //get single staff by id
        getStaffById({commit }, payload) {
            let token = payload;
            axios
                .get(`${baseUrl}/api/staff/get/${payload}`, {
                headers: {
                    authtoken: token,
                },
                })
                .then((response) => {
                commit("setData", {itemsName:"st",data:response.data});
                })
        },
        //get department 
        getdepartments({commit }, payload) {
            let token = payload;
            axios
              .get(`${baseUrl}/api/department/getDepartments`, {
                headers: {
                  authtoken: token,
                },
              })
              .then((response) => {
                commit("setData", {itemsName:"departments",data:response.data});
              })
          },

          //subjects
          getSubjects({commit }, payload) {
            let token = payload;
            axios
              .get(`${baseUrl}/api/subject/getSubjects`, {
                headers: {
                  authtoken: token,
                },
              })
              .then((response) => {
                commit("setData", {itemsName:"subjects",data:response.data});
              })
          },

          //get students 
        getStudents({commit }, payload) {
            let token = payload;
            axios
              .get(`${baseUrl}/api/student/getStudents`, {
                headers: {
                  authtoken: token,
                },
              })
              .then((response) => {
                commit("setData", {itemsName:"students",data:response.data});
              })
          },
        //get single student
        getStudent({commit }, payload) {
        let token = payload;
        axios
            .get(`${baseUrl}/api/student/get/${payload}`, {
            headers: {
                authtoken: token,
            },
            })
            .then((response) => {
            commit("setData", {itemsName:"student",data:response.data});
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
        getSubject(state){
            return state.subject;
        },
        getStaffById(state){
            return state.st
        }
    }
  
