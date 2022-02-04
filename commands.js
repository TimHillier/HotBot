const magicEight = require("./commands/magicEight.js");
const get_score = require("./commands/score.js");
const set_remind = require("./commands/remind.js");
const set_score = require("./commands/setScore.js");
const give_score = require("./commands/giveScore.js");
const leader_board = require("./commands/leaderBoard.js");
const bottom_place = require("./commands/bottom.js");
const bully_user = require("./commands/bully.js");
const opinion_message = require("./commands/opinion.js");
module.exports = async function (msg) {

// List of Commands. 
const commands = {
    //eightball: magicEight,
    score: get_score,
    remind: set_remind,
    setScore: set_score,
    give: give_score,
    leaderBoard: leader_board,
    top: leader_board,
    bottom: bottom_place,
    bully: bully_user,
    opinion: opinion_message,
}

// Split message into tokens. 
let tokens = msg.content.split(" ");

// Get the command. 
let command = tokens.shift();

    if (command.charAt(0) === "!") {
        command = command.substring(1);   
        if (commands[command]) {
            commands[command](msg, tokens);
        } 

    }

}
