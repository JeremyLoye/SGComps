/**
 * Javascript implementation of accessing additional user data from firestore.
 */

'use strict';

var firebase = require('firebase')
var app = firebase.initializeApp({
    apiKey: "AIzaSyDqlaeDVox13ySVHHh0ukCyZepg7QyD0B4",
    authDomain: "sgcomps-b8fdc.firebaseapp.com",
    databaseURL: "https://sgcomps-b8fdc.firebaseio.com",
    projectId: "sgcomps-b8fdc",
    storageBucket: "sgcomps-b8fdc.appspot.com",
    messagingSenderId: "1048240965389"
})

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
    let collection = firestore.collection('userDetails')
    return collection.add(data)
}

exports.AdditionalDetails = new AdditionalDetails() 

