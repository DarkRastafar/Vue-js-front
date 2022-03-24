

class BodyStore {
    constructor(store, data) {
        this.store = store;
        this.data = data;
    }

    update () {
        let bodyData = this.data.data.body.body
        this.store.commit('updateTableBody', bodyData)
    }
}


class BodyStoreNew {
    constructor(store, data) {
        this.store = store;
        this.data = data;
    }

    update () {
        this.store.commit('updateTableBody', this.data)
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

export { BodyStore, BodyStoreNew, PaginatonStore };