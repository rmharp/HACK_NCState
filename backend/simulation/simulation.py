from Rat.rat import Rat
from Rat.brain import Brain
from sim_manager import SimManager
from typing import List
import numpy as np
import math
import json

class Simulation:
    def __init__(self, manager: SimManager, num_food: int, total_iter: int, moves_per_iter: int, map_radius: int):
        self.manager = manager
        self.num_food = num_food
        self.total_iter = total_iter
        self.moves_per_iter = moves_per_iter
        self.map_radius = map_radius
        self.curr_iter = 0

        for _ in range(num_food):
            theta = np.random.uniform(0, 2 * math.pi)
            length = np.random.uniform(0, map_radius)
            pos = length * np.array([math.cos(theta), math.sin(theta)])
            self.manager.active_food.append(pos)
    
    def add_species(self, brain:Brain, num_rats: int):
        for _ in range(num_rats):
            rat = Rat(manager=self.manager, position=np.array([0, 0]), brain=brain)
            rat.spawn(map_radius=self.map_radius)
            self.manager.active_rats.append(rat)


    def run(self) -> List[List[list]]:
        iter_data: List[List[list]] = []

        for _ in range(self.total_iter):
            move_data: List[list] = [[x.position.tolist() for x in self.manager.active_rats]]
            for _ in range(self.moves_per_iter):
                positions = []
                for rat in self.manager.active_rats:
                    rat_pos = rat.update(self.manager.active_food, self.map_radius)
                    if rat_pos is not None:
                        positions.append(rat_pos.tolist())
                move_data.append(positions)
            iter_data.append(move_data)
                    
            self.manager.reset_round(self.map_radius)
            for _ in range(self.num_food):
                theta = np.random.uniform(0, 2 * math.pi)
                length = np.random.uniform(0, self.map_radius)
                pos = length * np.array([math.cos(theta), math.sin(theta)])
                self.manager.active_food.append(pos)

        json_string = json.dumps(iter_data)
        return json_string
        

if __name__ == "__main__":
    seed = 123
    sim_manager = SimManager()
    sim = Simulation(manager = sim_manager, num_food = 1, total_iter = 5, moves_per_iter = 10, map_radius = 100)
    brain = Brain(frontal=100, occipital=100, hypothalamus=100, parietal=100, cerebellum=100)
    sim.add_species(brain=brain, num_rats=12)
    sim_res = sim.run()
    #print("sim data:", sim_res)
    #print("iters:", len(sim_res))
    #print("moves_per_iter:", len(sim_res[0]))
    #print("rats per move:", len(sim_res[0][0]))