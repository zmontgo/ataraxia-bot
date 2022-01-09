import Discord, { ColorResolvable } from 'discord.js';
import config from '../config';

export = async (client, member) => {
  if (member.user.bot) return;

  const embed = new Discord.MessageEmbed()
    .setAuthor(`${member.user.username}#${member.user.discriminator}`, member.user.displayAvatarURL())
    .setTitle(`Member Joined`)
    .setDescription(`${member.user.username}#${member.user.discriminator} joined the server.`)
    .setColor(config.colors.embedColor);
  client.channels.cache.get(config.channels.logs).send(embed);

  const welcomePanel = new Discord.MessageEmbed()
    .setColor(config.colors.embedColor)
    .setTitle('🌛 __**Welcome to Ataraxia!**__ 🌛')
    .setDescription('**We\'ve set up a short process to protect our community. It usually takes less than a minute.**')
    .addField(
      'Introduce Yourself',
      `Be sure to mention all of the following:\n> • What you'd like to be called.\n> • Your age (or whether you're over or under 18).\n> • How you found this server.\n> • What you hope to get out of the community.`
    )
    .addField(
      'Ping Staff',
      'Make sure to ping the <@&863442752582058024> role to gain the Member role and join the server!'
    )
    .setFooter(
      'If you have any issues with this process, please DM <@515919653445304345>.'
    );

  return await member.guild.channels.cache
    .get(config.channels.gate)
    .send({
      content: `<@!${member.id}>`,
      embeds: [ welcomePanel ],
    });
};
