

class BodyStore {
    constructor(data) {
        this.data = data;
    }

    update (store) {
        store.commit('updateTableBody', this.data)
    }
}


class HeadersStore {
    constructor(data) {
        this.data = data;
    }

    update (store) {
        store.commit('updateFirstTableHeaders', this.data.first)
        store.commit('updateSecondTableHeaders', this.data.second)
        store.commit('updateThirdTableHeaders', this.data.third)
    }
}


class PaginatonStore {
    constructor(store, data) {
        this.store = store;
        this.data = data;
    }

    update () {
        let paginateData = this.data.data.body.paginate_data
        this.store.commit('updatePaginateData', paginateData)
    }
}

export { BodyStore, HeadersStore, PaginatonStore };