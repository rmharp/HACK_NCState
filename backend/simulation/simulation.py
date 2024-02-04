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
                for _ in ["rats", "food"]:
                    rats_or_food = []

                    positions = []
                    for rat in self.manager.active_rats:
                        rat_pos = rat.update(self.manager.active_food, self.map_radius)
                        rotation = np.arctan2(rat.dir_vec[1], rat.dir_vec[0])
                        if rat_pos is not None:
                            pos_and_rot = rat_pos.tolist()
                            pos_and_rot.append(rotation)
                            positions.append(pos_and_rot)
                    rats_or_food.append(positions)

                    positions = [x.tolist() for x in self.manager.active_food]
                    rats_or_food.append(positions)
                move_data.append(rats_or_food)

            iter_data.append(move_data)
                    
            self.manager.reset_round(self.map_radius)
            for _ in range(self.num_food):
                theta = np.random.uniform(0, 2 * math.pi)
                length = np.random.uniform(0, self.map_radius)
                pos = length * np.array([math.cos(theta), math.sin(theta)])
                self.manager.active_food.append(pos)
            
        return iter_data

        
    
    def res_to_json(self, res):
        out_data = dict()
        for i, iter in enumerate(res):
            out_data[f"iteration{i}"] = {}
            for j, moves in enumerate(iter):
                out_data[f"iteration{i}"][f"moves_data{j}"] = {}
                out_data[f"iteration{i}"][f"moves_data{j}"]["rats"] = {}
                out_data[f"iteration{i}"][f"moves_data{j}"]["food"] = {}
                for k, mouse_or_food in enumerate(moves):
                    for l, pos in enumerate(mouse_or_food):
                            if k == 0:
                                out_data[f"iteration{i}"][f"moves_data{j}"]["rats"][f"pos{l}"] = pos
                            else:
                                out_data[f"iteration{i}"][f"moves_data{j}"]["food"][f"pos{l}"] = pos
        
        json_string = json.dumps(out_data)
        return json_string
        

if __name__ == "__main__":
    seed = 123
    sim_manager = SimManager()
    sim = Simulation(manager = sim_manager, num_food = 20, total_iter = 1, moves_per_iter = 1, map_radius = 100)
    brain = Brain(frontal=100, occipital=100, hypothalamus=100, parietal=100, cerebellum=100)
    sim.add_species(brain=brain, num_rats=1)
    sim_res = sim.run()
    out_json = sim.res_to_json(sim_res)
    print(out_json)

