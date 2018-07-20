function reAuthenticate() {
    // Get how page is accessed.
    let url = window.location.href
    let brokenUrl = url.split('/')
    let urlType = brokenUrl[brokenUrl.length - 1]
    // Get details for re-Authentication
    let user = firebase.auth().currentUser
    let email = document.getElementById('txtEmail').value
    let password = document.getElementById('txtPassword').value
    // Create re-Authentication credentials
    let cred = firebase.auth.EmailAuthProvider.credential(email, password)
    // Login with re-Authentication credentials
    user.reauthenticateAndRetrieveDataWithCredential(cred).then(function() {
        console.log('ReAuthentication Successful')
        document.getElementById('reAuth').style.display = 'none'
        if (urlType == 'changePassword') {
            document.getElementById('passChange').style.display = 'block'
        } else {
            document.getElementById('emailChange').style.display = 'block'
        }
        document.getElementById('txtEmail').value = ''
        document.getElementById('txtPassword').value = ''
        user, email = ''
    }).catch(error => {
        console.log(error)
    })
}
function changePassword() {
    let user = firebase.auth().currentUser
    let newPass = document.getElementById('newPassword').value
    if (newPass == document.getElementById('confirmPassword').value) {
        user.updatePassword(newPass).then(() => {
            // Update successful.
            console.log('Password Changed')
            document.getElementById('passChange').style.display = 'none'
            document.getElementById('changeConfirmation').style.display = 'block'
            document.getElementById('changeMessage').innerHTML 
              = 'Password has been changed successfully'
        }).catch(error => {
            console.log(error)
        })
    } else {
        console.log('Password mismatch.')
        document.getElementById('passMismatch').style.display = 'block'
    }
}

function changeEmail() {
    let user = firebase.auth().currentUser
    let newEmail = document.getElementById('newEmail').value
    if (newEmail == document.getElementById('confirmEmail').value) {
        user.updateEmail(newEmail).then(() => {
            // Update successful.
            console.log('Email Changed')
            document.getElementById('emailChange').style.display = 'none'
            document.getElementById('changeConfirmation').style.display = 'block'
            document.getElementById('changeMessage').innerHTML 
              = 'Email has been changed successfully'
            post('/emailChange', {
                email: newEmail
            })
        }).catch(error => {
            console.log(error)
        })
    } else {
        console.log('Email mismatch.')
        document.getElementById('emailMismatch').style.display = 'block'
    }
}

function redirect() {
    window.location = '/profile'
}