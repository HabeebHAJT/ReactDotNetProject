import { makeAutoObservable, runInAction } from "mobx";
import { User, userForm } from "../Models/User";
import agent from "../API/agent";
import { store } from "./store";
import { router } from "../Router/Routers";

 

export default class userStore {
    user: User | null = null;
    constructor() {
        makeAutoObservable(this)
    }

    get isLoggedIn() {
        return !!this.user
    }


    login = async (cred: userForm) => {
        const user = await agent.Account.login(cred);
        store.commonStoere.setToken(user.token);

        runInAction(() => {
            this.user = user;
        })
        router.navigate("/activities")
        store.modelStore.cloaseModel();
        
    }

    register = async (cred: userForm) => {
        const user = await agent.Account.register(cred);
        store.commonStoere.setToken(user.token);

        runInAction(() => {
            this.user = user;
        })
        router.navigate("/activities")
        store.modelStore.cloaseModel();

    }

    logout = () => {

        store.commonStoere.setToken(null);
        this.user = null;
        router.navigate("/")

    }

    getUser = async () => {

        try {
            const user = await agent.Account.current();
            runInAction(() => {
                this.user = user;
            })
        }
        catch (error) {
            console.log(error);
        }
    }

}