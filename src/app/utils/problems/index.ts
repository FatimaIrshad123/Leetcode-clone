import { Problem } from "../types/problem";
import { jumpGame } from "./jump-game";
import { reversLinkedList } from "./reverse-linked-list";
import { search2DMatrix } from "./search-a-2d-matrix";
import { twoSum } from "./two-sum";
import { validParentheses } from "./valid-parenthesis";


interface ProblemMap {
    [key:string]: Problem;
}

export const problems: ProblemMap = {
    "two-sum": twoSum,
    "reverse-linked-list": reversLinkedList,
    "jump-game": jumpGame,
    "search-a-2d-matrix": search2DMatrix,
    "valid-parenthesis": validParentheses
}