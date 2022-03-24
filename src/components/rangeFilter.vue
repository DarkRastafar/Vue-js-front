<template>
    <div class="container range-form">
        <form id="rangeStartFilterForm">
            <div class="row">
                <div class="col-1 col-md-1 col-sm-1 col-lg-1 col-xl-1" >
                    <input type="number" class="form-control diapason" min="0" value='0' id="start-diapason">
                </div>
                <div class="col-1 col-md-1 col-sm-1 col-lg-1 col-xl-1">
                    <button type="submit" class="btn btn-primary mb-2 diapason-button" id="start-diapason-button" @click="filterClients">Отфильтровать</button>
                </div>
            </div>
        </form>
        <form id="rangeEndFilterForm">
            <div class="row">
                <div class="col-1 col-md-1 col-sm-1 col-lg-1 col-xl-1">
                    <input type="number" class="form-control diapason" min="0" value='0' id="end-diapason">
                </div>
                <div class="col-1 col-md-1 col-sm-1 col-lg-1 col-xl-1">
                    <button type="submit" class="btn btn-primary mb-2 diapason-button" id="end-diapason-button" @click="filterClients">Отфильтровать</button>
                </div>
            </div>
        </form>
        <div class="col-3 col-md-3 col-sm-3 col-lg-3 col-xl-3">
            <button type="submit" class="btn btn-primary mb-2 diapason-button" id="reset-diapason-button" @click="resetFilter">Сбросить фильтр</button>
        </div>
    </div>
</template>

<script>
export default {
  name: 'RangeFilter',
  emits: ['rangeFilterClients', 'resetFilter'],
  data() {
    return {
    }
  },
  methods: {
      filterClients(event) {
        console.log(event.target.id)
        let buttonId = event.target.id

        if (buttonId.includes('start')) {
            localStorage.setItem('gte', document.getElementById('start-diapason').value)
            localStorage.setItem('lte', 0)

            document.getElementById('end-diapason').value = localStorage.getItem('lte')
        }
        else if (buttonId.includes('end')) {
            localStorage.setItem('gte', 0)
            localStorage.setItem('lte', document.getElementById('end-diapason').value)

            document.getElementById('start-diapason').value = localStorage.getItem('gte')
        }

        this.$emit('rangeFilterClients', event)
      },
      resetFilter(event) {
        document.getElementById('start-diapason').value = 0
        document.getElementById('end-diapason').value = 0
        localStorage.setItem('gte', document.getElementById('start-diapason').value)
        localStorage.setItem('lte', document.getElementById('end-diapason').value)

        this.$emit('resetFilter', event)
      }
  }
}
</script>