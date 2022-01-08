import config from '../config';
import { BotStats } from '../databaseFiles/connect';

export = async (client) => {

  var now = Date.now();

  BotStats.updateOne(
    { bot: client.user.id },
    {
      $set: {
        bot: client.user.id,
        upSince: now,
      },
    },
    {
      upsert: true,
    }
  );

  console.log(
    `Running on ${client.channels.cache.size} channels on ${client.guilds.cache.size} servers.`
  );
  client.user.setActivity(config.playing);
};
