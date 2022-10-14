import { baseUrl } from "../base";
import axios from "axios";

let userType 
export const account = {
    namespaced: true,
    state: () => ({ 
        user:null,
        authToken:null,
        isStudent:false,
        isStaff:false,
        isParent:false,
     }),
    mutations: { 
        setAuthToken(state, payload){
            state.authToken=payload;
            if(userType=='student'){
                state.isStudent=true;
                let authToken={
                    token:payload,
                    userType:'student'
                }
                authToken =JSON.stringify(authToken)
                window.localStorage.setItem("authToken", authToken);
            }
            else if(userType=='staff'){
                state.isStaff=true;
                let authToken={
                    token:payload,
                    userType:'staff'
                }
                authToken =JSON.stringify(authToken)
                window.localStorage.setItem("authToken", authToken);
            }else{
                state.isParent=true; 
                let authToken={
                    token:payload,
                    userType:'parent'
                }
                authToken =JSON.stringify(authToken)
                window.localStorage.setItem("authToken", authToken);
            }
        },
        setUser(state, payload){
            state.user=payload;
        }
     },
    actions: {  
        studentLogin({dispatch, commit},payload){
            axios
            .post(`${baseUrl}/api/auth/student/login`, payload)
            .then((res) => {
                commit("setAuthToken",res.data);
                userType='student';
                dispatch("getUser",res.data)
            });
        },
        
        staffLogin({dispatch, commit},payload){
            axios
            .post(`${baseUrl}/api/auth/staff/login`, payload)
            .then((res) => {
                commit("setAuthToken",res.data);
                userType='staff';
                dispatch("getUser",res.data)
            });
        },

        parentLogin({dispatch, commit},payload){
            axios
            .post(`${baseUrl}/api/auth/parent/login`, payload)
            .then((res) => {
                commit("setAuthToken",res.data);
                userType='parent';
                dispatch("getUser",res.data)
            });
        },

        //verify local store token
        verifyToken({ dispatch, commit }, payload){
            userType=payload.userType;
            dispatch("getUser",payload.token)
        },
        //get user 
        getUser({ dispatch, commit }, payload) {
            let token = payload;
            axios
              .get(`${baseUrl}/api/${userType}/verify`, {
                headers: {
                  authtoken: token,
                },
              })
              .then((response) => {
                commit("setAuthToken", token);
                commit("setUser", response.data);
                if(userType=='staff'){
                    dispatch('manage/getdepartments',token,{root:true});
                    dispatch('manage/getStudents',token,{root:true});
                    dispatch('manage/getStaff',token,{root:true});
                    dispatch('manage/getSubjects',token,{root:true});

                    dispatch('settings/getlevels',token,{root:true});
                    dispatch('settings/getPrograms',token,{root:true})
                }
              })
              .catch((error) => {
               // commit("setLoading", false);
              });
          },
    },
    getters: { 
        getUser(state){
            return state.user;
        },
        getAuthToken(state){
            return state.authToken;
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
