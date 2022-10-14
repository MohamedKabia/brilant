import { management } from './management';
import {student} from "./student/index";
import {account} from "./account/index"
import { settings } from './settings';
import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
uuVue.config.devtools = true

 new Vuex.Store({
    modules:{
        student,
        account,
        manage:management,
        settings
    }
})


