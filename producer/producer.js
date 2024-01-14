const amqp = require('amqplib');

const rabbitSettings = {
    protocol: 'amqp',
    hotname: 'localhost',
    port: 5672,
    username: 'claytonckob',
    password: 'claytonckob',
    vhost: '/',
    authMechanism: ['PLAIN', 'AMQPLAIN', 'EXTERNAL']
}

connect();

async function connect(){

    const msgs = [
        {'name': 'clayton', 'enterprise':'Google'},
        {'name': 'kaua', 'enterprise':'Netflix'},
    ];

    try {

        const conn = await amqp.connect(rabbitSettings);

        const channel = await conn.createChannel();

        const res = await channel.assertQueue('employees');


        for(msg in msgs) {
            await channel.sendToQueue('employees', Buffer.from(JSON.stringify(msgs[msg])));
        }
    } catch(err) {
        console.error(`Error -> ${err}`);
    }
}