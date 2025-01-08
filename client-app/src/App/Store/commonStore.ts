import { makeAutoObservable, reaction } from "mobx";
import { ServerError } from "../Models/ServerError";

export default class CommonStore {

    error: ServerError | null = null;
    token: string | null = localStorage.getItem("jwtkey");
    apploaded: boolean = false;
    constructor() {

        makeAutoObservable(this);

        reaction(() => 
            this.token,token=> {
                if (token != null) {
                    localStorage.setItem("jwtkey", token);
                }
                else {
                    localStorage.removeItem("jwtkey");
                }
            }
        )

    }

    setServerError(error: ServerError) {

        this.error = error;
    }

    setToken = (token: string | null) => {
      
      
        this.token = token;

    }

    setAppLoaded = () => {

        this.apploaded = true;
    }

}