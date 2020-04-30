import { ACTIVE_GAMES } from "../actions/types";
import fetchStates from "./fetchStates";

const DEFAULT_ACTIVE_GAMES = { games: [] };

const activeGames = (state = DEFAULT_ACTIVE_GAMES, action) => {
  switch (action.type) {
    case ACTIVE_GAMES.FETCH:
      return {
        ...state,
        status: fetchStates.fetching
      };
    case ACTIVE_GAMES.FETCH_ERROR:
      return {
        ...state,
        status: fetchStates.error,
        message: action.message
      };
    case ACTIVE_GAMES.FETCH_SUCCESS:
      return {
        ...state,
        status: fetchStates.success,
        games: action.games
      };
    default:
      return state;
  }
};

export default activeGames;