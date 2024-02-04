import numpy as np
import math

class SimManager:
    def __init__(self):
        self.active_rats = []
        self.active_food = []

    def reset_round(self, map_radius: int, num_food: int):
        new_rats = []
        i = 0
        for rat in self.active_rats:
            child = rat.calc_children()
            i += 1
            if child is not None:
                new_rats.append(child)
        self.active_rats.extend(new_rats)
        for rat in self.active_rats:
            rat.spawn(map_radius)

        self.active_food = []
        for _ in range(num_food):
            theta = np.random.uniform(0, 2 * math.pi)
            length = np.random.uniform(0, map_radius)
            pos = length * np.array([math.cos(theta), math.sin(theta)])
            self.active_food.append(pos)