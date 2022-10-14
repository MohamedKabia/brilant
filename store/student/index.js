import { baseUrl } from "../base";
export const student = {
    namespaced: true,
    state: () => ({ 
        user:{
            name:"medvik",
            email:"kabiam@mail/com"
        },
        authToken:null,
     }),
    mutations: {  },
    actions: {  

    },
    getters: { 
        getUser(state){
            console.log(baseUrl);
            return state.user;
        }, 
     }
  }
