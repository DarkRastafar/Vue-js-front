
class SetWorkStatus {
    constructor (messageCatch) {
        this.operator_work_status = JSON.parse(messageCatch.message).user_work_status.toLowerCase()
      }

    setStatus () {
        if (this.operator_work_status === 'true') {
            document.getElementById('flexCheckDefault').checked = true
        } 
        else {
            document.getElementById('flexCheckDefault').checked = false
        }
    }
}

export default SetWorkStatus;
    