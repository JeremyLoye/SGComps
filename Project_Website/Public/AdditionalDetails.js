/**
 * Javascript implementation of accessing additional user data from firestore.
 */

'use strict';

const Firestore = require('@google-cloud/firestore')

const firestore = new Firestore({
    projectId: 'sgcomps-b8fdc',
    keyFilename: 'public/serviceAccountKey.json',
})

if(typeof exports == "undefined"){
    exports = this;
}

function AdditionalDetails() {
    this.init();
};

AdditionalDetails.prototype = {
    init: function() {
         console.log('hello world')
    }
};


AdditionalDetails.prototype.addUser = function (data) {
    console.log('user added: ', data)
    let collection = firestore.collection('userDetails')
    return collection.doc(data.uid).set(data)
}

AdditionalDetails.prototype.getUser = function (uid) {
    firestore.collection('userDetails').doc(uid)
      .get()
      .then(doc => {
          if (doc.exists) {
              console.log('User data: ', doc.data())
              return doc.data()
          } else {
              console.log('No such User')
          }
      }).catch(error => {
          console.log('error getting document: ', error)
      })
}

exports.AdditionalDetails = new AdditionalDetails() 

