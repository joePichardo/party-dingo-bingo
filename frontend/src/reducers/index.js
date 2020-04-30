import { combineReducers} from "redux";
import account from "./account";
import accountDragons from "./accountDragons";
import accountGames from "./accountGames";
import accountInfo from "./accountInfo";
import dragon from "./dragon";
import generation from "./generation";
import publicDragons from "./publicDragons";
import publicGames from "./publicGames";
import activeGames from "./activeGames";


export default combineReducers({
  account,
  accountDragons,
  accountGames,
  accountInfo,
  dragon,
  generation,
  publicDragons,
  publicGames,
  activeGames
});