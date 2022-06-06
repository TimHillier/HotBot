const {
    Interaction, 
    GuildMember, 
    Snowflake,
    } = require('discord.js');
const {
    AudioPlayerStatus,
    AudioResource,
    entersState,
    joinVoiceChannel,
    VoiceConnectionStatus,
    } = require('@discordjs/voice');

const Track = require('./music/track.ts');
const MusicSubscription = require('./music/subscription.ts');

//import Discord, { Interaction, GuildMember, Snowflake } from 'discord.js';
/**
import {
    AudioPlayerStatus,
    AudioResource,
    entersState,
    joinVoiceChannel,
    VoiceConnectionStatus,
} from '@discordjs/voice';
**/

//import { Track} from './music/track';
//import { MusicSubscription } from './music/subscription';

module.exports = async function (msg, args) {
    const subscriptions = new Map();
    let subscription = subscriptions.get(msg.guildID);
    
    const url = args[1]
    
    if (!subscription) {
        if (msg.member.voice.channel) {
            const channel = msg.member.voice.channel;
            subscription = new MusicSubscription(
                joinVoiceChannel({
                    channelId: channel.id,
                    guildId: channel.guild.id,
                    adapterCreator: channel.guild.voiceAdapterCreator,
                }),
            );
        }
    }   

    if (!subscription) {
        console.log('Join A voice Channel');
        return;
    }   
    
    try {
        await entersState(subscription.voiceConnection, VoiceConnectionStatus.Ready, 20e3);
    } catch (e) {
        console.warn(e);
        return;
    }
    
    try {
        //attempt to create track. 
        const track =  await Track.from(url, {
            onStart() {
                console.log("Now Playing");
            },
            onFinish() {
                console.log("Finished");
            },
            onError(e) {
                console.log("Error: ${e.message}");
            },
        });
        // Enqueue
        subscription.enqueue(track);
        msg.reply("Enquued **${track.title}**");
    } catch (e) {
        console.warn(e);
        msg.reply("Error");
    }

    
}

