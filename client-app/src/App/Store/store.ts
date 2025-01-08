import { createContext, useContext } from "react"
import ActivityStore from "./activityStore"
import CommonStore from "./commonStore";
import userStore from "./userStore";
import modelStore from "./modelStore";

interface Store {

    activityStore: ActivityStore;
    commonStoere: CommonStore;
    userStore: userStore;
    modelStore: modelStore
}

export const store: Store = {
    activityStore: new ActivityStore(),
    commonStoere: new CommonStore(),
    userStore: new userStore(),
    modelStore: new modelStore()
}

export const StoreContext = createContext(store);

export function useStore() {

    return useContext(StoreContext);
} 