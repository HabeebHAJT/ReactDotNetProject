import { Profile } from "./Profile";

export interface IActivity {
    id: string;
    title: string;
    date: Date | null;
    description: string;
    category: string;
    city: string;
    venue: string;
    isCancelled: boolean;
    hostUsername: string;
    isGoing: boolean;
    isHost: boolean;
    host?: Profile;
    attendees?: Profile[];
}



export class Activity implements IActivity {
    id: string;
    title: string;
    date: Date | null;
    description: string;
    category: string;
    city: string;
    venue: string;
    isCancelled: boolean = false;
    hostUsername: string = "";
    isGoing: boolean = false;
    isHost: boolean=false;
    host?: Profile;
    attendees?: Profile[];

    constructor(activity: ActivityFormValues) {
       
            this.id = activity.id!
            this.title = activity.title!;
            this.date = activity!.date;
            this.description = activity!.description;
            this.category = activity!.category
            this.city = activity!.city
            this.venue = activity!.venue
       

    }
    
}


export class ActivityFormValues {
    id?: string = undefined;
    title?: string = "";
    date: Date | null  = null;
    description: string="";
    category: string = "";
    city: string = "";
    venue: string = "";


    constructor(activity?: ActivityFormValues) {
        if (activity) {
            this.id = activity!.id
            this.title = activity!.title;
            this.date = activity!.date;
            this.description = activity!.description;
            this.category = activity!.category
            this.city = activity!.city
            this.venue = activity!.venue
        }
        
    }
}