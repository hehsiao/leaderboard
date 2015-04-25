Meteor.subscribe('thePlayers');

console.log("Hello client ");

Template.leaderboard.events({
  'click .player': function(){
    var playerId = this._id;
    var playerName = this.name;
    Session.set('selectedPlayer', playerId);
    Session.set('selectedPlayerName', playerName);
  },
  'click .increment': function(){
    var selectedPlayer = Session.get('selectedPlayer');
    Meteor.call('modifyPlayerScore', selectedPlayer, 5);
  },
  'click .decrement': function(){
    var selectedPlayer = Session.get('selectedPlayer');
    Meteor.call('modifyPlayerScore', selectedPlayer, -5);
  },
  'click .remove': function(){
    var selectedPlayer = Session.get('selectedPlayer');
    var name = Session.get('selectedPlayerName');
    if (confirm ('Delete ' + name + '?')) {
      Meteor.call('removePlayerData', selectedPlayer);
    }
  }
});

Template.leaderboard.helpers({
  'player': function(){
    var currentUserId = Meteor.userId();
    return PlayersList.find({}, 
                            {sort: {score: -1, name: 1}});
  },
  'selectedClass': function(){
    var playerId = this._id;
    var selectedPlayer = Session.get('selectedPlayer');
    if(playerId == selectedPlayer){
      return "selected"
    }
  },
  'showSelectedPlayer': function(){
    var selectedPlayer = Session.get('selectedPlayer');
    return PlayersList.findOne(selectedPlayer)
  }
});

Template.addPlayerForm.events({
  'submit form': function(){
    event.preventDefault();
    var playerNameVar = event.target.playerName.value;
    var playerPoints = event.target.playerScore.value;

    event.target.playerName.value = "";
    event.target.playerScore.value = "";

    Meteor.call('addPlayer', playerNameVar, playerPoints);
    Meteor.call('sendLogMessage');
  }
});