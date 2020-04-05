import { combineReducers} from "redux";
import account from "./account";
import accountDragons from "./accountDragons";
import accountInfo from "./accountInfo";
import dragon from "./dragon";
import generation from "./generation";
import publicDragons from "./publicDragons";
import publicGames from "./publicGames";


export default combineReducers({
  account,
  accountDragons,
  accountInfo,
  dragon,
  generation,
  publicDragons,
  publicGames
});