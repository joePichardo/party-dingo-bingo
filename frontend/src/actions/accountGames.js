import { ACCOUNT_GAMES } from "./types";
import { fetchFromAccount } from "./account";

export const fetchAccountGames = () => fetchFromAccount({
  endpoint: 'games',
  options: { credentials: 'include' },
  FETCH_TYPE: ACCOUNT_GAMES.FETCH,
  ERROR_TYPE: ACCOUNT_GAMES.FETCH_ERROR,
  SUCCESS_TYPE: ACCOUNT_GAMES.FETCH_SUCCESS
});