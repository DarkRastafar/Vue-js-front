
class ActivateOperator {
    constructor (event) {
        this.usernameId = localStorage.getItem('username_id')
        this.url = `http://127.0.0.1:8000/api/operator_user/${this.usernameId}/`
        this.username = localStorage.getItem('username')
        this.body = {
            'id': this.usernameId,
            'username': this.username,
            'active': event.target.checked
        }
    }

    sendStatus() {
        const headers = {
            'Content-Type': 'application/json'
        }
        return fetch(this.url, {
            method: 'PUT',
            body: JSON.stringify(this.body),
            headers: headers
        }).then(response => {
            return response.json()
        })
    }
}


class GetData {
    constructor (clientsPerPageData=null) {
        this.clientsPerPageData = clientsPerPageData
        this.classModel = this.returnClassModel ()
        this.usernameParam = this.returnUsernameParam ()
        this.classModelParam = this.returnClassModelParam ()
        this.dataForSliceParam = this.returnDataForSliceParam ()
        this.baseUrl = `http://127.0.0.1:8000/api/clients/${this.classModel}/custom`

        // this.startingPointParam = this.returnStartingPointParam ()
        // this.endingPointParam = this.returnEndingPointParam ()
        // this.url = this.baseUrl + this.startingPointParam + this.endingPointParam + 
        //            this.usernameParam + this.classModelParam + this.dataForSliceParam
        // this.url = this.baseUrl + this.usernameParam + this.classModelParam + this.dataForSliceParam
    }

    // returnStartingPointParam () {
    //     return `?starting_point=${localStorage.getItem('gte')}`
    // }

    // returnEndingPointParam () {
    //     return `&ending_point=${localStorage.getItem('lte')}`
    // }

    returnUsernameParam () {
        return `?username=${localStorage.getItem('username')}`
    }

    returnClassModel () {
        let classModel = localStorage.getItem('user_class_model')
        if (!classModel) {
            classModel = 'novoregi'
        }
        return classModel
    }

    returnClassModelParam () {
        return `&class_model=${this.classModel}`
    }

    getPageItemActive () {
        let currentPage = localStorage.getItem('currentPage')
        if (!currentPage) {
            currentPage = 1
        }
        return currentPage
    }

    returnDataForSliceParam () {
        let from = (this.getPageItemActive () -1) * this.clientsPerPageData;
        let to = from + this.clientsPerPageData;
        return `&data_for_slice=[${from},${to}]`
    }

    returnReverseParam () {
        return `&reverse=${localStorage.getItem('reverse')}`
    }

    returnUrl () {
        return this.baseUrl + this.usernameParam + this.classModelParam + this.dataForSliceParam + this.returnReverseParam()
    }

    returnSlice () {
        const headers = {
            'Content-Type': 'application/json'
        }
        return fetch(this.returnUrl(), {
            method: 'GET',
            headers: headers
        }).then(response => {
            return response.json()
        })
    }
}


class GetDataGte extends GetData {
    constructor (clientsPerPageData) {
        super(clientsPerPageData);
    }

    returnStartingPointParam () {
        return `&starting_point=${localStorage.getItem('gte')}`
    }

    returnUrl () {
        let baseUrl = this.baseUrl + this.usernameParam + this.classModelParam + this.dataForSliceParam + this.returnReverseParam()
        return baseUrl + this.returnStartingPointParam ()
    }
}


class GetDataLte  extends GetData {
    constructor (clientsPerPageData) {
        super(clientsPerPageData);
    }

    returnEndingPointParam () {
        return `&ending_point=${localStorage.getItem('lte')}`
    }

    returnUrl () {
        let baseUrl = this.baseUrl + this.usernameParam + this.classModelParam + this.dataForSliceParam + this.returnReverseParam()
        return baseUrl + this.returnEndingPointParam ()
    }
}


export { ActivateOperator, GetData, GetDataGte, GetDataLte };





// let pages = document.getElementsByClassName('page-item active')
        // for (let page of pages){
        //     console.log(page.textContent)
        // }