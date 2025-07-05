import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: { origin: '*' },
})
export class WsGateway {
  @WebSocketServer()
  server!: Server;

  sendUpdateToClients(data: string): void {
    this.server.emit('turnaround-event', data);
  }
}
