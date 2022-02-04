require("dotenv").config();
// Give an opinion on a message
// IE the message above it, or in response to. 



module.exports = function (msg) {
    if (msg.type == "REPLY") {
        message_id = msg.reference['messageId'];
        parent_message = getParent(msg, message_id);
        console.log(parent_message);
        parent_message.react(msg.guild.emojis.cache.get(process.env.MINUSTWOID.trim()));
        msg.reply('I have judged');
        console.log(message_id);
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
