import { createStore } from 'vuex'
import { GetUsernameFromCoockies } from '@/assets/get_username_from_cookies.js'
import SetBankButton from '@/assets/set_bank_button.js'
import SetClientsModelButton from '@/assets/setClientsModelButton.js'
import { SetValuesToRangeFilter } from '@/assets/setVariablesToOperator.js'
import { GetData } from '@/assets/FetchRequest.js'
import { MutationResponseData, MutationBody, MutationHeaders } from '@/assets/mutationResponseData.js'

const defaultOperatorBank = 'alfabank'
const defaultClientType = 'novoregi'
const defaultClientPerPage = 2


export default createStore({
  actions: {
    async setVariablesFromLocalStorage() {
        const SetValuesToRangeFilterInstance = new SetValuesToRangeFilter()
        SetValuesToRangeFilterInstance.set()
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
            let eventName = messageCatch.event

            if (eventName == 'operator_connect') {
                const operator_id = JSON.parse(messageCatch.message).username_id

                document.cookie = `username_id=${operator_id}; secure`
                localStorage.setItem('username_id', operator_id)

                const InstanceSetBankButton = new SetBankButton()
                InstanceSetBankButton.setButtonStatusFromLocalStorage(defaultOperatorBank)

                const InstanceSetClientsModelButton = new SetClientsModelButton()
                InstanceSetClientsModelButton.setButtonStatus(class_model)

                
                ctx.commit('updateClientsPerPageData', defaultClientPerPage)
            }
            else if (eventName == 'send_non_called_statistics') {
                const statisticsDataMessage = JSON.parse(messageCatch.message).statistics
                ctx.commit('updateStatisticsData', statisticsDataMessage)
            }
            else if (eventName == 'client_mutation') {
                let mutationClient = JSON.parse(messageCatch.message).client
                let mutationClientID = mutationClient.id
                let currentArray = ctx.getters.tableBody
                for (let client of currentArray) {
                    if (client.id == mutationClientID) {
                        let indexItem = currentArray.findIndex(i => i == client)
                        const MutationResponseDataInstance = new MutationResponseData(mutationClient)
                        let mutationEntry = MutationResponseDataInstance.returnEntry(mutationClient)
                        
                        ctx.commit('replaceItemIntoArray', [indexItem, mutationEntry])
                    }
                }
            }
            else if (eventName == 'headers_mutation') {
                let responseHeaders = JSON.parse(messageCatch.message)
                console.log('headers_mutation')
                ctx.commit('updateFirstTableHeaders', responseHeaders.first)
                ctx.commit('updateSecondTableHeaders', responseHeaders.second)
                ctx.commit('updateThirdTableHeaders', responseHeaders.third)

                function callback (data) {
                    data.then(responseData => {
                        let paginateData = responseData.data.body.paginate_data
                        let responseBody = responseData.data.body.body
                        let responseAdditionalComments = responseData.data.additional_comments
                        let responseClientsTypeForOperators = responseData.data.clients_type_for_operators
                        
                        ctx.commit('updateClientsPerPageData', defaultClientPerPage)
                        ctx.commit('updatePaginateData', paginateData)
                        ctx.commit('updateTableBody', responseBody)
                        ctx.commit('updateAdditionalComments', responseAdditionalComments)
                        ctx.commit('updateClientsTypeForOperators', responseClientsTypeForOperators)
                    })
                }
                const GetDataInstance = new GetData(defaultClientPerPage)
                callback(GetDataInstance.returnSlice())
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
    },
    async getDataDRF(ctx) {
        const GetDataInstance = new GetData(defaultClientPerPage)
        let responseData = await GetDataInstance.returnSlice()

        const MutationBodyInstance = new MutationBody(responseData)
        let mutationClientsDict = MutationBodyInstance.returnMutationDict()

        const MutationHeadersInstance = new MutationHeaders(responseData)
        let mutationHeadersDict = MutationHeadersInstance.returnMutationDict()

        console.log(mutationHeadersDict)



        let paginateData = responseData.data.body.paginate_data
        let responseBody = mutationClientsDict
        let responseHeaders = mutationHeadersDict
        let responseAdditionalComments = responseData.data.additional_comments
        let responseClientsTypeForOperators = responseData.data.clients_type_for_operators
        
        ctx.commit('updateClientsPerPageData', defaultClientPerPage)
        ctx.commit('updatePaginateData', paginateData)
        ctx.commit('updateFirstTableHeaders', responseHeaders.first)
        ctx.commit('updateSecondTableHeaders', responseHeaders.second)
        ctx.commit('updateThirdTableHeaders', responseHeaders.third)
        ctx.commit('updateTableBody', responseBody)
        ctx.commit('updateAdditionalComments', responseAdditionalComments)
        ctx.commit('updateClientsTypeForOperators', responseClientsTypeForOperators)
    },
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
      replaceItemIntoArray (state, listUpdate) {
          state.tableBodyArray[listUpdate[0]] = listUpdate[1]
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
      },

      updateClientsPerPageData (state, responseClientsPerPage) {
          state.clientsPerPage = responseClientsPerPage
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
      paginateDataVariable: Number(),
      clientsPerPage: Number()
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
      clientsPerPageData(state) {
          return state.clientsPerPage
      }

  },
  modules: {}
})
