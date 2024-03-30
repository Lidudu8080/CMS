import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)



// 实例
const store = new Vuex.Store({
    state: {
        //组件是否正在被拖动
        dragActive: false,
        //被拖动的组件信息
        dragComponent: {}
    },
    mutations: {
        // 设置组件拖拽状态
        SET_DRAG_STATE(state, value) {
            state.dragActive = value
        },
        // 设置当前正在拖动的组件对象
        SET_DRAG_COMPONENT(state, value) {
            state.dragComponent = value
        }
    },
    actions: {},
    getters: {}
})





Vue.store = store
export default store