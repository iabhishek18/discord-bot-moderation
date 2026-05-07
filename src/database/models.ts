import mongoose, { Schema } from 'mongoose';

const warningSchema = new Schema({ guildId: { type: String, required: true, index: true }, userId: { type: String, required: true, index: true }, moderatorId: String, reason: String }, { timestamps: true });
export const Warning = mongoose.model('Warning', warningSchema);

const levelSchema = new Schema({ guildId: { type: String, required: true }, userId: { type: String, required: true }, xp: { type: Number, default: 0 }, level: { type: Number, default: 1 }, messages: { type: Number, default: 0 } }, { timestamps: true });
levelSchema.index({ guildId: 1, userId: 1 }, { unique: true });
levelSchema.index({ guildId: 1, xp: -1 });
export const Level = mongoose.model('Level', levelSchema);

const guildConfigSchema = new Schema({ guildId: { type: String, required: true, unique: true }, prefix: { type: String, default: '!' }, welcomeChannel: String, logChannel: String, autoRoles: [String], antiSpam: { type: Boolean, default: true }, maxWarnings: { type: Number, default: 3 } });
export const GuildConfig = mongoose.model('GuildConfig', guildConfigSchema);
