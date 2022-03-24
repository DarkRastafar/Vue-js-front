function checkAlfabank(bank) {
    if (bank == 'alfabank') {
        bank = 'alfa'
    }
    return bank
}

function returnFirstColField (bank) {
    let bank_name = checkAlfabank (bank)
    return ['id', `${bank_name}_status_inn`, `${bank_name}_bank_response`, `${bank_name}_bank_city`]
}

function returnSecondColField () {
    return ['inn', 'name_company', 'surname', 'first_name', 'patronomic', 'adress']
}

function returnThirdColField (bank) {
    let bank_name = checkAlfabank (bank)
    if (bank_name == 'alfa'){
        return [`${bank_name}_comment`, `${bank_name}_additional_comment`, `${bank_name}_send_rko`, `${bank_name}_client_type`, 'phone']}
    return [`${bank_name}_comment`, `${bank_name}_additional_comment`, `${bank_name}_send`, `${bank_name}_client_type`, 'phone']
}

function returnColFields(bank) {
    let first = returnFirstColField(bank)
    let second = returnSecondColField()
    let third = returnThirdColField(bank)
    return first + second + third
}

export { checkAlfabank, returnFirstColField, returnSecondColField, returnThirdColField, returnColFields};