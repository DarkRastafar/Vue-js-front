<template>
  <bankes/>
  <div class="container fluid customData">
    <div class="row">
      <div class="col-12 col-md-6">
        <rangeFilter @rangeFilterClients="rangeFilterClients"/>
      </div>
      <div class="col-md-6" :class="{'hidden__content': modelType !== 'novoregi'}">
        <div class="col-12 col-md-12 col-sm-12 col-lg-10 col-xl-8">
          <div class="data_non_called_clients">
            <ul class="list-group">
              <li class="list-group-item d-flex justify-content-between align-items-center">Альфабанк:
                <span class="badge badge-primary badge-pill statisticsDataSpan">{{ statisticsData.alfa_data_json }}</span>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center">ВтБ:
                <span class="badge badge-primary badge-pill statisticsDataSpan">{{ statisticsData.vtb_data_json }}</span>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center">Открытие:
                <span class="badge badge-primary badge-pill statisticsDataSpan">{{ statisticsData.otkritie_data_json }}</span>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center">Точка:
                <span class="badge badge-primary badge-pill statisticsDataSpan">{{ statisticsData.tochka_data_json }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  
  <div class="container fluid">
    <div class="row">
      <div class="col-md-8">
        <table class="table table-sm table-striped" :name="Client.id" v-for="Client in tableBody" v-bind:key="Client.id" :id="Client.id">
          <thead class="table-dark">
            <tr>

              <th rowspan="2" :class="firstTableHeaders[0].key"><p>{{ firstTableHeaders[0].value }}</p></th>
              <th class="cell" rowspan="2" :name="`id ${Client.id}`">
                {{ Client.id }}
              </th>
              <!-- ------------------------------------------------------------------ -->
              <th><p>{{ secondTableHeaders[0].value }}</p></th>
              <th class="cell" :name="`inn ${Client.id}`">
                <textarea :value="Client.inn" name="inn"/>
              </th>
              <!-- ------------------------------------------------------------------ -->
              <th><p>{{ thirdTableHeaders[0].value }}</p></th>
              <th class="cell" :name="`comment ${Client.id}`">
                <textarea :value="Client.comment" name="comment"/>
              </th>

            </tr>
            <tr>
              <th><p>{{ secondTableHeaders[1].value }}</p></th>
              <th class="cell" :name="`name_company ${Client.id}`">
                <textarea :value="Client.name_company" name="name_company"/>
              </th>
              <!-- ------------------------------------------------------------------ -->
              <th><p>{{ thirdTableHeaders[1].value }}</p></th>
              <th class="cell" :name="`additional_comment ${Client.id}`">
                <select class="form-select">
                  <option>Доп. коммент</option>
                  <option v-for="comment in additionalComments" v-bind:key="comment.id">{{comment.list}}</option>
                </select>
              </th>

            </tr> 
            <tr>

              <th :class="firstTableHeaders[1].key"><p>{{ firstTableHeaders[1].value }}</p></th>
              <th class="cell" :name="`status_inn ${Client.id}`">
                <textarea :value="Client.status_inn" name="status_inn"/>
              </th>
              <!-- ------------------------------------------------------------------ -->
              <th><p>{{ secondTableHeaders[2].value }}</p></th>
              <th class="cell" :name="`surname ${Client.id}`">
                <textarea :value="Client.surname" name="surname"/>
              </th>
              <!-- ------------------------------------------------------------------ -->
              <th><p>{{ thirdTableHeaders[2].value }}</p></th>
              <th class="cell" :name="`send_rko ${Client.id}`">
                <input type="checkbox" class="btn-check send_rko_checkbox" id="btn-check-outlined send_rko_checkbox" autocomplete="off">
                <label class="btn btn-outline-primary send_rko_checkbox" for="btn-check-outlined send_rko_checkbox">Отправить</label><br>
              </th>

            </tr>

            <tr>

              <th :class="firstTableHeaders[3].key"><p>{{ firstTableHeaders[3].value }}</p></th>
              <th class="cell" :name="`bank_city ${Client.id}`">
                <textarea :value="Client.bank_city" name="bank_city"/>
              </th>
              <th><p>{{ secondTableHeaders[3].value }}</p></th>
              <th class="cell" :name="`first_name ${Client.id}`">
                <textarea :value="Client.first_name" name="first_name"/>
              </th>
              <!-- ------------------------------------------------------------------ -->
              <th><p>{{ thirdTableHeaders[3].value }}</p></th>
              <th class="cell" :name="`client_type ${Client.id}`">
                <select class="form-select">
                  <option>Тип клиента</option>
                  <option v-for="clientType in clientsTypeForOperators" v-bind:key="clientType.key" :id="clientType.key">{{clientType.value}}</option>
                </select>
              </th>

            </tr>

            <tr>
              <th :class="firstTableHeaders[2].key"><p>{{ firstTableHeaders[2].value }}</p></th>
              <th class="cell" :name="`bank_response ${Client.id}`">
                <textarea :value="Client.bank_response" name="bank_response"/>
              </th>
              <th><p>{{ secondTableHeaders[4].value }}</p></th>
              <th class="cell" :name="`patronomic ${Client.id}`">
                <textarea :value="Client.patronomic" name="patronomic"/>
              </th>
              <!-- ------------------------------------------------------------------ -->
              <th colspan="2" rowspan="2" class="cell">
                <button class="btn btn-primary send-data" type="submit">Отправить</button>
              </th>
              
            </tr>

            <tr>
              <th :class="secondTableHeaders[5].key"><p>{{ secondTableHeaders[5].value }}</p></th>
              <th colspan="3" class="cell" :name="`adress ${Client.id}`">
                <textarea :value="Client.adress" name="adress"/>
              </th>
              <!-- ------------------------------------------------------------------ -->
            </tr>

          </thead>
        </table>
      </div>
    </div>
  </div>
  
  <div class="v-table__paginator">
    <div class="row">
    <paginate
      :page-count="pages"
      :page-range="5"
      :click-handler="clickPage"
      :prev-text="'Предыдущий'"
      :next-text="'Следующий'"
      :container-class="'v-table__paginator'">
    </paginate>
    </div>
  </div>
</template>


<script>
  import bankes from '@/components/bankes.vue'
  import rangeFilter from '@/components/rangeFilter.vue'
  import { mapGetters, mapActions } from 'vuex'
  import Paginate from "vuejs-paginate-next";
  import RangeFilterClients from '@/assets/rangeFilterDiapason.js'
  import { GetData } from '@/assets/FetchRequest.js'

  export default {
      name: 'bodyTable',
      data() {
        return {
          clientsPerPage: 2,
          pageNumber: 1,
        }
      },
      components: {
        bankes,
        Paginate,
        rangeFilter,
      },
      computed: {
        ...mapGetters(["firstTableHeaders", "secondTableHeaders", "thirdTableHeaders", 
        "tableBody", "additionalComments", "clientsTypeForOperators", "statisticsData", "paginateData"]),

        howClients () {
          return this.tableBody.length
        },

        // pages () {
        //   return Math.ceil(this.tableBody.length / this.clientsPerPage)
        // },
        pages () {
          return Math.ceil(this.paginateData / this.clientsPerPage)
        },
        paginatedClients () {
          let from = (this.pageNumber -1) * this.clientsPerPage;
          let to = from + this.clientsPerPage;
          return this.tableBody.slice(from, to);
        },
        modelType () {
            return localStorage.getItem('user_class_model')
        }
      },
      methods: mapActions(['setVariablesFromLocalStorage', 'websocketConnect', 'getDataDRF']),
      methods: {
        UpdateScrollHeight (event) {
          const currentTextareaField = document.getElementById(event.target.id);
          currentTextareaField.style.cssText = `height: ${currentTextareaField, currentTextareaField.scrollHeight}px; overflow-y: hidden`;
        },
        clickPage (page) {
          if (page !== '...'){
            this.pageNumber = page;
            localStorage.setItem('currentPage', page)
          }

        },
        async rangeFilterClients (event) {
          const RangeFilterClientsInstance = new RangeFilterClients(event, this.$store)
          RangeFilterClientsInstance.updateStoreTableBody(this.tableBody)

          let from = (this.pageNumber -1) * this.clientsPerPage;
          let to = from + this.clientsPerPage;
          let sliceDiapason = [from, to]

          const GetDataInstance = new GetData()
          let data = await GetDataInstance.returnSlice()

          let dataForUpdate = data.data.paginate_data
          this.$store.commit('updatePaginateData', dataForUpdate)
        },
      },
      async mounted() {
        this.$store.dispatch('setVariablesFromLocalStorage');
        this.$store.dispatch('websocketConnect');
        this.$store.dispatch('getDataDRF');
      }
  }
</script>








































































<!-- <table class="table table-sm table-striped">
    <thead class="table-dark">
      <tr>
        <th v-for="(header, head) in allHeaders" :key="head" class="col" :class="header.key">
          <td v-if="header.value !== 'username'">{{header.value}}</td>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr :name="Client.id" v-for="Client in paginatedClients" v-bind:key="Client.id" :id="Client.id" class="container-fluid" >
        <td v-for="(field, fieldName) in Client" v-bind:key="fieldName" class="col" :class="fieldName" :id="fieldName">
          <div>
            <textarea 
              v-if="fieldName !== 'username_id'" :id="`${Client.id} ${fieldName}`" v-bind:value="field" :name="fieldName" 
              @input="UpdateScrollHeight" @change="CreateInput"
            />
          </div>
        </td>
      </tr>
    </tbody>
  </table> -->
  <!-- <div class="v-table__paginator">
    <div class="page" 
        v-for="page in displayingPages" :key="page" :class="{'page__selected': page === pageNumber}" @click="clickPage(page)">
          {{ page }}
        </div>
  </div> -->

  <!-- <div class="container fluid"> -->
    <!-- <div class="row"> -->
      <!-- <table class="table table-sm table-striped">
        <tbody>
          <td v-for="Client in firstTableBody" v-bind:key="Client.id" :id="Client.id" :name="Client.id">
            <div class="col-md-4">
              <table class="table table-sm table-striped">
                <thead class="table-dark">
                  <tr v-for="(header, head) in firstTableHeaders" :key="head" class="col" :class="header.key">
                    <th>
                      {{ header.value }}
                    </th>
                    <th class="cell" v-for="(field, fieldName) in Client" v-bind:key="fieldName" :id="fieldName" :class="{'field__hidden': fieldName != header.key}">
                      <textarea v-bind:value="field" :name="fieldName" />
                    </th>
                  </tr>
                </thead>
              </table>
            </div>
          </td>
          <td v-for="Client in secondTableBody" v-bind:key="Client.id" :id="Client.id" :name="Client.id">
            <div class="col-md-4">
              <table class="table table-sm table-striped">
                <thead class="table-dark">
                  <tr v-for="(header, head) in secondTableHeaders" :key="head" class="col" :class="header.key">
                    <th>
                      {{ header.value }}
                    </th>
                    <th class="cell" v-for="(field, fieldName) in Client" v-bind:key="fieldName" :id="fieldName" :class="{'field__hidden': fieldName != header.key}">
                      <textarea v-bind:value="field" :name="fieldName"/>
                    </th>
                  </tr>
                </thead>
              </table>
            </div>
          </td>
          <td v-for="Client in thirdTableBody" v-bind:key="Client.id" :id="Client.id" :name="Client.id">
            <div class="col-md-4">
              <table class="table table-sm table-striped">
                <thead class="table-dark">
                  <tr v-for="(header, head) in thirdTableHeaders" :key="head" class="col" :class="header.key">
                    <th>
                      {{ header.value }}
                    </th>
                    <th class="cell" v-for="(field, fieldName) in Client" v-bind:key="fieldName" :id="fieldName" :class="{'field__hidden': fieldName != header.key}">
                      <textarea v-bind:value="field" :name="fieldName" />
                    </th>
                  </tr>
                </thead>
              </table>
            </div>
          </td>
        </tbody>
      </table> -->
    <!-- </div> -->
  <!-- </div> -->