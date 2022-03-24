class SetClientsModelToOperator {
    constructor (event) {
        this.id = event.target.id
    }

    getClientsModelName () {
        return this.id.split(' ')[1]
    }

    getClientsName () {
        return this.getClientsModelName().split('_')[0]
    }

    setClientModelToOperator (connection) {
        localStorage.setItem('user_class_model', this.getClientsName());
        connection.onclose()
    }
}


class SetValuesToRangeFilter {
    set() {
        document.getElementById('start-diapason').value = localStorage.getItem('gte')
        document.getElementById('end-diapason').value = localStorage.getItem('lte')
    }
}

export { SetClientsModelToOperator, SetValuesToRangeFilter };







































































// class SetBankToOperator {
//     constructor (event) {
//         this.headers = {'Content-Type': 'application/json'}
//         this.checked = event.target.checked
//         this.id = event.target.id
//         this.url = `http://127.0.0.1:8000/api/operator_user/define_bank/`
//         this.username = localStorage.getItem('username')
//         this.body = {
//             'username': this.username,
//             'bank': this.getBankName()
//         }
//     }

//     getNameRegistry () {
//         return this.id.split(' ')[1]
//     }

//     getBankName () {
//         return this.getNameRegistry().split('_')[0]
//     }

//     setBankToOperator () {
//         return fetch(this.url, {
//             method: 'PUT',
//             body: JSON.stringify(this.body),
//             headers: this.headers
//         }).then(response => {
//             return response.json()
//         })
//     }

//     isCheckButton() {
//         if (this.checked == true) {
//             this.setBankToOperator ()
//         }
//     }
// }