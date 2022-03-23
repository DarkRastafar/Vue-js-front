

class Statistic {
    constructor (event) {
        this.event = event;
        this.id = this.returnRefactorId ()
    }

    returnRefactorId () {
        return this.event.target.id.split(' ')[1]
    }

    getActiveBank () {
        let buttonsCheckbox = document.getElementsByClassName('btn-check header-button')
        for (let bttn of buttonsCheckbox) {
            if (bttn.checked == true) {
                let bttnId = bttn.id.replace('_registry', '').split(' ')[1]
                return bttnId
            }
        }
    }

    getClassModel () {
        let classModel = localStorage.getItem('user_class_model')
        return classModel
    }

    getUsername () {
        let username = localStorage.getItem('username')
        return username
    }

    getPhoneValue () {
        let phone = document.getElementById(`phone ${this.id}`)
        return phone.value
    }

    getCheckSendRko () {
        let sendRko = document.getElementById(`send_rko_checkbox ${this.id}`)
        return sendRko.checked
    }

    getFieldValue (value_str) {
        let fieldValue = document.getElementById(`${value_str} ${this.id}`)
        return fieldValue.value
    }
}


class FetchStatistics {
    constructor (event) {
        this.event = event
        this.body = this.createBody()
        this.url = 'http://127.0.0.1:8000/api/statistics/create_statistic_entry'
    }

    createBody () {
        const StatisticInstance = new Statistic(this.event)
        let body =  {
            username: StatisticInstance.getUsername(),
            inn: StatisticInstance.getFieldValue('inn'),
            class_model: StatisticInstance.getClassModel(),
            bank: StatisticInstance.getActiveBank(),
            client_type: StatisticInstance.getFieldValue('client_type'),
            additional_comment: StatisticInstance.getFieldValue('additional_comment')
        }
        return body
    }

    send () {
        const headers = {
            'Content-Type': 'application/json'
        }
        return fetch(this.url, {
            method: 'POST',
            body: JSON.stringify(this.body),
            headers: headers
        }).then(response => {
            return response.json()
        })
    }
}


class FetchClient {
    constructor (event) {
        this.event = event
        this.body = this.createBody()
        this.url = 'http://127.0.0.1:8000/api/client/client_update'
    }

    createBody () {
        const StatisticInstance = new Statistic(this.event)
        let body =  {
            username: StatisticInstance.getUsername(),
            inn: StatisticInstance.getFieldValue('inn'),
            name_company: StatisticInstance.getFieldValue('name_company'),
            surname: StatisticInstance.getFieldValue('surname'),
            first_name: StatisticInstance.getFieldValue('first_name'),
            patronomic: StatisticInstance.getFieldValue('patronomic'),
            phone: StatisticInstance.getPhoneValue(),
            adress: StatisticInstance.getFieldValue('adress'),

            class_model: StatisticInstance.getClassModel(),
            bank: StatisticInstance.getActiveBank(),

            status_inn: StatisticInstance.getFieldValue('status_inn'),
            comment: StatisticInstance.getFieldValue('comment'),
            additional_comment: StatisticInstance.getFieldValue('additional_comment'),
            send_rko: StatisticInstance.getCheckSendRko(),
            client_type: StatisticInstance.getFieldValue('client_type'),
            bank_city: StatisticInstance.getFieldValue('bank_city'),
            bank_response: StatisticInstance.getFieldValue('bank_response'),
        }
        return body
    }

    send () {
        const headers = {
            'Content-Type': 'application/json'
        }
        return fetch(this.url, {
            method: 'POST',
            body: JSON.stringify(this.body),
            headers: headers
        }).then(response => {
            return response.json()
        })
    }
}

export { FetchStatistics, FetchClient };