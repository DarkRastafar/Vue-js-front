

class RangeFilterClients {
    constructor (event, store) {
        this.store = store
        this.id = event.target.id
        this.inputId = this.id.replace('-button', '')
        this.inputValue = document.getElementById(this.inputId).value
    }

    filterArayLt (tableBody) {
        return tableBody.filter(value => value.id <= this.inputValue)
    }

    filterArayGt (tableBody) {
        return tableBody.filter(value => value.id >= this.inputValue)
    }

    updateStoreTableBody (tableBody) {
        if (this.inputValue) {
            if (this.inputId == 'start-diapason') {
                this.store.commit('updateTableBody', this.filterArayGt(tableBody))
            } else {
                this.store.commit('updateTableBody', this.filterArayLt(tableBody))
            }
        }
    }
}

export default RangeFilterClients;