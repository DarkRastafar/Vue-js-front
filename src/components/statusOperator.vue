<template>
    <div class="col-sm-2">
        <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" @click="SendStatusOperator">
            <label class="form-check-label" for="flexCheckDefault" >На рабочем месте</label>
        </div>
    </div>
</template>

<script>
  import { ActivateOperator } from '@/assets/FetchRequest.js'

  export default {
    methods: {
      SendStatusOperator (event) {
        const InstanceActivateOperator =  new ActivateOperator(event)
        InstanceActivateOperator.sendStatus()
      }
    }
  }
</script>


<style>

</style>