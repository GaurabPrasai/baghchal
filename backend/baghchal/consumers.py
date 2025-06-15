from channels.generic.websocket import AsyncWebsocketConsumer
import json
class GameConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()
        print("websocket connected")

    async def disconnect(self, code):
        print("websocket closed")

    async def receive(self, text_data):
        message = json.loads(text_data)['message']
        print(f"text data received: {message}")

        # echo the message back
        await self.send(json.dumps(message))