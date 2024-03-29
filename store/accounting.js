import { baseUrl } from "./base";
export const state = () => ({
        fees:[],
        feesTypes:[],
        unpainFees:[],
        invoice:[],
        salaries:[],
        unpaidSalaries:[],
        lones:[],
        studentBills:null,
        allStudentBills:null
     });
export const  mutations= { 
        setData(state,payload){
            state[payload.itemsName]=payload.data
        }, 
        pushData(state,payload){
            state[payload.itemsName].push(payload.data)
        },
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
     export const    actions= {  
       
        acceptPayment({dispatch,commit,rootState },payload){
            dispatch('settings/setLoading',{loading:true,message:'Processing'},{root:true});
            let id=payload._id
            let token = rootState.account.authToken;
            console.log(token)
            this.$axios
            .$post(`${baseUrl}/api/billing/payment/${id}`, payload,{
                headers: {
                  authtoken: token,
                },
              })
            .then((response) => {
                //commit("pushData", {itemsName:"staff",data:response});
                console.log(response)
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
                //ommit("pushData", {itemsName:"staff",data:response});
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
        addFees({dispatch,commit}, payload) {
            dispatch('settings/setLoading',{loading:false,message:'Getting Fees'},{root:true});
            this.$axios
             .$post(`${baseUrl}/api/fees/create`,payload)
              .then((response) => {
                commit("pushData", {itemsName:"fees",data:response});
                dispatch('settings/setLoading',{loading:false,message:''},{root:true});
              })
          },
        getFees({dispatch,commit}, payload) {
            dispatch('settings/setLoading',{loading:false,message:'Getting Fees'},{root:true});
            let token = payload;
            this.$axios
             .$get(`${baseUrl}/api/fees/getFeess`, {
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
          updateFee({dispatch,commit}, payload) {
            dispatch('settings/setLoading',{loading:false,message:'Getting Fees'},{root:true});
            
            this.$axios
             .$post(`${baseUrl}/api/fees/update/${payload._id}`,payload)
              .then((response) => {
                commit("updateItem", {itemsName:"fees",data:response});
                commit('feesTypes', response)
                dispatch('settings/setLoading',{loading:false,message:''},{root:true});
              })
          },
          deleteFee({dispatch,commit}, payload) {
            dispatch('settings/setLoading',{loading:false,message:'removing Fee'},{root:true});
            this.$axios
             .$post(`${baseUrl}/api/fees/delete/${payload._id}`)
              .then((response) => {
                commit("removeItem", {itemsName:"fees",data:payload});
                commit('feesTypes', response)
                dispatch('settings/setLoading',{loading:false,message:''},{root:true});
              })
          },
        
        getStudentsBills({dispatch,commit }, id) {
            let token = "payload";
            this.$axios
               .$get(`${baseUrl}/api/billing/getStudentsBills`, {
                headers: {
                    authtoken: token,
                },
                })
                .then((response) => {
                commit("setData", {itemsName:"allStudentBills",data:response});
                })
        },
        getStudentBills({dispatch,commit},payload) {
            let token=""
            this.$axios
               .$get(`${baseUrl}/api/billing/get/student/${payload}`, {
                headers: {
                    authtoken: token,
                },
                })
                .then((response) => {
                commit("setData", {itemsName:"studentBills",data:response});
                })
        },
        assignFee({dispatch,commit }, payload) {
            dispatch('settings/setLoading',{loading:true,message:'Assigning....'},{root:true});
            this.$axios
             .$post(`${baseUrl}/api/billing/assign`,payload)
            .then((response) => {
                dispatch('settings/setLoading',{loading:false,message:''},{root:true});
            }).catch(err=>{
                //throw error
                dispatch('settings/setLoading',{loading:false,message:''},{root:true});
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
        allStudentBills(state){
            return state.allStudentBills
        }
        
    }
  
