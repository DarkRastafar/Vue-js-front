import { checkAlfabank, returnFirstColField, 
    returnSecondColField, returnThirdColField, returnColFields } from '@/assets/configs/colConfig.js'


class MutationResponseData {
    constructor (responseData) {
        this.data = responseData
    }

    getBank() {
        return localStorage.getItem('bank')
    }

    returnEntry (entry) {
        let mutationEntry = {}
        let bank_name = checkAlfabank(this.getBank())
        let metaFieldsArray = returnColFields(bank_name)

        for (const [key, value] of Object.entries(entry)) {
            if (metaFieldsArray.includes(key)) {
                mutationEntry[key.replace(`${bank_name}_`, '')] = value
            }
        }
        return mutationEntry
    }

    returnEntryHeaders (entry, metaFieldsArray) {
        let mutationEntry = {}
        for (const [key, value] of Object.entries(entry)) {
            if (metaFieldsArray.includes(entry.key)) {
                mutationEntry[entry.key] = entry.value
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
        let resultClientsList = []

        for (let client of this.bodyData) {
            let mutationClient = this.returnEntry(client)
            resultClientsList.push(mutationClient)
        }
        return resultClientsList
    }
}


function crutchForHeaders(bank, headers){
    if (bank == 'tochka') {
        let tochkaBankResponseDict = {'key': 'tochka_bank_response', 'value': 'Ответ банка Точка'}
        headers.first.push(tochkaBankResponseDict)
    }
    else if (bank == 'module'){
        moduleStatusInnDict = {'key': 'module_status_inn', 'value': 'Статус ИНН Модуль'}
        headers.first.splice(1, 0, moduleStatusInnDict)
    }
    return headers
}

class MutationHeaders extends MutationResponseData {
    constructor (responseData) {
        super(responseData);
        this.headersData = this.data.data.headers
    }

    returnMutationOneDict (metaFieldsArray) {
        
        let resultHeadersList = []
        for (let headers of this.headersData.first) {
            let mutationHeaders = this.returnEntryHeaders(headers, metaFieldsArray)
            if (Object.keys(mutationHeaders).length) {
                for (const [key, value] of Object.entries(mutationHeaders)) {
                    let mutationEntryInstance = {'key': key, 'value': value}
                    resultHeadersList.push(mutationEntryInstance)
                }
            }
        }
        return resultHeadersList
    }

    returnMutationDict () {
        let bank_name = checkAlfabank(this.getBank())
        let firstFieldsArray = returnFirstColField(bank_name)
        let secondFieldsArray = returnSecondColField(bank_name)
        let thirdFieldsArray = returnThirdColField(bank_name)
        
        let mutationHeadersDict = {
            'first': this.returnMutationOneDict (firstFieldsArray),
            'second': this.returnMutationOneDict (secondFieldsArray),
            'third': this.returnMutationOneDict (thirdFieldsArray)
        }
        mutationHeadersDict = crutchForHeaders(bank_name, mutationHeadersDict)
        return mutationHeadersDict
    }
}


export { MutationResponseData, MutationBody, MutationHeaders };