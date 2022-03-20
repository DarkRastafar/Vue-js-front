import { setAllButtonFalse } from '@/assets/setButton.js'


class SetClientsModelButton {
    
    setButtonStatus (class_model) {
        var button_class = "btn-check header-button-client"
        setAllButtonFalse(button_class)
        document.getElementById(`btn-check-outlined ${class_model}_model`).checked = true
    }

}

export default SetClientsModelButton;