from Rat.rat import Rat
from Rat.brain import Brain
from sim_manager import SimManager
from typing import List
import numpy as np
import math
import json

class Simulation:
    NEXT_SPECIES_ID = 0
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
            rat = Rat(manager=self.manager, position=np.array([0, 0]), brain=brain, species_id=Simulation.NEXT_SPECIES_ID)
            rat.spawn(map_radius=self.map_radius)
            self.manager.active_rats.append(rat)
        Simulation.NEXT_SPECIES_ID += 1

    def run(self):
        out = dict()
        for i in range(self.total_iter):
            out[f"iteration{i}"] = {}
            for j in range(self.moves_per_iter):
                out[f"iteration{i}"][f"moves_data{j}"] = {}
                out[f"iteration{i}"][f"moves_data{j}"]["rats"] = []
                out[f"iteration{i}"][f"moves_data{j}"]["food"] = []
                for rat in self.manager.active_rats:
                    rat_pos = rat.update(self.manager.active_food, self.map_radius)
                    if rat_pos is None:
                        continue
                    pos = rat.position.tolist()
                    rotation = np.arctan2(rat.dir_vec[1], rat.dir_vec[0])
                    out[f"iteration{i}"][f"moves_data{j}"]["rats"].append([pos[0], pos[1], rotation, rat.species_id])
                for k, food in enumerate(self.manager.active_food):
                    pos = food.tolist()
                    out[f"iteration{i}"][f"moves_data{j}"]["food"].append([pos[0], pos[1]])
            self.manager.reset_round(map_radius=self.map_radius, num_food=self.num_food)
        return out
    
    def res_to_json(self, res):
        json_string = json.dumps(res)
        return json_string
    
    def heat_map_data_out(self, data):
        out_data = []
        data = json.loads(data)
        moves_per_iter = len(data["iteration0"])
        for cur_iter_num, iter in enumerate(data):
            for cur_move_num, moves in enumerate(data[iter]):
                for position in data[iter][moves]["rats"]:
                    pos = data[iter][moves]["rats"][position]
                    frame = int(cur_iter_num * moves_per_iter) + cur_move_num
                    #out_data.append([frame, pos[0], pos[1], pos[3]])

        return out_data


        

if __name__ == "__main__":
    seed = 123
    sim_manager = SimManager()
    sim = Simulation(manager = sim_manager, num_food = 10, total_iter = 10, moves_per_iter = 1000, map_radius = 100)
    brain = Brain(frontal=100, occipital=100, hypothalamus=100, parietal=100, cerebellum=100)
    sim.add_species(brain=brain, num_rats=20)
    sim_res = sim.run()
    

    #heat_map_data = sim.heat_map_data_out(out_json)

