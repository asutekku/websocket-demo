export default class App {

    public static init() {
        const socket = new WebSocket('ws://localhost:8081/');

        socket.onopen = () => {
            App.log('Opened connection 🎉');
            let json: string = JSON.stringify({message: 'Hello'});
            socket.send(json);
            App.log('Sent: ' + json);
        };

        socket.onerror = (event: any) => {
            App.log('Error: ' + JSON.stringify(event));
        };

        socket.onmessage = (event: any) => {
            App.log('Received: ' + event.data);
        };

        socket.onclose = () => {
            App.log('Closed connection 😱');
        };

        document.querySelector('#close')!.addEventListener('click', () => {
            socket.close();
            App.log('Closed connection 😱');
        });

        document.querySelector('#send')!.addEventListener('click', () => {
            let json: string = JSON.stringify({message: 'Hey there'});
            socket.send(json);
            App.log('Sent: ' + json);
        });

        window.addEventListener('beforeunload', () => {
            socket.close();
        });
    }

    static log(text: string): void {
        let li = document.createElement('li');
        li.textContent = text;
        document.getElementById('log')!.appendChild(li);
    }
}