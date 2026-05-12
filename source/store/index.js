import { combineReducers } from "redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StackReducer from "../navigation/reducer";

const appReducer = combineReducers({
    StackReducer: StackReducer
})


export default (state, action) => {
    if (action.type === "LOGOUT") {
        AsyncStorage.getAllKeys()
            .then(keys => {
                const tempKeys = keys.filter(item=> item !== 'LoginOption');
                AsyncStorage.multiRemove(tempKeys).then(() => {})
            })
            .then(() => {

            });
        return appReducer(undefined, action);
    }
    return appReducer(state, action);
}