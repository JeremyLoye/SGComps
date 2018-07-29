function signOut() {
    firebase.auth().signOut().then(() => {
      post('/', {
        signedIn: false
      })
      console.log('Signed Out')
    }, error => {
      console.log('Sign Out error', error)
    })
  }

document.getElementsByClassName('').innerHTML =  "'<li>' + Hi + '</li>'"