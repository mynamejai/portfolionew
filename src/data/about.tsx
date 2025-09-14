import Hobby from "@/types/hobby";
import Quote from "@/types/quote";
import {
    Dumbbell, Edit,
    Mountain,
    Music, Pen,
    PlaneTakeoff,
    Tv,

} from "lucide-react";

export const QUOTE_ANYONE: Quote = {
  quote:
    "Always believe in yourself. No matter who’s around you being negative or thrusting negative energy at you, totally block it off. Because whatever you believe, you become.",
  author: "Michael Jackson",
};
export const HOBBIES: Hobby[] = [
  {
    name: "Poetry",
    icon: <Pen />,
  },
  {
    name: "Music",
    icon: <Music />,
  },
  {
    name: "Travel",
    icon: <PlaneTakeoff />,
  },
  {
    name: "Gym",
    icon: <Dumbbell />,
  },
  {
    name: "Editing",
    icon: <Edit />,
  },
  {
    name: "Entertainment",
    icon: <Tv />,
  },
]
