from channels.generic.websocket import AsyncWebsocketConsumer
import json
class GameConsumer(AsyncWebsocketConsumer):
    def connect(self):
        self.accept()
        
        text_data = json.dumps({
            "type": "connection established",
            "message":"you're connected to the server"
        })

        self.send(text_data)