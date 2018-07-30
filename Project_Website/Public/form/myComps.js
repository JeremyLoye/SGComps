'use strict';

const firestore = firebase.firestore();
const settings = { /* your settings... */
    timestampsInSnapshots: true
};

firestore.settings(settings)

function generateList(uid) {
    firestore.collection('userDetails').doc(uid).get().then(doc => {
        let compsInvolved = doc.data().compsInvolved
        for (let i = 0; i < compsInvolved.length; i++) {
            firestore.collection('compDetails').doc(compsInvolved[i]).get().then(doc => {
                let data = doc.data()
                $(document).ready(() => {
                    $('.listing').append('<div class="demo-card-wide mdl-card mdl-shadow--2dp">' +
                        '<div class="mdl-card__title">' +
                        '<h2 class="mdl-card__title-text">' + data.compName + '</h2>' +
                        '</div>' +
                        '<div class="mdl-card__supporting-text">' +
                        '<p>' + data.details + '</p>' +
                        '</div>' + '</div>')
                })
            }).catch(error => {
                console.log(error)
            })
        }
    }).catch(error => {
        console.log(error)
    })

}