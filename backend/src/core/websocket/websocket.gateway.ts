import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class WsGateway {
  @WebSocketServer()
  server: Server;

  sendUpdateToClients(data: string | object) {
    const payload =
      typeof data === 'string' ? (JSON.parse(data) as object) : data;
    this.server.emit('turnaround', payload);
  }
}
