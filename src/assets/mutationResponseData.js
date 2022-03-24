import { checkAlfabank, returnColFields } from '@/assets/configs/colConfig.js'


class MutationResponseData {
    constructor (responseData) {
        this.data = responseData
    }

    getBank() {
        return localStorage.getItem('bank')
    }

    returnEntry (entry, bank_name, metaFieldsArray) {
        let mutationEntry = {}

        for (const [key, value] of Object.entries(entry)) {
            if (metaFieldsArray.includes(key)) {
                mutationEntry[key.replace(`${bank_name}_`, '')] = value
            }
        }
        return mutationEntry
    }
}


class MutationBody extends MutationResponseData {
    constructor (responseData) {
        super(responseData);
        this.bodyData = this.data.data.body.body
    }

    returnMutationDict () {
        let bank_name = checkAlfabank(this.getBank())
        let metaFieldsArray = returnColFields(bank_name)
        let resultClientsList = []

        for (let client of this.bodyData) {
            let mutationClient = this.returnEntry(client, bank_name, metaFieldsArray)
            resultClientsList.push(mutationClient)
        }
        return resultClientsList
    }
}


class MutationHeaders extends MutationResponseData {
    constructor (responseData) {
        super(responseData);
        this.headersData = this.data.data.headers
    }

    returnMutationDict () {
        console.log(this.headersData)
    }
}


export { MutationResponseData, MutationBody, MutationHeaders };