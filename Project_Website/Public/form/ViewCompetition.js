'use strict';

const firestore = firebase.firestore();
const settings = {/* your settings... */
  timestampsInSnapshots: true
};

firestore.settings(settings);

firebase.firestore().collection('compDetails').orderBy('date').limit(50).get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        console.log(doc.id, " => ", doc.data());
    });
});
