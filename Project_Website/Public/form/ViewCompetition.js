'use strict';

function ViewCompetition() {
    this.init();
};

function toTimeStamp(dateString){
  var str = dateString;
  var res = str.slice(0, 10);
  return new Date(res.split('/').reverse().join('/')).getTime()
}

ViewCompetition.prototype.getAllCompetitions = function(render) {
  var query = firebase.firestore().collection('compDetails').orderBy(toTimeStamp('date')).limit(50);
  this.getDocumentsInQuery(query, render);
};

ViewCompetition.prototype.viewComps = function() {
  this.getAllCompetitions();
};

function gotData(data){
  console.log(data.val());
}
