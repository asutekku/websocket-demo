import * as http from 'http';
import * as express from "express";
import {Server as WSS} from 'ws';

export default class AppServer {
    public static init(): void {
        const app: express.Application = express().use(express.static('public'));
        const server: http.Server = http.createServer(app);
        server.listen(8080, '127.0.0.1');

        const wss: WSS = new WSS({port: 8081});
        wss.on('connection', socket => {
            console.log('Opened Connection 🎉');

            let json: string = JSON.stringify({message: 'Gotcha'});
            socket.send(json);
            console.log('Sent: ' + json);

            socket.on('message', message => {
                console.log('Received: ' + message);

                wss.clients.forEach(client => {
                    let json = JSON.stringify({message: 'Something changed'});
                    client.send(json);
                    console.log('Sent: ' + json);
                });
            });

            socket.on('close', () => {
                console.log('Closed Connection 😱');
            });

        });

        let broadcast = (): void => {
            let json: string = JSON.stringify({
                message: 'Hello hello!'
            });

            wss.clients.forEach(client => {
                client.send(json);
                console.log('Sent: ' + json);
            });
        };

        setInterval(broadcast, 3000);
    }
}