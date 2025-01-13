import { User } from "./User";

export interface IProfile {

    displayName: string;
    username: string;
    bio?: string;
    image?: string
    photos?: Photo[];

}

export class Profile implements IProfile {

    displayName: string="";
    username: string="";
    image?: string
    bio?: string;
    photos?: Photo[];
    constructor(user: User) {
        this.displayName = user.displayName;
        this.username = user.userName;
        this.image = user.image
    }

}

export interface Photo {

    id: string;
    url: string;
    isMain: boolean;


}