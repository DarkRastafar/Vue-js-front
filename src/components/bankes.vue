<template>
    <div>
      <div class="container">
        <div class="row">

          <div class="col-md-auto">
            <input type="checkbox" class="btn-check header-button" id="btn-check-outlined alfabank_registry" autocomplete="off" @click="setUpCheckboxes">
            <label class="btn btn-outline-danger" for="btn-check-outlined alfabank_registry">Альфабанк</label><br>
          </div>

          <div class="col-md-auto">
            <input type="checkbox" class="btn-check header-button" id="btn-check-outlined vtb_registry" autocomplete="off" @click="setUpCheckboxes">
            <label class="btn btn-outline-primary" for="btn-check-outlined vtb_registry">ВТБ</label><br>
          </div>

          <div class="col-md-auto">
            <input type="checkbox" class="btn-check header-button" id="btn-check-outlined otkritie_registry" autocomplete="off" @click="setUpCheckboxes">
            <label class="btn btn-outline-info" for="btn-check-outlined otkritie_registry">Открытие</label><br>
          </div>

          <div class="col-md-auto">
            <input type="checkbox" class="btn-check header-button" id="btn-check-outlined psb_registry" autocomplete="off" @click="setUpCheckboxes">
            <label class="btn btn-outline-warning" for="btn-check-outlined psb_registry">ПСБ</label><br>
          </div>

          <div class="col-md-auto">
            <input type="checkbox" class="btn-check header-button" id="btn-check-outlined tinkoff_registry" autocomplete="off" @click="setUpCheckboxes">
            <label class="btn btn-outline-secondary" for="btn-check-outlined tinkoff_registry">Тинькофф</label><br>
          </div>
          
          <div class="col-md-auto">
            <input type="checkbox" class="btn-check header-button" id="btn-check-outlined tochka_registry" autocomplete="off" @click="setUpCheckboxes">
            <label class="btn btn-outline-success" for="btn-check-outlined tochka_registry">Точка</label><br>
          </div>

          <div class="col-md-auto">
            <input type="checkbox" class="btn-check header-button" id="btn-check-outlined module_registry" autocomplete="off" @click="setUpCheckboxes">
            <label class="btn btn-outline-primary" for="btn-check-outlined module_registry">Модуль</label><br>
          </div>

          <statusOperator/>
          <clientType/>
          
        </div>
      </div>
    </div>
</template>


<script>
  import statusOperator from '@/components/statusOperator.vue'
  import clientType from '@/components/clientType.vue'
  import { SetBankToOperator } from '@/assets/setVariablesToOperator.js'
  import { setButtonsFalse } from '@/assets/setButton.js'

  export default{
    data(){
      return{
        Bankes: [
          {name: 'Альфабанк', class: 'btn btn-danger'},
          {name: 'ВТБ', class: 'btn btn-primary'},
          {name: 'Открытие', class: 'btn btn-info'},
          {name: 'ПСБ', class: 'btn btn-warning'},
          {name: 'ОТП', class: 'btn btn-warning'},
          {name: 'Модуль', class: 'btn btn-primary'}
        ]
      }
    },
    components: {
      statusOperator,
      clientType
    },
    methods: {
      setUpCheckboxes (event) {
        const InstanceSetBankToOperator = new SetBankToOperator(event)
        InstanceSetBankToOperator.isCheckButton()

        var button_class = "btn-check header-button"
        setButtonsFalse(event, button_class)
      },
    }
  }
</script>


<style>

</style>
