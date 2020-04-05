import { PUBLIC_GAMES } from "../actions/types";
import fetchStates from "./fetchStates";

const DEFAULT_PUBLIC_GAMES = { games: [] };

const publicGames = (state = DEFAULT_PUBLIC_GAMES, action) => {
  switch (action.type) {
    case PUBLIC_GAMES.FETCH:
      return {
        ...state,
        status: fetchStates.fetching
      };
    case PUBLIC_GAMES.FETCH_ERROR:
      return {
        ...state,
        status: fetchStates.error,
        message: action.message
      };
    case PUBLIC_GAMES.FETCH_SUCCESS:
      return {
        ...state,
        status: fetchStates.success,
        games: action.games
      };
    default:
      return state;
  }
};

export default publicGames;