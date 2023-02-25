import { baseUrl } from "./base";
export const state = () => ({
        fees:[],
        feesTypes:[],
        unpainFees:[],
        invoice:[],
        salaries:[],
        unpaidSalaries:[],
        lones:[],
        studentBills:null
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
       
        acceptPayment({dispatch,commit},payload){
            dispatch('settings/setLoading',{loading:true,message:'Processing'},{root:true});
            let id=payload._id
            this.$axios
            .$post(`${baseUrl}/api/billing/payment/${id}`, payload.data)
            .then((response) => {
                commit("pushData", {itemsName:"staff",data:response});
                dispatch('settings/setLoading',{loading:false,message:''},{root:true});
                dispatch('settings/setRedirect',true,{root:true});
            });
        },
        updatePayment({dispatch,commit},payload){
            dispatch('settings/setLoading',{loading:false,message:'Processing......'},{root:true});
            let id=payload._id
            this.$axios
            .$post(`${baseUrl}/api/billing/update/${id}`, payload.data)
            .then((response) => {
                //commit("pushData", {itemsName:"staff",data:response});
                dispatch('settings/setLoading',{loading:false,message:''},{root:true});
                dispatch('settings/setRedirect',true,{root:true});
            });
        },
        deletePayment({dispatch,commit},payload){
            let id=payload._id
            this.$axios
            .$post(`${baseUrl}/api/billing/delete/${id}`, payload.data)
            .then((response) => {
                //commit("pushData", {itemsName:"staff",data:response});
            });
        },

        getFees({dispatch,commit}, payload) {
            dispatch('settings/setLoading',{loading:false,message:'Getting Fees'},{root:true});
            let token = payload;
            this.$axios
             .$get(`${baseUrl}/api/billing/getStudentsBill`, {
                headers: {
                  authtoken: token,
                },
              })
              .then((response) => {
                commit("setData", {itemsName:"fees",data:response});
                commit('feesTypes', response)
                dispatch('settings/setLoading',{loading:false,message:''},{root:true});
              })
          },

        getStudentBills({dispatch,commit }, id) {
            let token = "payload";
            this.$axios
               .$get(`${baseUrl}api/billing/get/student/${id}`, {
                headers: {
                    authtoken: token,
                },
                })
                .then((response) => {
                commit("setData", {itemsName:"studentBills",data:response});
                })
        },
  
    };
    export const getters= { 
        studentBills(state){
            return state.studentBills
        },
        Fees(state){
            return state.fees;
        },
        feesTypes(state){
            return state.feesTypes;
        },
    }
  
