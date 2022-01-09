import config from '../config';
import Discord from 'discord.js';

export = async (client, oldMember, newMember) => {
  if (newMember.roles.cache.some(role => role.id === config.roles.patreon) && !oldMember.roles.cache.some(role => role.id === config.roles.patreon)) {
    const patreonMsg = new Discord.MessageEmbed();
    patreonMsg.color = config.colors.embedColor;
    patreonMsg.title = `🎉 New Patron 🎉`;
    patreonMsg.description = `Please welcome **<@${newMember.id}>** as a new Patron.\n\nThank you for your generosity, it help keeps this server running!`;

    return await client.channels.cache
      .get(config.channels.patreon)
      .send({embeds: [ patreonMsg ]});
  }

  
  if (newMember.roles.cache.some(role => role.id === config.roles.member) && !oldMember.roles.cache.some(role => role.id === config.roles.member)) {
    config.roles.separators.forEach(async (separator) => {
      try {
        const separatorRole = newMember.guild.roles.cache.find(role => role.id === separator);

        await newMember.roles.add(separatorRole);
      } catch(err) {
        console.log(err);
      }
    });

    try {
      // Add roles and send welcome message to the welcome channel
      newMember.guild.channels.cache
        .get(config.channels.welcome)
        .send(
          `🎉 **A new member has arrived!** 🎉\nPlease welcome <@${newMember.id}> to the **Prayer Room Discord** <@&${config.roles.welcome}> team!\nWe're so glad you've joined. :blush:`
        )
        .then((message) => {
          message.react(config.emotes.wave);
        });
    } catch (err) {
      console.error(err);
    }
  }
};
