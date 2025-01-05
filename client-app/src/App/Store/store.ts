import { createContext, useContext } from "react"
import ActivityStore from "./activityStore"
import CommonStore from "./commonStore";

interface Store {

    activityStore: ActivityStore;
    commonStoere: CommonStore;
}

export const store: Store = {
    activityStore: new ActivityStore(),
    commonStoere: new CommonStore()
}

export const StoreContext = createContext(store);

export function useStore() {

    return useContext(StoreContext);
} 