import { setAllButtonFalse } from '@/assets/setButton.js'


class SetBankButton {

    getUserBank (messageCatch) {
        return JSON.parse(messageCatch.message).user_bank
    }
    
    setButtonStatus (messageCatch) {
        var button_class = "btn-check header-button"
        setAllButtonFalse(button_class)
        document.getElementById(`btn-check-outlined ${this.getUserBank(messageCatch)}_registry`).checked = true
    }
}

export default SetBankButton;
    