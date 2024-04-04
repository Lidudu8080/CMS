import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'


import { Messager, createRandomId } from '@/utils'
import settings from '@/config'

// 创建跨源实例对象
const messager = new Messager(settings.decorateOrigin)

Vue.use(Vuex)

const modulesFiles = require.context('./modules', true, /\.js$/)


let modules = modulesFiles.keys().reduce((modules, modulePath) => {
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
    const value = modulesFiles(modulePath)
    modules[moduleName] = value.default
    return modules
}, {})

modules = Object.assign({}, modules)

// 搭建页面初始化数据
const emptyPageData = {
    id: '',
    name: '页面标题',
    shareDesc: '',
    shareImage: '',
    backgroundColor: '',
    backgroundImage: '',
    backgroundPosition: 'top',
    cover: '',
    componentList: []
}

const store = new Vuex.Store({
    state: {
        setType: 1, //1页面2组件内容
        dialogImageVisible: false,
        upLoadImgSuccess: null,
        pageData: JSON.parse(JSON.stringify(emptyPageData)),
        activeComponentId: null,
        dragActive: false,  //是否被拖动
        dragComponent: {},  //被拖动对象
        addComponentIndex: null,  //要添加的目标位置
        previewHeight: '',
        componentsTopList: '',
        wxParams: JSON.stringify({ isLogin: true }) // h5参数
    },
    getters,
    mutations: {
        SET_INIT_PAGE_DATA(state) {
            state.pageData = JSON.parse(JSON.stringify(emptyPageData))
        },
        // 修改tab切换页面/组件
        SET_SETTYPE(state, value) {
            state.setType = value
        },
        // 修改h5页面配置
        SET_PAGE_CONFIG(state, config) {
            Object.keys(config).forEach(item => {
                state.pageData[item] = config[item]
            })
            this.commit('VIEW_UPDATE', true)
        },
        // 修改上传图片模态框是否显示
        SET_UPIMAGE_VISIBLE(state, value) {
            state.dialogImageVisible = value
        },
        // 修改上传图片成功的回调事件
        SET_UPIMAGE_FUC(state, value) {
            state.upLoadImgSuccess = value
        },
        // 修改组件拖放状态（当前是否正在拖动左侧组件到页面中）
        SET_DRAG_STATE(state, value) {
            state.dragActive = value
        },
        // 设置当前正在拖动的组件对象
        SET_DRAG_COMPONENT(state, value) {
            state.dragComponent = value
        },
        // 设置拖动的组件要添加到的位置
        SET_DRAG_INDEX(state, value) {
            state.addComponentIndex = value
        },
        // 设置当前选中的组件id
        SET_ACTIVE_ID(state, value) {
            state.activeComponentId = value
        },
        // 页面新增组件方法
        ADD_COMPONENT(state, { index, data }) {
            const component = JSON.parse(JSON.stringify(data))
            const id = component.data.component + '-' + createRandomId()
            component.id = id
            if (component.iconClass) { delete component.iconClass }
            state.pageData.componentList.splice(index, 0, component)
            this.commit('SET_ACTIVE_ID', id)
            this.commit('VIEW_SET_ACTIVE', id)
            this.commit('SET_SETTYPE', 2)
            this.commit('SET_DRAG_INDEX', null)
        },
        // 页面删除组件方法
        DELETE_COMPONENT(state, { index }) {
            // 清空所有组件
            if (index === 'all') {
                state.pageData.componentList = []
            } else if (typeof index === 'number') {
                // 删除单个组件
                state.pageData.componentList.splice(index, 1)
            }
        },
        // 页面编辑组件方法
        EDIT_COMPONENT(state, { id, data }) {
            const component = state.pageData.componentList.find(item => item.id === id)
            if (component) component.data = data
        },
        // 页面更新方法
        UPDATE_COMPONENT(state, { data }) {
            state.pageData = data || {}
        },
        // 获取H5组件高度并更新
        UPDATE_PAGE_HEIGHT(state, { height, list }) {
            state.previewHeight = height
            state.componentsTopList = list
        },
        // 向H5页面发送更改后的数据
        // disabledRestHeight: 是否将h5组件高度更新到cms
        VIEW_UPDATE(state, disabledRestHeight = false) {
            messager.emit('pageChange', {
                disabledRestHeight,
                value: state.pageData
            })
        },
        // 向H5页面发送预添加组件
        VIEW_ADD_PREVIEW(state, index) {
            messager.emit('setPreview', index)
        },
        // 向H5页面发送删除预添加组件
        VIEW_DELETE_PREVIEW() {
            messager.emit('deletePreview')
        },
        // 向H5页面发送选中指定项
        VIEW_SET_ACTIVE(state, id) {
            messager.emit('setActive', id)
        }
    },
    actions: {
        reLogin(context) {
            window.localStorage.setItem('design-editor-cache-' + context.state.pageData.pageId, JSON.stringify(context.state.pageData.componentList))
            window.location.href = window.location.origin + '/vendor/tologin'
        },
        // 搭建页面数据变化时调用方法 - 将更改后的数据发送到H5
        pageChange({ commit }, changeValue) {
            const commitObj = {
                add: 'ADD_COMPONENT', // 新增组件
                delete: 'DELETE_COMPONENT', // 删除组件
                edit: 'EDIT_COMPONENT', // 编辑组件
                update: 'UPDATE_COMPONENT' // 更新页面
            }
            commitObj[changeValue.type] && commit(commitObj[changeValue.type], changeValue)
            commit('VIEW_UPDATE')
        },
        // h5页面数据监听
        initMessage({ commit }) {
            // 监听高度变化
            messager.on('pageHeightChange', data => {
                let height = data.height ? data.height + 72 : 768
                let list = data.componentsTopList || []
                commit('UPDATE_PAGE_HEIGHT', { height, list })
            })
            // 监听数据变化
            messager.on('pageChange', data => {
                commit('UPDATE_COMPONENT', { data })
            })
            // 监听选中项id变化
            messager.on('setActive', id => {
                commit('SET_ACTIVE_ID', id)
                commit('SET_SETTYPE', 2)
            })
        }
    },
    modules
})

Vue.store = store

export default store
