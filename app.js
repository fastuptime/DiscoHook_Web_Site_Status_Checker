const axios = require('axios');
const { EmbedBuilder, WebhookClient } = require('discord.js');

const client = new WebhookClient({ url: 'https://discord.com/api/webhooks/XXXXXXXXXXXXXX/XXXXXXX' });

async function checkSite(url) {
    try {
        const response = await axios.get(url);
        return response.status === 200 ? true : false;
    } catch (error) {
        return false;
    }
}

async function main() {
    const siteIsUp = await checkSite('https://fastuptime.com');
    const embed = new EmbedBuilder()
        .setColor(siteIsUp ? 0x00ff00 : 0xff0000) // Green: 0x00ff00, Red: 0xff0000
        .setDescription(siteIsUp ? 'FastUptime is back up!' : 'FastUptime is down!')
        .setFooter({ text: 'Team FastUptime' })
    client.edit({ name: siteIsUp ? 'FastUptime' : 'FastUptime is down!', avatar: 'https://i.hizliresim.com/rzzy0d0.jpg' });
    client.send({ embeds: [embed] });
}

main();

setInterval(main, 1000 * 60 * 5); // 5 minutes