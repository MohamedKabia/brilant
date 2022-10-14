import { baseUrl } from "../base";
import axios from "axios";

export const settings = {
    namespaced: true,
    state: () => ({ 
        levels:null,
        programs:null,
        staff:null,
     }),
    mutations: { 
        pushToLevels(state, payload){
           state.levels.push(payload)
        },
        pushData(state,payload){
            state[payload.itemsName].push(payload.data)
            console.log(state.items)
        },
        setPrograms(state, payload){
            state.programs=payload;
        },
        pushToprograms(state, payload){
            state.student.push(payload);
        },

        pushToStaff(state, payload){
            state.staff.push(payload);
        },
       
        setLevels(state,payload){
            state.levels=payload
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
     },
    actions: {  
        addLevels({commit},payload){
            axios
            .post(`${baseUrl}/api/level/create`, payload)
            .then((res) => {
                commit("pushToLevels",res.data);
            }).catch(err=>{
                console.log(err)
            })
        },

        addPrograms({commit},payload){
            axios
            .post(`${baseUrl}/api/programs/create`, payload)
            .then((res) => {
                commit("pushData",{data:res.data, itemsName:'programs'});
            }).catch(err=>{
                console.log(err)
            })
        },
        updateLevels({commit},payload){
            axios
            .post(`${baseUrl}/api/level/update/${payload._id}`, payload)
            .then((res) => {
                commit("updateItem",{data:payload, itemNmae:"levels"});
            }).catch(err=>{
                console.log(err)
            })
        },
        updateProgram({commit},payload){
            axios
            .post(`${baseUrl}/api/programs/update/${payload._id}`, payload)
            .then((res) => {
                commit("updateItem",{data:payload, itemNmae:"programs"});
            }).catch(err=>{
                console.log(err)
            })
        },
        
       

      

        //get levels 
        getlevels({commit }, payload) {
            let token = payload;
            axios
              .get(`${baseUrl}/api/level/getLevels`, {
                headers: {
                  authtoken: token,
                },
              })
              .then((response) => {
                commit("setLevels", response.data);
              })
              .catch((err) => {
               console.log("levels error", err)
              });
          },

          getPrograms({commit }, payload) {
            let token = payload;
            axios
              .get(`${baseUrl}/api/programs/getprograms`, {
                headers: {
                  authtoken: token,
                },
              })
              .then((response) => {
                commit("setPrograms", response.data);
              })
              .catch((err) => {
               console.log("programs error", err)
              });
          },
    },
    getters: { 
        getPrograms(state){
            return state.programs;
        },
        getlevels(state){
            return state.levels;
        },  
        isStudent(state){
            return state.isStudent
        },
        isStaff(state){
            return state.isStaff
        },
        isParent(state){
            return state.isParent
        },
        isAdmin(state){
            return state.isAdmin
        },
     }
  }
