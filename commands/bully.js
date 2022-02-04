// just send a dumb insult to the user. 



var insults = [
"You're more disappointing than an unsalted pretzel.",
"You look like you came froma  donation pile.",
"You look like a crunchy lizard.",
"I wish you were a speed bump for my tricycle.",
"If Mr. Rogers was your neighbor, he'd move.",
"You smell like hot dog water.",
"It's impossible to underestimate you.",
];

module.exports = function(msg, args) {
    mention = msg.content.split(" ")[1];
    if (mention != undefined) {
        msg.reply(mention + " " + getInsult()); 
    } else {
    msg.reply(getInsult());
    }    
}


function getInsult() {
    return insults[Math.floor(Math.random() * insults.length)];
}
