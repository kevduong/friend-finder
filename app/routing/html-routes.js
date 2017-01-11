var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

function home(request, response){
  response.sendFile(path.join(__dirname, "../public/home.html"));
}

function survey(request, response){
  response.sendFile(path.join(__dirname, "../public/survey.html"));
}

function catchAll(request, response){
  response.redirect("/");
}

module.exports = {
    catchAll: catchAll,
    home: home,
    survey: survey
};
