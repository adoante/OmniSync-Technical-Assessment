# Fullstack Web Developer Assessment

### Instructions for running the project locally
1. Prerequisites
- [Docker](https://docs.docker.com/get-docker/) installed and running
- Git installed

2. Clone the repository
```bash
git clone https://github.com/adoante/OmniSync-Technical-Assessment.git
cd OmniSync-Technical-Assessment
```

3. Start up the docker container
```bash
docker compose up --build
```

4. Go to localhost website<br>
- [http://localhost:3000]()
- check docker logs if above link doesn't work
---
### Tech Stack

- **Frontend**: React + TypeScript
- **Backend**: Next.js for fullstack
- **Database**: PostgreSQL
- **Styling** TailwindCSS
- **Deployment**: Docker
---
### Frontend Requirements

- [x] Display eight cards, numbered 1 through 8, laid out in a 2x4 grid.
- [x] The layout should be responsive for mobile.

Each card should:
- [x] Show its number, centered.
- [x] Display the total number of clicks it has received.
- [x] Display the timestamp of its first click.

Clicking a card should:
- [x] Only register the first click for order tracking.
- [x] Always increment its click counter.
- [x] Save all click data to the PostgreSQL database.

Implement sorting options for the cards:
- [x] Most clicks → Fewest clicks
- [x] First clicked → Last clicked

Include a **Clear** button that:
- [x] Resets card order to original (1 → 8).
- [x] Resets all click counts and timestamps.
- [x] Reflects these changes both in the UI and the database.

Bonus Ideas (Optional)
- [ ] Add a **dark mode** toggle.
- [ ] Add **animations** when cards are clicked or reordered.
---
### Backend + Database Requirements

Use PostgreSQL to store:
- [x] Click count for each card.
- [x] First click timestamp.

On page load, read from the database to:
- [x] Determine the card order (based on first click timestamp).
- [x] Display click count and first-click timestamp.

Provide necessary API routes to:
- [x] Read, write, and update click data.
- [x] Reset the database state when the Clear button is pressed.
---
### Dockerization Requirements

Include a `Dockerfile` and `docker-compose.yml` file that:
- [x] Spins up both the frontend and backend services.
- [x] Starts a local PostgreSQL instance with a seeded schema/table for the card data.
- [x] app can be launched with a single `docker-compose up` command.

