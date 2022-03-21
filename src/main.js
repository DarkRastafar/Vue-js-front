import { createApp } from 'vue'
import { createStore } from 'vuex'
import { GetUsernameFromCoockies } from '@/assets/get_username_from_cookies.js'
import App from './App.vue'
import router from './router'
import Paginate from "vuejs-paginate-next";
import "@/assets/css/table.css"
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

import SetWorkStatus from '@/assets/set_work_status.js'
import SetBankButton from '@/assets/set_bank_button.js'
import SetClientsModelButton from '@/assets/setClientsModelButton.js'
import { SetValuesToRangeFilter } from '@/assets/setVariablesToOperator.js'
import { GetData } from '@/assets/FetchRequest.js'


const defaultClientType = 'novoregi'


const store = createStore({
    actions: {
        async setVariablesFromLocalStorage() {
            const SetValuesToRangeFilterInstance = new SetValuesToRangeFilter()
            SetValuesToRangeFilterInstance.set()
        },
        async getDataDRF(ctx) {
            const GetDataInstance = new GetData()
            let responseData = await GetDataInstance.returnSlice()
            let paginateData = responseData.data.body.paginate_data
            let responseBody = responseData.data.body.body
            let responseHeaders = responseData.data.headers
            let responseAdditionalComments = responseData.data.additional_comments
            let responseClientsTypeForOperators = responseData.data.clients_type_for_operators

            console.log(responseData)

            console.log(responseAdditionalComments)
            console.log(responseClientsTypeForOperators)

            ctx.commit('updatePaginateData', paginateData)
            ctx.commit('updateFirstTableHeaders', responseHeaders.first)
            ctx.commit('updateSecondTableHeaders', responseHeaders.second)
            ctx.commit('updateThirdTableHeaders', responseHeaders.third)
            ctx.commit('updateTableBody', responseBody)
            ctx.commit('updateAdditionalComments', responseAdditionalComments)
            ctx.commit('updateClientsTypeForOperators', responseClientsTypeForOperators)
            
        },
        async websocketConnect(ctx) {
            let username = new GetUsernameFromCoockies(document.cookie).returnUsername()
            let class_model = localStorage.getItem('user_class_model')

            if (class_model == null){
                class_model = defaultClientType
            }
            
            let url = `ws://localhost:8000/ws/${class_model}/${username}/`
        
            console.log('Starting connection to WebSocket Server')
            this.connection = new WebSocket(url)


            this.connection.onmessage = function (event) {
                let messageCatch = JSON.parse(event.data)
                
                if (JSON.parse(messageCatch.message).username_id !== undefined) {
                    const operator_id = JSON.parse(messageCatch.message).username_id

                    document.cookie = `username_id=${operator_id}; secure`
                    localStorage.setItem('username_id', operator_id)

                    const InstanceSetWorkStatus = new SetWorkStatus(messageCatch)
                    InstanceSetWorkStatus.setStatus()

                    const InstanceSetBankButton = new SetBankButton()
                    InstanceSetBankButton.setButtonStatus(messageCatch)

                    const InstanceSetClientsModelButton = new SetClientsModelButton()
                    InstanceSetClientsModelButton.setButtonStatus(class_model)
                }
                else if (JSON.parse(messageCatch.message).headers !== undefined) {
                    const tableHeadersMessage = JSON.parse(messageCatch.message).headers
                    const tableBodyMessage = JSON.parse(messageCatch.message).body.body
                    const additionalCommentsMessage = JSON.parse(messageCatch.message).additional_comments
                    const clientsTypeForOperatorsMessage = JSON.parse(messageCatch.message).clients_type_for_operators

                    ctx.commit('updateFirstTableHeaders', tableHeadersMessage.first)
                    ctx.commit('updateSecondTableHeaders', tableHeadersMessage.second)
                    ctx.commit('updateThirdTableHeaders', tableHeadersMessage.third)
                    ctx.commit('updateTableBody', tableBodyMessage)
                    ctx.commit('updateAdditionalComments', additionalCommentsMessage)
                    ctx.commit('updateClientsTypeForOperators', clientsTypeForOperatorsMessage)
                }
                else if (JSON.parse(messageCatch.message).statistics !== undefined) {
                    const statisticsDataMessage = JSON.parse(messageCatch.message).statistics
                    ctx.commit('updateStatisticsData', statisticsDataMessage)
                }          
            }
            
            this.connection.onopen = function (event) {
                console.log('Successfully connected to first channel websocket')
                }
            
            function connect_server() {
                let username = new GetUsernameFromCoockies(document.cookie).findUsernameString ()
                let url = `ws://localhost:8000/ws/${class_model}/${username}/`
                console.log('Starting connection to WebSocket Server')
                this.connection = new WebSocket(url);
            }

            this.connection.onclose = function (event) {
                console.log('Disconnect! Start connection')
                for (var i = 0; i < 3; i++) {
                    setTimeout( function timer(){
                        let username = new GetUsernameFromCoockies(document.cookie).returnUsername()
                        let class_model = localStorage.getItem('user_class_model')
                        let url = `ws://localhost:8000/ws/${class_model}/${username}/`

                        if (class_model == null){
                            class_model = defaultClientType
                        }

                        console.log('Starting connection to WebSocket Server')
                        this.connection = new WebSocket(url);
                    }, i*3000 );
                }
                location.reload()
            }
        }
    },
    mutations: {
        updateFirstTableHeaders (state, firstTableHeadersMessage) {
            state.firstTableHeadersArray = firstTableHeadersMessage
            
        },
        updateSecondTableHeaders (state, secondTableHeadersMessage) {
            state.secondTableHeadersArray = secondTableHeadersMessage
        },
        updateThirdTableHeaders (state, thirdTableHeadersMessage) {
            state.thirdTableHeadersArray = thirdTableHeadersMessage
        },

        updateTableBody (state, tableBodyMessage) {
            state.tableBodyArray = tableBodyMessage
        },

        updateAdditionalComments (state, additionalCommentsMessage) {
            state.additionalCommentsArray = additionalCommentsMessage
        },
        updateClientsTypeForOperators (state, clientsTypeForOperatorsMessage) {
            state.clientsTypeForOperatorsArray = clientsTypeForOperatorsMessage
        },

        updateStatisticsData (state, statisticsDataMessage) {
            state.statisticsDataArray = statisticsDataMessage
        },

        updatePaginateData (state, paginateDataMessage) {
            state.paginateDataVariable = paginateDataMessage
        }
        
    },
    state: {
        firstTableHeadersArray: [],
        secondTableHeadersArray: [],
        thirdTableHeadersArray: [],
        tableBodyArray: [],
        additionalCommentsArray: [],
        clientsTypeForOperatorsArray: [],
        statisticsDataArray: [],
        paginateDataVariable: Number()
    },
    getters: {
        firstTableHeaders(state) {
            return state.firstTableHeadersArray
        },
        secondTableHeaders(state) {
            return state.secondTableHeadersArray
        },
        thirdTableHeaders(state) {
            return state.thirdTableHeadersArray
        },

        tableBody(state) {
            return state.tableBodyArray
        },

        additionalComments(state) {
            return state.additionalCommentsArray
        },
        clientsTypeForOperators(state) {
            return state.clientsTypeForOperatorsArray
        },
        statisticsData(state) {
            return state.statisticsDataArray
        },
        paginateData(state) {
            return state.paginateDataVariable
        },

    },
    modules: {}
})


const app = createApp(App);
app.use(vSelect)
app.use(store)
app.use(router)
app.use(Paginate)
app.mount('#app')




























































// updateHeaders (state, tableHeadersMessage) {
        //     state.tableHeadersArray = tableHeadersMessage
        // },
// updateClients (state, tableBodyMessage) {
        //     state.tableBodyArray = tableBodyMessage.sort(function (a, b) {
        //         if (parseFloat(a.scoring_time) > parseFloat(b.scoring_time)) {
        //             return 1;
        //           }
        //           if (parseFloat(a.scoring_time) < parseFloat(b.scoring_time)) {
        //             return -1;
        //           }
        //           return 0;
        //     })
        // },
        // updateDropDownCommentsArray (state, dropDownCommentsMessage) {
        //     state.dropDownCommentsArray = dropDownCommentsMessage
        // },
        // updateDropDownCityAlfabank (state, dropDownCityAlfabank) {
        //     state.dropDownCityAlfabank = dropDownCityAlfabank
        // },