import { makeAutoObservable, runInAction } from "mobx"
import { Activity } from "../Models/Activity"
import agent from "../API/agent";

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

    loadActivities = async () => {


        try {
            this.setLoadingInitials(true);
            const activites = await agent.Activities.list();
            activites.forEach(activity => {
                this.setActivity(activity)
               
            })


            this.setLoadingInitials(false);
        }
        catch {
            this.setLoadingInitials(false);

        }
    }

    loadActivity = async (id:string) => {

        let activity = this.getActivity(id);

        if (activity) {
            this.selectedActivity = activity;
            return activity;
        }
        else {
            this.setLoadingInitials(true);
            try
            {
                activity = await agent.Activities.details(id);
                this.setActivity(activity);
                runInAction(() => {
                    this.selectedActivity = activity
                });
                this.setLoadingInitials(false);
                return activity;

            }
            catch {
               
                this.setLoadingInitials(false);

            }
        }
    }

    private setActivity = (activity:Activity) => {

        activity.date = activity.date.split("T")[0];
        this.activityRegistry.set(activity.id, activity)
    }

    private getActivity = (id: string) => {

        return this.activityRegistry.get(id);
    }
    setLoadingInitials = (state: boolean) => {
        this.loadingInitial = state;
    }

   

    createActivity = async (activity:Activity) => {
        this.loading = true;
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