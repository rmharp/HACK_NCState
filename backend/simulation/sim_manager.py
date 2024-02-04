class SimManager:
    def __init__(self):
        self.active_rats = []
        self.active_food = []

    def reset_round(self, map_radius: int):
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