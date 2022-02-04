require("dotenv").config();
module.exports = function (msg, args) {
// If user score is - then they only get the bad answers. 
// get current score. 
// if score > 0 then you get the good ones too
// if score < 0 then you just get the bad ones. 
// random number
// choose 
let affirmative = [
    'It is certain.', 
    'it is decidedly so.',
    'Without a doubt.',
    'Yes definitely.',
    'You may rely on it.',
    'As I see it, yes.',
    'Most likely.',
    'Outlook good.',
    'Yes.',
    'Signs point to yes.',
];
let non_commit = [
    'Reply hazy, try again.',
    'Ask again later.',
    'Better not tell you now.',
    'Cannot predict now.',
    'Concentrate and ask again.',
];
let negative = [
    'Don\'t count on it.',
    'My reply is no.',
    'My sources say no.',
    'Outlook not so good.',
    'Very doubtful.',
    ];

wish = msg.content.split(" ");
if (tokens != undefined) {
    const all = affirmative.concat(non_commit, negative);
    const bad = non_commit.concat(negative);

    if (msg.author.id === process.env.TYSONID){
        msg.reply(bad[Math.floor(Math.random() * bad.length)]);
    } else {
        msg.reply(all[Math.floor(Math.random() * all.length)]);
    }
}



}
