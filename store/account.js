import { baseUrl } from "./base";
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
            let authToken={
                token:payload,
                userType:'staff'
            }
            authToken =JSON.stringify(authToken)
            window.localStorage.setItem("authToken", authToken);
        
    },
    setUser(state, payload){
        state.user=payload;
    },

    pushData(state,payload){
        state[payload.itemsName].push(payload.data)
    },
    setData(state,payload){
        state[payload.itemsName]=payload.data
    }, 
};
export const   actions= {  
    studentLogin({dispatch, commit},payload){
        this.$axios.$post(`${baseUrl}/api/auth/student/login`, payload)
        .then((res) => {
            commit("setAuthToken",res);
            dispatch("getUser",res.data)
        });
    },
    
    staffLogin({dispatch, commit},payload){
        this.$axios.$post(`${baseUrl}/api/auth/staff/login`, payload)
        .then((res) => {
            commit("setAuthToken",res);
            dispatch("getUser",res)
        });
    },

    parentLogin({dispatch, commit},payload){
        this.$axios.$post(`${baseUrl}/api/auth/parent/login`, payload)
        .then((res) => {
            commit("setAuthToken",res);
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
        dispatch("getUser",payload.token)
    },
    //get user 
    getUser({ dispatch, commit }, payload) {
        let token = payload;
        this.$axios
            .$get(`${baseUrl}/api/staff/verify`, {
            headers: {
                authtoken: token,
            },
            })
            .then((response) => {
            commit("setAuthToken", token);
            commit("setUser", response);
            dispatch('school/getSchools',token,{root:true});

            //get all data if base role is admin
            if(response.role =='Admin'){
                dispatch('management/getdepartments',token,{root:true});
                dispatch('management/getStudents',token,{root:true});
                dispatch('management/getStaff',token,{root:true});
                dispatch('management/getSubjects',token,{root:true});
                dispatch('settings/getlevels',token,{root:true});
                dispatch('settings/getPrograms',token,{root:true});
                dispatch('accounting/getFees',token,{root:true});
            }
            })
            .catch((error) => {
            // commit("setLoading", false);
            $nuxt.$router.push('/login');
            });
    },
    getData({ dispatch, commit,state,rootState }, payload) {
        let token = state.authToken
        let school = rootState.school.school

        //general daters
        dispatch('settings/getlevels',token,{root:true});
        dispatch('settings/getPrograms',token,{root:true});
        dispatch('school/getSchools',token,{root:true});
        //get data based on staff roles 
            if( school.roles.includes('Admin')){
                dispatch('management/getdepartments',token,{root:true});
                dispatch('management/getStudents',token,{root:true});
                dispatch('management/getStaff',token,{root:true});
                dispatch('management/getSubjects',token,{root:true});
                
                dispatch('accounting/getFees',token,{root:true});
            }else if(school.roles.includes('Staff')){
                //do something
            }
           
            //$nuxt.$router.push('/');
            
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
  
