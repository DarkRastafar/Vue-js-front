
class GetUsernameFromCoockies {
  constructor (string) {
    this.string = string
  }

  getUsernameFromCookieThereLenghtIsOne (string) {
    var value = string.split('=')[1]
    return value
  }

  getUsernameFromCookieThereLenghtIsMore (findResult) {
    for (var strThis of findResult) {
      if (strThis.includes('username=')) {
        return this.getUsernameFromCookieThereLenghtIsOne (strThis)
      }
    }
  }

  findUsernameString() {
    var findResult = this.string.split(';')
    if (findResult.length !== 0) {
      if (findResult.length < 2) {
        return this.getUsernameFromCookieThereLenghtIsOne (this.string)
      } else {
        return this.getUsernameFromCookieThereLenghtIsMore (findResult)
      }
    } else {
      console.log('Куки пусты...')
    }
  }

  returnUsername () {
    let username = this.findUsernameString()
    if (!username) {
        username = localStorage.getItem('username')
    }
    return username
  }
}

class GetUsernameIDFromCoockies {
  constructor (string) {
    this.string = string
  }

  getUsernameFromCookieThereLenghtIsOne (string) {
    var value = string.split('=')[1]
    return value
  }

  getUsernameFromCookieThereLenghtIsMore (findResult) {
    for (var strThis of findResult) {
      if (strThis.includes('username_id=')) {
        return this.getUsernameFromCookieThereLenghtIsOne (strThis)
      }
    }
  }

  findUsernameIDString() {
    var findResult = this.string.split(';')
    if (findResult.length !== 0) {
        return this.getUsernameFromCookieThereLenghtIsMore (findResult)
      }
    else {
      console.log('Куки пусты...')
    }
  }
}

export {GetUsernameFromCoockies, GetUsernameIDFromCoockies};