import { Client, GatewayIntentBits, Collection } from 'discord.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { loadCommands } from './utils/commandLoader';
import { registerEvents } from './utils/eventLoader';

dotenv.config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildVoiceStates],
});

client.commands = new Collection();

async function main() {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/discord-bot');
  console.log('Connected to MongoDB');
  
  await loadCommands(client);
  registerEvents(client);
  
  await client.login(process.env.DISCORD_TOKEN);
}

main().catch(console.error);
