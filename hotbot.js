require("dotenv").config();
const commandHandler = require("./commands");
const https = require('https');
const {Client, Intents } = require('discord.js');
const Sequelize = require('sequelize');
global.client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS]});
const initModels = require("./tables/init-models");
module.exports = { client };


// Connect to db. 
var host = process.env.DB_HOST.trim();
const sequelize = new Sequelize(process.env.DB_NAME.trim(), process.env.DB_USER.trim(), process.env.DB_PASS.trim(), {
    host: host,
    dialect: 'sqlite',
    logging : false,
    storage: 'database.sqlite',
});

const model = initModels(sequelize);

// Check Damians Stream.
function checkStream() {
const token = '9nkxzojanf615rb8m968vt99t0h36g';
const url = 'https://api.twitch.tv/helix/streams?user_login=threelargeducks';
var options = {
    method: 'GET',
    url: url,
    headers: {'content-type': 'application/json', 
              'Authorization': 'Bearer ' + token  },
    }
const req = https.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`);

    res.on('data', d => {
        console.log(d);
    });
});

req.on('error', error => {
    console.error(error);
});

req.on('uncaughtException', error => {
    console.error(error);
});
req.end();
// this works, just need to figure out how to tell if the stream is live or not. 
//console.log("Here");
}

// Create Model. 
// Table:
/**
Id | UserName | Score | 
**/
const Table = sequelize.define('score', {
    user_id: {
        type: Sequelize.STRING,
        unique: true,
    },
    score: {
        type: Sequelize.INTEGER, 
        defaultValue: 0,       
        allowNull: false,
    },
});


//client.user.setActivity('eating ass', {type: 'Competing'});
client.once('ready', () => {
    Table.sync();
    testConnection();
    console.log('READY!');
    //client.setInterval(checkStream(), 600000);
   // setInterval(checkStream, 5000);
});

// Create In table
client.on('messageCreate', createScore);

/**
client.on('messageCreate', async (msg) => {
    let tokens = msg.content.split(" ");
    if (tokens[0].toLowerCase() === "we" && tokens[1].toLowerCase() === "should") {
        msg.reply("Yes, we should! Count me in!!!");
        return;
    }
    return;
}); 
**/

// watch for reactions. 
client.on('messageReactionAdd', (reaction, user) => {
    if (reaction.emoji.id === process.env.MINUSTWOID.trim() || reaction.emoji.id === process.env.PLUSTWOID.trim()) {
        updateScore(reaction, user);
        return;
    }
    return;

});

// Watch for removals? 
client.on('messageReactionRemove', (reaction, user) => {
    if (reaction.emoji.id === process.env.MINUSTWOID.trim() || reaction.emoji.id === process.env.PLUSTWOID.trim()) {
        updateScore(reaction, user, true);
        return;
    }
    return;
});

client.on('messageCreate', commandHandler);

client.login(process.env.BOTTOKEN);


async function testConnection () {
    try {
        await sequelize.authenticate();
        console.log("Connection To Database Working");
    } catch (e) {
        console.error('Unable to connect to Database:', e);
    }
}

// Create a column if the user doesn't exist. 
async function createScore(msg) {
try {
    const score = await Table.create({
        user_id: msg.author.id,
        score: 0 
        });
    } catch (e) {
    if (e.name === 'SequelizeUniqueConstraintError') {
        //console.log('Score Already Exists In Table.');
        return;
    }
        console.log('Something Went Wrong', e.name);
        return;
    }
}
// Update the score of the user. 
async function updateScore(reaction, user, reaction_removed=false) {
    //console.log('update score');
    author_id = reaction.message.author.id;
    reactor_id = user.id;
    server_id = reaction.message.guild.id;
    update_score = 0;
    reaction_removal = 1;
    
    if (reaction_removed) {
        reaction_removal = -1;
    }

    if (author_id == reactor_id) {
        //console.log('Author Cannot vote themselves');
        return;
    }
    
    if (server_id != process.env.SERVERID.trim()) {
        //console.log('Wrong Server');
        return;    
    }

    if (reaction.emoji.id === process.env.MINUSTWOID.trim()) {
        //console.log("decrease");
        //console.log(reaction_removal);
        update_score = -2 * reaction_removal;

    }
    if (reaction.emoji.id === process.env.PLUSTWOID.trim()) {
        //console.log("increase");
        update_score = 2 * reaction_removal;
    }
    const current_score = await Table.findOne({ where: { user_id: author_id } });
    new_score = current_score.get("score") + update_score;
    const affected_user = await Table.update({ score: new_score }, { where : {user_id: author_id } });
    
    if (affected_user > 0) {
        //console.log("Score Updated");
        return; 
    }
        console.log("Couldn't update score.");
        return; 

}

