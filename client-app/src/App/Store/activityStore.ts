import { makeAutoObservable, runInAction } from "mobx"
import { Activity } from "../Models/Activity"
import agent from "../API/agent";
import { v4 as uuid } from 'uuid';

export default class ActivityStore {

    
    activityRegistry= new Map<string, Activity>();
    selectedActivity: Activity | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;
    constructor() {
        makeAutoObservable(this)



    }
    get getListByDate() {

        return Array.from(this.activityRegistry.values()).sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
    }

    loadActivity = async () => {


        try {
            this.setLoadingInitials(true);
            const activites = await agent.Activities.list();
            activites.forEach(activities => {

                activities.date = activities.date.split("T")[0];
                this.activityRegistry.set(activities.id,activities)
            })


            this.setLoadingInitials(false);
        }
        catch {
            this.setLoadingInitials(false);

        }
    }


    setLoadingInitials = (state: boolean) => {
        this.loadingInitial = state;
    }

    selectActivty = (id: string) => {
        this.selectedActivity = this.activityRegistry.get(id);

    }

    cancelActivty = () => {
        this.selectedActivity = undefined;

    }

    openForm = (id?: string) => {
        id ? this.selectActivty(id) : this.cancelActivty();
        this.editMode = true;
    }
    closeForm = () => {

        this.editMode = false;
    }

    createActivity = async (activity:Activity) => {
        this.loading = true;
        activity.id = uuid();
        try {
            await agent.Activities.create(activity);
            runInAction(() => {

                this.activityRegistry.set(activity.id, activity);
                this.editMode = false;
                this.selectedActivity = activity;
                this.loading = false;
            })
        }
        catch {
            runInAction(() => {
               
                this.loading = false;
            })

        }
        

    }

    updateActivity = async (activity: Activity) => {
        this.loading = true;
       
        try {
            await agent.Activities.update(activity);
            console.log("test " + activity.id);
            runInAction(() => {
                
                
                this.activityRegistry.set(activity.id, activity);
              
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            })
        }
        catch {
            runInAction(() => {
                this.loading = false;
            });

        }


    }

    deleteActivity = async (id: string) => {
        this.loading = true;
      
        try {
            await agent.Activities.delete(id);
            runInAction(() => {


                this.activityRegistry.delete(id);

                if (this.selectedActivity?.id == id) this.cancelActivty();
                this.loading = false;


            });
        }
        catch {
            runInAction(() => {

                this.loading = false;
            })

        }


    }
}