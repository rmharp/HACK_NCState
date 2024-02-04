import numpy
from dataclasses import dataclass

@dataclass
class Brain:
    """
    determines the rats skills

    frontal: decision making

    occipital: sight

    hypothalumus: appetite

    parietal: reactivity to environmental senses

    cerebellum: move speed
    """
    # decision making
    frontal: int
    
    # vision range
    occipital: int

    # appetite
    hypothalamus: int

    # processing sensory information (heat and cold)
    parietal: int

    # movement speed
    cerebellum: int