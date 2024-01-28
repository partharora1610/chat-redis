import { Server } from "socket.io";
import Redis from "ioredis";

const pub = new Redis({
  host: "redis-3e3ac339-partharora2233-30ce.a.aivencloud.com",
  port: 18146,
  username: "default",
  password: "AVNS_6vzWzSNPLub9BqKWjoS",
});

const sub = new Redis({
  host: "redis-3e3ac339-partharora2233-30ce.a.aivencloud.com",
  port: 18146,
  username: "default",
  password: "AVNS_6vzWzSNPLub9BqKWjoS",
});

class SocketServer {
  private _io: Server;

  constructor() {
    console.log("Socket server created");
    this._io = new Server({
      cors: {
        origin: "*",
        allowedHeaders: ["*"],
      },
    });
    sub.subscribe("MESSAGES");
  }

  public initListeners(): void {
    const io = this.io;
    io.on("connect", async (socket: any) => {
      socket.on("event:message", async ({ message }: { message: string }) => {
        // Publish this to the redis
        await pub.publish("MESSAGES", JSON.stringify({ message }));
      });
    });

    sub.on("message", (channel, message) => {
      io.emit("event:message", JSON.parse(message));
    });
  }

  get io(): any {
    return this._io;
  }
}

export default SocketServer;
