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

    try {

        const conn = await amqp.connect(rabbitSettings);

        const channel = await conn.createChannel();

        const res = await channel.assertQueue('employees');


       channel.consume('employees', message => {
            let employee = JSON.parse(message.content.toString());
            console.log(employee);
       });
    } catch(err) {
        console.error(`Error -> ${err}`);
    }
}