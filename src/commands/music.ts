import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
import { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } from '@discordjs/voice';
import ytdl from 'ytdl-core';

const queues = new Map<string, { songs: Array<{ title: string; url: string }>; player: ReturnType<typeof createAudioPlayer> }>();

export const play = {
  data: new SlashCommandBuilder().setName('play').setDescription('Play a song').addStringOption(o => o.setName('query').setDescription('YouTube URL or search').setRequired(true)),
  async execute(interaction: ChatInputCommandInteraction) {
    const member = interaction.guild?.members.cache.get(interaction.user.id);
    const voiceChannel = member?.voice.channel;
    if (!voiceChannel) return interaction.reply({ content: 'Join a voice channel first!', ephemeral: true });

    const query = interaction.options.getString('query', true);
    await interaction.deferReply();
    
    const songInfo = await ytdl.getInfo(query);
    const song = { title: songInfo.videoDetails.title, url: query };
    
    let queue = queues.get(interaction.guildId!);
    if (!queue) {
      const player = createAudioPlayer();
      const connection = joinVoiceChannel({ channelId: voiceChannel.id, guildId: interaction.guildId!, adapterCreator: interaction.guild!.voiceAdapterCreator });
      connection.subscribe(player);
      queue = { songs: [], player };
      queues.set(interaction.guildId!, queue);
      
      player.on(AudioPlayerStatus.Idle, () => {
        queue!.songs.shift();
        if (queue!.songs.length > 0) playSong(queue!);
        else { queues.delete(interaction.guildId!); connection.destroy(); }
      });
    }
    
    queue.songs.push(song);
    if (queue.songs.length === 1) playSong(queue);
    
    const embed = new EmbedBuilder().setColor(0x1db954).setTitle('🎵 Added to Queue').setDescription(song.title);
    await interaction.editReply({ embeds: [embed] });
  }
};

function playSong(queue: { songs: Array<{ title: string; url: string }>; player: ReturnType<typeof createAudioPlayer> }) {
  const stream = ytdl(queue.songs[0].url, { filter: 'audioonly', quality: 'highestaudio' });
  const resource = createAudioResource(stream);
  queue.player.play(resource);
}
