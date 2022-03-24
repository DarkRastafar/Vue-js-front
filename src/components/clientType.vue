<template>
  <div class="container">
    <div class="row" id="client_model_row">
      <div class="col-md-auto">
        <input type="checkbox" class="btn-check header-button-client" id="btn-check-outlined utro_model" autocomplete="off" @click="setUpCheckboxes">
        <label class="btn btn-outline-danger" for="btn-check-outlined utro_model">Утро</label><br>
      </div>

      <div class="col-md-auto">
        <input type="checkbox" class="btn-check header-button-client" id="btn-check-outlined novoregi_model" autocomplete="off" @click="setUpCheckboxes">
        <label class="btn btn-outline-primary" for="btn-check-outlined novoregi_model">Новореги</label><br>
      </div>

      <div class="col-md-auto">
        <input type="checkbox" class="btn-check header-button-client" id="btn-check-outlined obed_model" autocomplete="off" @click="setUpCheckboxes">
        <label class="btn btn-outline-info" for="btn-check-outlined obed_model">Обед</label><br>
      </div>
    </div>
  </div>
</template>


<script>
  import { setButtonsFalse } from '@/assets/setButton.js'
  import { SetClientsModelToOperator } from '@/assets/setVariablesToOperator.js'
  import { mapGetters, mapActions } from 'vuex'

  export default{
    data(){
      return{
        clientType: [
          {name: 'Новореги', class: 'btn btn-danger'},
          {name: 'Утро', class: 'btn btn-info'},
          {name: 'Обед', class: 'btn btn-warning'}
        ]
      }
    },
    components: {},
    methods: mapActions(['websocketConnect']),
    methods: {
      setUpCheckboxes (event) {
        var button_class = "btn-check header-button-client"
        setButtonsFalse(event, button_class)

        const InstanceSetClientsModelToOperator = new SetClientsModelToOperator(event)
        InstanceSetClientsModelToOperator.setClientModelToOperator(this.$store.connection)
      },
    }
  }
</script>


<style>

</style>
