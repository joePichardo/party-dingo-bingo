import { ACCOUNT_GAMES } from "../actions/types";
import fetchStates from "./fetchStates";

const DEFAULT_ACCOUNT_GAMES = { games: [] };

const accountGames = (state = DEFAULT_ACCOUNT_GAMES, action) => {
  switch(action.type) {
    case ACCOUNT_GAMES.FETCH:
      return { ...state, status: fetchStates.fetching };
    case ACCOUNT_GAMES.FETCH_ERROR:
      return { ...state, status: fetchStates.error, message: action.message };
    case ACCOUNT_GAMES.FETCH_SUCCESS:
      return {
        ...state,
        status: fetchStates.success,
        message: action.message,
        games: action.games
      };
    default:
      return state;
  }
};

export default accountGames;
