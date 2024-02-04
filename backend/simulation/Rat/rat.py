import numpy as np
import math
from typing import List
from Rat.brain import Brain
from sim_manager import SimManager
import time
from scipy.stats import skewnorm

class Rat():
    # Constants 
    REPRO_REQUIREMENT = 50

    def __init__(self, manager: SimManager, position: np.array, brain):
        self.manager = manager
        self.position = position
        self.brain:Brain = brain
        self.max_energy: int = 100
        self.energy: int = 100
        self.hunger = 100
        self.age = 0
        self.dir_vec = np.array([0, 0])
        self.move_cone = math.pi/4
                
    # Food Object 
    def update(self, food_list: List[np.array], map_radius: int) -> np.array:
        # If rat is hungry it will move
        if self.hunger < 100 - np.clip(skewnorm.rvs(a=-50, loc=100, scale=self.brain.hypothalamus), 0, 100):
            self.move(food_list, map_radius)
        self.eat(food_list)
        self.hunger -= abs(round(np.random.normal(loc = 3, scale = 4)))
        self.energy -= abs(round(np.random.normal(loc = 3, scale = 4)))
        self.max_energy = round(100 * math.pow(math.e, -self.age / 20))
        #print("energy is: ", self.energy)
        if self.energy <= 0:
           # print("hit")
            self.manager.active_rats.remove(self)
            return None
        else:
            return self.position

    # Movement Function
    def move(self, food_list, map_radius: int):
        nearest_food = None
        nearest_food_dist = None
        for food in food_list:
            dist_to_food = np.linalg.norm(food - self.position)
            # Look for food
            if dist_to_food > self.brain.occipital / 10:
                continue
            # rat has chance to ignore spotted food based on frontal cortex size
            if np.random.randint(0, 100) >= self.brain.frontal:
                continue
            if nearest_food is None:
                nearest_food = food
                nearest_food_dist = dist_to_food
            dist_to_food = np.linalg.norm(food - self.position)
            
            if dist_to_food < nearest_food_dist:
                nearest_food = food
                nearest_food_dist = dist_to_food
        
        # Searching for food
        if nearest_food is None:
            # Angle of vector
            theta = np.arctan2(self.position[1], self.position[0])
            new_theta = np.array(np.random.normal(theta, scale=self.move_cone))
            self.dir_vec = np.array([math.cos(new_theta), math.sin(new_theta)])
            new_pos = self.position + self.brain.cerebellum  * self.dir_vec
            while np.linalg.norm(new_pos) > map_radius:
                new_theta = theta + (math.pi) + np.random.normal(-math.pi/8,math.pi/8)
                new_pos = np.array([math.cos(new_theta), math.sin(new_theta)])

            self.position += self.brain.cerebellum  * self.dir_vec
            
            
        # Food found
        else:
            dir_to_food = nearest_food - self.position
            self.position += self.brain.cerebellum * (dir_to_food / np.linalg.norm(dir_to_food))

    def eat(self, food_list):
        for food in food_list:
            dist_to_food = np.linalg.norm(food - self.position)
            if dist_to_food < 3:
                food_list = [arr for arr in food_list if not np.array_equal(arr, food)]
                self.hunger += 10
                if self.energy < self.max_energy:
                    self.energy += 10
            else:
                continue

    def spawn(self, map_radius: int):
        theta = np.random.uniform(1, 360)
        length = np.random.uniform(0, map_radius)
        self.position = np.array([math.cos(theta), math.sin(theta)])
        self.position *= length

        
        
        
            
    def calc_children(self):
        repro_factor = self.energy * (self.brain.hypothalamus / 100)

        if repro_factor > Rat.REPRO_REQUIREMENT:
            child = Rat(manager=self.manager, position=np.array([0, 0]), brain=self.brain)
        else:
            child = None
        return child
