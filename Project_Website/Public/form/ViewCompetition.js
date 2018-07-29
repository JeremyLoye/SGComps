'use strict';

const firestore = firebase.firestore();
const settings = { /* your settings... */
    timestampsInSnapshots: true
};

firestore.settings(settings)

firestore.collection('compDetails').orderBy('date').limit(50).get().then(function (querySnapshot) {
    let user = firebase.auth().currentUser
    querySnapshot.forEach(function (doc) {
        let data = doc.data()
        let register
        if (user.displayName) {
            register = '<a onclick="register(user.uid, data.compName)" href="">Register</a>'
        } else {
            register = '<p>Registered</p>'
        }
        $(document).ready(() => {
            $('.listing').append('<div class="demo-card-wide mdl-card mdl-shadow--2dp">' +
                '<div class="mdl-card__title">' +
                '<h2 class="mdl-card__title-text">' + data.compName + '</h2>' +
                '</div>' +
                '<div class="mdl-card__supporting-text">' +
                '<p>' + data.details + '</p>' +
                '</div>' +
                '<div class="mdl-card__actions mdl-card--border">' +
                register +
                '</div>' +
                $('.mdl-card__title').css('background', 'url('+data.photoPath+')')
              )
        })
    })
})

function register(uid, compName) {
    let docRef = firestore.collection('userDetails').doc(uid)
    let data = docRef.get().data()
    data.compsInvolved.push(compName)
    firestore.runTransaction(transaction => {
        return transaction.get(docRef).then(doc => {
            if (!doc.exists) {
                throw 'Document does not exist'
            }
            transaction.update(docRef, data)
            return data
        })
    }).then(data => {
        console.log('New Data: ', data)
    }).catch(error => {
        console.log(error)
    })
    docRef = firestore.collection('compDetails').doc(compName)
    data = docRef.get().data()
    data.users.push(compName)
    firestore.runTransaction(transaction => {
        return transaction.get(docRef).then(doc => {
            if (!doc.exists) {
                throw 'Document does not exist'
            }
            transaction.update(docRef, data)
            return data
        })
    }).then(data => {
        console.log('New Data: ', data)
    }).catch(error => {
        console.log(error)
    })
}
