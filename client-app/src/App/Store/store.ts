import { createContext, useContext } from "react"
import ActivityStore from "./activityStore"
import CommonStore from "./commonStore";
import userStore from "./userStore";
import modelStore from "./modelStore";
import profileStore from "./profileStore";

interface Store {

    activityStore: ActivityStore;
    commonStoere: CommonStore;
    userStore: userStore;
    modelStore: modelStore;
    profileStore: profileStore;
}

export const store: Store = {
    activityStore: new ActivityStore(),
    commonStoere: new CommonStore(),
    userStore: new userStore(),
    modelStore: new modelStore(),
    profileStore:new profileStore()
}

export const StoreContext = createContext(store);

export function useStore() {

    return useContext(StoreContext);
} 