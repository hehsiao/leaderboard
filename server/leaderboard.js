Meteor.publish('thePlayers', function() {
  var currentUserId = this.userId;
  return PlayersList.find({createdBy: currentUserId})
});

Meteor.methods({
  'sendLogMessage': function() {
    console.log('Hello world');
  },
  'addPlayer': function(playerNameVar, playerPoints) {
    var currentUserId = Meteor.userId();
    if (PlayersList.find({name: playerNameVar}).count() === 0) {
      PlayersList.insert({
        name: playerNameVar, 
        score: parseInt(playerPoints),
        createdBy: currentUserId
      });
    } else {
      alert(playerNameVar + " already exists!");
    }
  },
  'removePlayerData': function(selectedPlayer) {
    PlayersList.remove(selectedPlayer);
  },
  'modifyPlayerScore': function(selectedPlayer, scoreValue) {
    PlayersList.update(selectedPlayer, {$inc: {score: scoreValue} });
  }
});