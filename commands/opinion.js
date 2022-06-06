require("dotenv").config();
// Give an opinion on a message
// IE the message above it, or in response to. 



module.exports = function (msg) {
    if (msg.type == "REPLY") {
        message_id = msg.reference['messageId'];
        parent_message = getParent(msg, message_id);
        reactToMessage(parent_message, msg);
        
        //parent_message.react(msg.guild.emojis.cache.get(process.env.MINUSTWOID.trim()));
        //parent_message.react();
        msg.reply('I have judged');
        console.log(parent_message.content);
    }

}

async function getParent(msg, message_id) {
    try {
        return await msg.channel.messages.fetch(message_id);
    }   
    catch (e) {
        console.error("Can't Get Message.", e);
    }
}

async function reactToMessage(msg, m) {
        //await msg.react(msg.guild.emojis.cache.get(process.env.MINUSTWOID.trim()));
        //await msg.react(m.guild.emojis.cache.find(emoji => emoji.id === process.env.MINUSTWOID.trim()));
    try {
        await msg.react(process.env.MINUSTWOID.trim());
    }
    catch (e) {
        console.error("dum error. ", e);
    }
}
