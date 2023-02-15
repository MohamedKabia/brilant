import { baseUrl } from "./base";
export const state = () => ({
        schools:[],
        school:null,
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
        },

        feesTypes(state,payload){
            payload.forEach(fees => {
                
            });
        }
     };
     export const    actions= {  
       
        getSchools({commit},payload){
            let id=payload._id
            this.$axios
            .$get(`${baseUrl}/api/school/get`)
            .then((response) => {
                commit("setData", {itemsName:"schools",data:response});
            });
        },
       
        deleteSchool({dispatch,commit},payload){
            let id=payload._id
            this.$axios
            .$post(`${baseUrl}/api/school/delete/${id}`, payload.data)
            .then((response) => {
                //commit("pushData", {itemsName:"staff",data:response});
            });
        },

  
    };
    export const getters= { 
        schools(state){
            return state.schools
        },
        school(state){
            return state.school;
        },
    }
  
