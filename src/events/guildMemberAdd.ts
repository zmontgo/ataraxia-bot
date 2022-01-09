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
    .setDescription('**We\'ve set up a short process to protect our community. It\'s a three-step process that usually takes less than a minute, we look forward to chatting with you!**')
    .addField(
      'Step One',
      'Click the `Complete` button at the bottom of the screen. This will allow you to send messages here and allow you to move on to step two.'
    )
    .addField(
      'Step Two',
      `Then, introduce yourself here! Be sure to mention all of the following:
  > • What you'd like to be called.
  > • Your age (or whether you're over or under 18).
  > • How you found this server.
  > • What you hope to get out of the community.`
    )
    .addField(
      'Step Three',
      'Finally, make sure to ping the <@&863442752582058024> role to gain the Member role and join the server!'
    );

  return await member.guild.channels.cache
    .get(config.channels.gate)
    .send({
      content: `<@!${member.id}>`,
      embeds: [ welcomePanel ],
    });
};
