import { GetUsernameFromCoockies, GetUsernameIDFromCoockies } from '@/assets/get_username_from_cookies.js'


class ActivateOperator {
    constructor (event) {
        this.usernameId = new GetUsernameIDFromCoockies(document.cookie).findUsernameIDString()
        this.url = `http://127.0.0.1:8000/api/operator_user/${this.usernameId}/`
        this.username = new GetUsernameFromCoockies(document.cookie).findUsernameString()
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
    constructor () {
        this.classModel = this.returnClassModel ()
        this.startingPointParam = this.returnStartingPointParam ()
        this.endingPointParam = this.returnEndingPointParam ()
        this.usernameParam = this.returnUsernameParam ()
        this.classModelParam = this.returnClassModelParam ()
        
        this.baseUrl = `http://127.0.0.1:8000/api/clients/${this.classModel}/custom_${this.classModel}`
        this.url = this.baseUrl + this.startingPointParam + this.endingPointParam + 
                   this.usernameParam + this.classModelParam
    }

    returnStartingPointParam () {
        return `?starting_point=${localStorage.getItem('gte')}`
    }

    returnEndingPointParam () {
        return `&ending_point=${localStorage.getItem('lte')}`
    }

    returnUsernameParam () {
        return `&username=${localStorage.getItem('username')}`
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
        // let pages = document.getElementsByClassName('page-item active')
        // for (let page of pages){
        //     console.log(page.textContent)
        // }
        let currentPage = localStorage.getItem('currentPage')
        if (!currentPage) {
            currentPage = 1
        }
        return currentPage
    }

    returnSlice () {
        console.log(this.getPageItemActive())

        const headers = {
            'Content-Type': 'application/json'
        }
        return fetch(this.url, {
            method: 'GET',
            headers: headers
        }).then(response => {
            return response.json()
        })
    }
}


export { ActivateOperator, GetData };