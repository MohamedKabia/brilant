import { baseUrl } from "./base";

export const state = () => ({
        levels:[],
        programs:[],
        loading:{
            loading:false,
            message:""
        },
        redirect:false,
     });
 
export const mutations= { 
        setLoading(state, payload){
            state.loading=payload;
        },
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
     };

export const actions= {  
    addLevels({commit},payload){
        this.$axios
        .$post(`${baseUrl}/api/level/create`, payload)
        .then((res) => {
            commit("pushToLevels",res.data);
        }).catch(err=>{
            console.log(err)
        })
    },

    addPrograms({commit},payload){
        this.$axios
        .$post(`${baseUrl}/api/programs/create`, payload)
        .then((res) => {
            commit("pushData",{data:res, itemsName:'programs'});
        }).catch(err=>{
            console.log(err)
        })
    },
    updateLevel({commit},payload){
        this.$axios
        .$post(`${baseUrl}/api/level/update/${payload._id}`, payload)
        .then((res) => {
            commit("updateItem",{data:payload, itemNmae:"levels"});
        }).catch(err=>{
            console.log(err)
        })
    },
    updateProgram({commit},payload){
        this.$axios
        .$post(`${baseUrl}/api/programs/update/${payload._id}`, payload)
        .then((res) => {
            commit("updateItem",{data:payload, itemNmae:"programs"});
        }).catch(err=>{
            console.log(err)
        })
    },

    //get levels 
    getlevels({commit }, payload) {
        let token = payload;
        this.$axios
            .$get(`${baseUrl}/api/level/getLevels`, {
            headers: {
                authtoken: token,
            },
            })
            .then((response) => {
            commit("setLevels", response);
            })
            .catch((err) => {
            console.log("levels error", err)
            });
        },

        getPrograms({commit }, payload) {
        let token = payload;
        this.$axios
            .$get(`${baseUrl}/api/programs/getprograms`, {
            headers: {
                authtoken: token,
            },
            })
            .then((response) => {
            commit("setPrograms", response);
            })
            .catch((err) => {
            console.log("programs error", err)
            });
        },

        setLoading({commit},payload){
            console.log("loading=====");
            commit("setLoading",payload)
         },
         setRedirect({commit},payload){
             commit("setRedirect",payload)
         }
    };
export const  getters= { 
    getPrograms(state){
        return state.programs;
    },
    getlevels(state){
        return state.levels;
    },  
    loading(state){
        return state.loading;
    },
    getRedirect(state){
        return state.redirect
    }
}
  
