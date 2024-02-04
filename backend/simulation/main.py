from fastapi import FastAPI
from simulation import Simulation
from Rat.brain import Brain
from sim_manager import SimManager
from pydantic import BaseModel
import json



# client = MongoClient("mongodb+srv://admin:sIn6KCx35V2SaAUF@hackduke.cdt1prw.mongodb.net/")

# db_names = client.list_database_names()
# print(db_names)

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow CORS for all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:8060"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)
# graph = Graph()
sim = ""


class Gorilla(BaseModel):
    id: float
    frontal: float
    occipital: float
    hypothalumus: float
    parietal: float
    cerebellum: float
    posX: float
    posY: float


class Chimp(BaseModel):
    num_food: int
    total_iter: int
    moves_per_iter: int
    map_radius: int
    michael_nums: list = []


@app.get("/")
async def fun():
    return "Hello World!"


@app.post("/anze")
async def astro(query: Chimp):
    sim = Simulation(manager = SimManager(), num_food = 5, total_iter = 20, moves_per_iter = 300, map_radius = 420)
    # brain = Brain(frontal = 100, occipital = 50, hypothalamus = 100, parietal = 100, cerebellum = 100)
    # sim.add_species(brain=brain, num_rats=20)
    # for species in query.michael_nums:
        # brain = Brain(frontal = species[1], occipital = species[2], hypothalamus = species[3], parietal = species[4], cerebellum = species[5])
    brain = Brain(frontal = 100, occipital = 50, hypothalamus = 100, parietal = 100, cerebellum = 100)
    sim.add_species(brain=brain, num_rats=20)
    res = sim.run()
    json_out = sim.res_to_json(res)
    return json_out


# @app.post('/gorilla')
# async def turtle(query: Gorilla):
#     insert(query.lat, query.lng, query.type)
#     return query


# @app.post('/chimp')
# async def turt(query: Chimp):
#     # set backend dest to query.lat, query.lng
#     return graph.navigation(query.lng, query.lat, query.lng2, query.lat2)   # enter the x, y coordinates of both


# @app.get('/dog')
# async def frog():
#     # set backend dest to query.lat, query.lng
#     graph.keep_updated()
#     return 'duuuude'
