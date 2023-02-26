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
        setData(state,payload){
            state[payload.itemsName]=payload.data
        }, 
       
        pushData(state,payload){
            state[payload.itemsName].push(payload.data)
        },
    
        //general update
        updateItem(state,payload){
            let itemName=payload.itemsName
            let item=  state[itemName].find(item=>{
                return item._id== payload.data._id
            });
            let i =state[itemName].indexOf(item);
            state[itemName].splice(i, 1)
            state[itemName].push(payload.data)
        },
        removeItem(state,payload){
            let items=payload.itemsName
            let a=  state[items].find(item=>{
                return item._id== payload.data._id
            });
            let i =state[items].indexOf(a);
            state[items].splice(i, 1)
        },
     };

export const actions= {  
    addLevels({commit},payload){
        this.$axios
        .$post(`${baseUrl}/api/level/create`, payload)
        .then((res) => {
            commit("pushData",{data:res, levels:'programs'});
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
            commit("updateItem",{data:res, itemsName:"levels"});
        }).catch(err=>{
            console.log(err)
        })
    },
    updateProgram({commit},payload){
        this.$axios
        .$post(`${baseUrl}/api/programs/update/${payload._id}`, payload.data)
        .then((res) => {
            commit("updateItem",{data:res, itemsName:"programs"});
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
            commit("setData", {itemsName:"levels",data:response});
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
            commit("setData", {itemsName:"programs",data:response});
            })
            .catch((err) => {
            console.log("programs error", err)
            });
        },

        setLoading({commit},payload){
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
  
