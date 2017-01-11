var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var fs = require("fs");


var friends = [];
getLocalData(function(){});

function compare(user1, user2){
    var difference = 0;
    for (i = 0; i < user1.scores.length; i++){
        difference += Math.abs(user1.scores[i]-user2.scores[i]);
    }
    return difference;
}

function saveData(){
    fs.writeFile("app/data/friends.txt", JSON.stringify(friends), "utf8", function(){
    });
}

function getLocalData(callback){
    fs.readFile("app/data/friends.txt", "utf8", function(err, data){
        if (err){
        } else {
            friends = JSON.parse(data);
            callback();
        }
    });
}

//Friends Function
function getFriends(request, response) {
    getLocalData(function(){
        response.json(friends);
    });
}

function addFriend(request, response) {
    var newFriend = request.body;
    newFriend.routeName = newFriend.name.replace(/\s+/g, "").toLowerCase();
    var match = findMatch(newFriend, friends);
    friends.push(newFriend);
    saveData();
    response.json(friends[match]);
}

function findMatch(user){
    var bestCompatibility = 100;
    var bestMatchIndex;
    for (var i = 0; i < friends.length; i++){
        var compatibility = compare(user, friends[i]);
        if (compatibility < bestCompatibility){
            bestCompatibility = compatibility;
            bestMatchIndex = i;
        }
    }
    return bestMatchIndex;
}

module.exports = {
    addFriend: addFriend,
    getFriends: getFriends
};
