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
### Notes on the development process
Overall a very interesting and fun project that hits every full stack skill. I'm glad to have completed the project.
It really exposed some weaknesses that I worked through and am better equipped to handle now.

The project was familiar to me because of my previous experience with React + JavaScript/TypeScript projects,
especially my choice of Next.js for the Frontend. Creating the Card component and the home page was easy
and so was the logic without database integration.

The newest aspect to me for this project was using Next.js App Router for the API. I am more familiar with
FastAPI/Pydantic but I thought that the core principles translated well. I did get confused for a few commits.
I was reading Next.js Page Router docs for a while and couldn't figure out why I was getting a 500 internal error.
Eventually, I realized I reading the wrong docs!

Integrating the database with the logic for the home page did cause me some trouble. At first I was making API calls
every time a Card was clicked to update its click counter! It the updating click counter on the card was slow and
inaccurate to what was being recorded in the database. I decided to update the database on set interval with the
current click counts which lets the user spam clicks with an immediante visual update on the card. The biggest
draw back is that at most the database is of sync from the client by the update interval time. I think adding a
debounce where after a period of no clicking an API request is made to update the database would have imporved 
syncing.

For the database I decided not to use an ORM. I would normally use SQLModel/SQLAlchemy with FastAPI to define
schemas and request/response models but considering the time frame I went with the "pg" package and wrote SQL
queries to grab from the postgreSQL database. In hindsight using an ORM like Prisma might have some more time
and headache but that's just another lesson to learn from.

Thanks for reading!<br>
Best, <br>
Adolfo Gante

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

