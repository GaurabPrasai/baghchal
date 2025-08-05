# Baghchal Online – CS50 Web Final Project  
**Video demo:** [https://youtu.be/wQ3ESM5QZJc](https://youtu.be/wQ3ESM5QZJc)

**Live at:** [https://baghchal-2srv.onrender.com/](https://baghchal-2srv.onrender.com/)

## Introduction

For my final project, I  built an online two-player version of baghchal, a classic Nepali strategy game. I grew up playing this game on  with pebbles, and always wanted to bring it to the web as a multiplayer game. . Most versions available online are either single-player or limited in functionality, so I thought of making a modern multiplayer version.

The app allows users to create an account and then either join or create a game room. Once two players are connected, they can play as goats or tigers on a live board. The game updates in real-time using WebSockets, and the rules — including valid moves, turn logic, and capture rules — are enforced on the backend.

---

## Distinctiveness and Complexity

I believe this project stands out from the ones we built in the course in a few ways. First, it's a **real-time multiplayer game**, which none of our past projects involved. It uses **Django Channels** and WebSockets to let two users play simultaneously, which added a layer of technical depth beyond traditional HTTP.

Second, the game itself isn’t something simple like chat or a blog — it required me to **implement all the rules of Baghchal**, including how goats move, how tigers capture, turn switching, and checking win conditions. This logic lives in a custom Python module(as well as in client side)  I wrote and tested manually with dozens of scenarios.

On the frontend, I used **Vite + React**. I also handled sync between WebSocket messages and the local board state — which wasn't always easy to debug. Plus, I made sure everything works well on both mobile and desktop.

Overall, combining backend game logic, real-time sync, authentication, and a responsive UI made this project more challenging (and satisfying) than the earlier projects.
---

## File Overview

- **`backend/`** – Django backend with two apps:
  - `avatars/`** – Stores uploaded profile pictures.
  - `core/` handles user auth, avatars, and API endpoints.
  - `baghchal/` contains game logic, WebSocket consumer, routing, and views.
  - `board.py` inside `baghchal/` has all the core logic for validating and applying moves.
- **`requirements.txt`** – All Python dependencies.
- **`frontend/`** – Vite + React app:
  - `src/components/` – React components like the board, modals, and user interface.
  - `src/context/` – Auth and WebSocket context providers.
  - `src/routes/` – Pages like Home, Game, Login, Register.

---

## How to Run

### Backend
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

```

### Frontend
   ```bash
   # 1. Navigate to the frontend directory:
   cd frontend
  # 2. Install dependencies:
   npm install
  # 3. Start the development server:
   npm run dev
```
 ___ 
## Notes

- You’ll need to register two accounts to test two-player gameplay in real time.
- react uses browser's local storage so make sure to keep user data so please use different browsers if possible or use a regular window and one in incognito.
- Django Channels handles WebSocket connections; Redis is not required for local testing.

---

If you're reviewing this as part of the CS50 Web staff — thank you!  
This project pushed me beyond the scope of the course and helped me apply everything from real-time communication to frontend state management. Plus, it’s based on a game from my culture, which made building it even more meaningful.
