

function setButtonsFalse (event, button_class) {
    for (var current_button of document.getElementsByClassName(button_class)) {
        if (current_button.id != event.target.id) {
            current_button.checked = false
        }
    }
}

function setAllButtonFalse (button_class) {
    for (var current_button of document.getElementsByClassName(button_class)) {
        current_button.checked = false
    }
}

function saveBankToLocalStorage (event) {
    let buttonId = event.target.id
    let bankName = buttonId.split(' ')[1].replace('_registry', '')
    localStorage.setItem('bank', bankName)
}


export { setButtonsFalse, setAllButtonFalse, saveBankToLocalStorage };