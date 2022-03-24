

class RangeFilterClients {
    constructor (event, store) {
        this.store = store
        this.id = event.target.id
        this.inputId = this.id.replace('-button', '')
        this.input = document.getElementById(this.inputId)
    }

    filterArayLt (tableBody, inputValue) {
        return tableBody.filter(value => value.id <= inputValue)
    }

    filterArayGt (tableBody, inputValue) {
        return tableBody.filter(value => value.id >= inputValue)
    }

    getInputValue () {
        if (this.input) {
            return document.getElementById(this.inputId).value
        } else {
            return 0
        }
    }

    updateStoreTableBody (tableBody) {
        let inputValue = this.getInputValue()

        if (inputValue) {
            if (this.inputId == 'start-diapason') {
                this.store.commit('updateTableBody', this.filterArayGt(tableBody, inputValue))
            } else {
                if (inputValue != 0) {
                    this.store.commit('updateTableBody', this.filterArayLt(tableBody, inputValue))
                } else {
                    this.store.commit('updateTableBody', tableBody)
                }
            }
        }
    }
}

export default RangeFilterClients;