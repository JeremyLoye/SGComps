/**
 * Javascript implementation of accessing additional user data from firestore.
 */

'use strict';

const Firestore = require('@google-cloud/firestore')

const firestore = new Firestore({
    projectId: 'sgcomps-b8fdc',
    keyFilename: 'public/serviceAccountKey.json',
})

if (typeof exports == "undefined") {
    exports = this;
}

function AdditionalDetails() {
    this.init();
};

AdditionalDetails.prototype = {
    init: function () {
        console.log('hello world')
    }
}


AdditionalDetails.prototype.addUser = function (data) {
    console.log('user added: ', data)
    let collection = firestore.collection('userDetails')
    return collection.doc(data.uid).set(data)
}

AdditionalDetails.prototype.getUser = function (uid) {
    return firestore.collection('userDetails').doc(uid).get()
}

AdditionalDetails.prototype.updateUser = function (uid, data) {
    let docRef = firestore.collection('userDetails').doc(uid)
    
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

exports.AdditionalDetails = new AdditionalDetails()