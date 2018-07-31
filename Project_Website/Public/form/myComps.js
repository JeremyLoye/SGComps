'use strict';

const firestore = firebase.firestore();
const settings = { /* your settings... */
    timestampsInSnapshots: true
};

const storage = firebase.storage()

firestore.settings(settings)

function generateList(uid) {
    firestore.collection('userDetails').doc(uid).get().then(doc => {
        let compsInvolved = doc.data().compsInvolved
        let cardNum = 0
        for (let i = 0; i < compsInvolved.length; i++) {
            firestore.collection('compDetails').doc(compsInvolved[i]).get().then(doc => {
                let cardId = 'card' + cardNum
                let data = doc.data()
                let storageRef = storage.refFromURL(`gs://sgcomps-b8fdc.appspot.com/${data.photoPath}`)
                storageRef.getDownloadURL().then(url => {
                    console.log(url)
                    $(`#${cardId}`).css('background', 'url(' + url + ')').css('background-size', '100% 100%')
                })
                $(document).ready(() => {
                    $('.listing').append('<div class="demo-card-wide mdl-card mdl-shadow--2dp">' +
                        `<div class="mdl-card__title" id="${cardId}">` +
                        `<p class='competitionTag'>${data.comp_type}</p>` +
                        '<h2 class="mdl-card__title-text">' + data.compName + '</h2>' +
                        '</div>' +
                        '<div class="mdl-card__supporting-text">' +
                        '<p>' + data.details + '</p>' +
                        `<p>When: ${data.date}</p>` +
                        '</div>' + '</div>' + '<style>' +
                        `#${cardId} {` +
                        'color: #fff;' +
                        'height: 240px;' +
                        `background: url("");` +
                        'background-size: cover;' +
                        '} </style>')
                })
                cardNum += 1
            }).catch(error => {
                console.log(error)
            })
        }
    }).catch(error => {
        console.log(error)
    })

}
