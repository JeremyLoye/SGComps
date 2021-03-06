'use strict';

const firestore = firebase.firestore()
const settings = { /* your settings... */
    timestampsInSnapshots: true
};

const storage = firebase.storage()

firestore.settings(settings)

function viewCards(userData) {
    firestore.collection('compDetails').orderBy('date').limit(50).get().then(function (querySnapshot) {
        let user = firebase.auth().currentUser
        let cardNum = 0
        querySnapshot.forEach(function (doc) {
            let cardId = 'card' + cardNum
            let data = doc.data()
            let compName = data.compName
            let register
            let storageRef = storage.refFromURL(`gs://sgcomps-b8fdc.appspot.com/${data.photoPath}`)
            storageRef.getDownloadURL().then(url => {
                console.log(url)
                $(`#${cardId}`).css('background', 'url(' + url + ')').css('background-size', '100% 100%')
            })
            if (userData.orgName) {
                register = ''
            } else if (data.participants.indexOf(user.uid) == -1) {
                register = `<button value="${compName}" onclick="updateData(this.value)">Register</button>`
            } else {
                register = '<p>Registered</p>'
            }

            $(document).ready(() => {
                $('.listing').append('<div class="demo-card-wide mdl-card mdl-shadow--2dp">' +
                    `<div class="mdl-card__title" id="${cardId}">` +
                    `<p class='competitionTag'>${data.comp_type}</p>` +
                    '<h2 class="mdl-card__title-text">' + data.compName + '</h2>' +
                    '</div>' +
                    '<div class="mdl-card__supporting-text">' +
                    '<p>' + data.details + '</p>' +
                    `<p>When: ${data.date}</p>` +
                    '</div>' +
                    '<div class="mdl-card__actions mdl-card--border">' +
                    register +
                    '</div>' + '<style>' +
                    `#${cardId} {` +
                    'color: #fff;' +
                    'height: 240px;' +
                    `background: url("");` +
                    'background-size: contain;' +
                    '} </style>'
                )
            })
            cardNum += 1
        })
    })
}

function updateData(compName) {
    console.log(compName)
    let user = firebase.auth().currentUser
    let docRef = firestore.collection('userDetails').doc(user.uid)
    console.log(docRef)
    docRef.get().then(doc => {
        let data = doc.data()
        if (!data.compsInvolved) {
            data.compsInvolved = []
        }
        data.compsInvolved.push(compName)
        console.log(data.compsInvolved)
        docRef.update(data).then(() => {
            console.log('Doc updated successfully.')
        })
    }).catch(error => {
        console.log(error)
    })

    let compRef = firestore.collection('compDetails').doc(compName)
    compRef.get().then(doc => {
        let data = doc.data()
        if (!data.participants) {
            data.participants = []
        }
        data.participants.push(user.uid)
        compRef.update(data).then(() => {
            console.log('Doc updated successfully.')
            window.location = '/home'
            alert('Registration Successful')
        })
    }).catch(error => {
        console.log(error)
    })
}
