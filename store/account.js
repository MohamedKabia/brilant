import { baseUrl } from "./base";
let userType 
export const state = () => ({
    user:null,
    authToken:null,
    isStudent:false,
    isStaff:false,
    isParent:false,
});
export const  mutations= { 
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
};
export const   actions= {  
    studentLogin({dispatch, commit},payload){
        this.$axios.$post(`${baseUrl}/api/auth/student/login`, payload)
        .then((res) => {
            commit("setAuthToken",res);
            userType='student';
            dispatch("getUser",res.data)
        });
    },
    
    staffLogin({dispatch, commit},payload){
        this.$axios.$post(`${baseUrl}/api/auth/staff/login`, payload)
        .then((res) => {
            commit("setAuthToken",res);
            userType='staff';
            console.log(res)
            dispatch("getUser",res)
        });
    },

    parentLogin({dispatch, commit},payload){
        this.$axios.$post(`${baseUrl}/api/auth/parent/login`, payload)
        .then((res) => {
            commit("setAuthToken",res);
            userType='parent';
            console.log(res)
            dispatch("getUser",res)
        });
    },
    logout({dispatch, commit}){
        window.localStorage.removeItem("authToken");
        commit("setAuthToken", null);
        commit("setUser", null);
    },

    //verify local store token
    verifyToken({ dispatch, commit }, payload){
        userType=payload.userType;
        dispatch("getUser",payload.token)
    },
    //get user 
    getUser({ dispatch, commit }, payload) {
        let token = payload;
        this.$axios
            .$get(`${baseUrl}/api/${userType}/verify`, {
            headers: {
                authtoken: token,
            },
            })
            .then((response) => {
            commit("setAuthToken", token);
            commit("setUser", response);
            if(userType=='staff'){
                dispatch('management/getdepartments',token,{root:true});
                dispatch('management/getStudents',token,{root:true});
                dispatch('management/getStaff',token,{root:true});
                dispatch('management/getSubjects',token,{root:true});

                dispatch('settings/getlevels',token,{root:true});
                dispatch('settings/getPrograms',token,{root:true})

                dispatch('accounting/getFees',token,{root:true});

            }
            })
            .catch((error) => {
            // commit("setLoading", false);
            });
        },
};
export const getters= { 
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
  
