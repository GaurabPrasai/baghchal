from django.db import models
from core.models import User


class Game(models.Model):
    game_id = models.CharField(primary_key=True, max_length=8, unique=True)

    # created_by = models.ForeignKey(
    #     User, on_delete=models.SET_NULL, null=True, related_name="games_created"
    # )

    goat_player = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, related_name="games_as_goat"
    )

    tiger_player = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, related_name="games_as_tiger"
    )

    winning_player = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, related_name="games_won"
    )
    # ? the object is created after the game is over, so what to store? when player started playing or when the game ended
    # created_at = models.DateTimeField(auto_now_add=True)

    move_data = models.JSONField(default=list)


def __str__(self):
    return f"Game: {self.game_id}\n\t(Goat: {self.goat_player}, Tiger: {self.tiger_player})"
