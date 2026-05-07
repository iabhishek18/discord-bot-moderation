import { SlashCommandBuilder, PermissionFlagsBits, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
import { Warning } from '../database/models';

export const ban = {
  data: new SlashCommandBuilder().setName('ban').setDescription('Ban a member').addUserOption(o => o.setName('user').setDescription('User to ban').setRequired(true)).addStringOption(o => o.setName('reason').setDescription('Reason')).setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
  async execute(interaction: ChatInputCommandInteraction) {
    const user = interaction.options.getUser('user', true);
    const reason = interaction.options.getString('reason') || 'No reason provided';
    const member = interaction.guild?.members.cache.get(user.id);
    if (!member?.bannable) return interaction.reply({ content: 'Cannot ban this user', ephemeral: true });
    await member.ban({ reason });
    const embed = new EmbedBuilder().setColor(0xff0000).setTitle('🔨 Member Banned').addFields({ name: 'User', value: user.tag }, { name: 'Reason', value: reason }, { name: 'Moderator', value: interaction.user.tag });
    await interaction.reply({ embeds: [embed] });
  }
};

export const warn = {
  data: new SlashCommandBuilder().setName('warn').setDescription('Warn a member').addUserOption(o => o.setName('user').setDescription('User').setRequired(true)).addStringOption(o => o.setName('reason').setDescription('Reason').setRequired(true)).setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),
  async execute(interaction: ChatInputCommandInteraction) {
    const user = interaction.options.getUser('user', true);
    const reason = interaction.options.getString('reason', true);
    await Warning.create({ guildId: interaction.guildId, userId: user.id, moderatorId: interaction.user.id, reason });
    const count = await Warning.countDocuments({ guildId: interaction.guildId, userId: user.id });
    const embed = new EmbedBuilder().setColor(0xffaa00).setTitle('⚠️ Warning Issued').addFields({ name: 'User', value: user.tag }, { name: 'Reason', value: reason }, { name: 'Total Warnings', value: `${count}` });
    await interaction.reply({ embeds: [embed] });
    if (count >= 3) { const member = interaction.guild?.members.cache.get(user.id); if (member) await member.timeout(24 * 60 * 60 * 1000, 'Auto-timeout: 3 warnings'); }
  }
};
