import { makeAutoObservable, runInAction } from "mobx"
import { Activity, ActivityFormValues } from "../Models/Activity"
import agent from "../API/agent";
import { format } from 'date-fns';
import { store } from "./store";
import { Profile } from "../Models/Profile";

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

        return Array.from(this.activityRegistry.values()).sort((a, b) => a.date!.getTime() - b.date!.getTime());
    }

    get getGroupActivities() {

        return Object.entries(
            this.getListByDate.reduce((activities, activity) => {
                const date = format(activity.date!,"dd MMM yyyy");
                activities[date] = activities[date] ? [...activities[date], activity] : [activity];
                return activities;
                
            }, {} as { [key: string]: Activity[] })
        )
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

        var user = store.userStore.user;
        if (user) {
        
            activity.isGoing = activity.attendees!.some(m => m.username === user?.userName);
            activity.isHost = (activity.hostUsername === user!.userName);
            activity.host = (activity.attendees!.find(m => m.username === activity.hostUsername));
        }
        activity.date = new Date(activity.date!);
        this.activityRegistry.set(activity.id, activity)
    }

    private getActivity = (id: string) => {

        return this.activityRegistry.get(id);
    }
    setLoadingInitials = (state: boolean) => {
        this.loadingInitial = state;
    }

   

    createActivity = async (activity: ActivityFormValues) => {

        var user = store.userStore.user;
        const Attendee = new Profile(user!);
       
        try {
            await agent.Activities.create(activity);
            const newAcivity = new Activity(activity);
            newAcivity.hostUsername = Attendee.username;
            newAcivity.attendees = [Attendee];
            this.setActivity(newAcivity);

            runInAction(() => {
              
                this.selectedActivity = newAcivity;
              
            })
        }
        catch {
          

        }
        

    }

    updateActivity = async (activity: ActivityFormValues) => {
       
       
        try {
            await agent.Activities.update(activity.id!,activity);

         
            runInAction(() => {
                if (activity.id) {
                    let updatedActivity = { ...this.getActivity(activity.id), ...activity }
                    this.activityRegistry.set(activity.id, updatedActivity as Activity);
                    this.selectedActivity = updatedActivity as Activity;
                }
                
               
            })
        }
        catch {
            runInAction(() => {
              
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

    updateAttendance = async () => {
        var user = store.userStore.user;
        this.loading = true;


        try {
            await agent.Activities.attend(this.selectedActivity!.id);
            runInAction(() => {
                if (this.selectedActivity?.isGoing) {
                    this.selectedActivity.attendees = this.selectedActivity.attendees?.filter(m => m.username != user?.userName)
                    this.selectedActivity.isGoing = false;
                }
                else {
                    this.selectedActivity!.attendees?.push(
                        new Profile(user!)
                    );
                    this.selectedActivity!.isGoing = true;
                }

                this.activityRegistry.set(this.selectedActivity!.id, this.selectedActivity!);

            })

           
            

        } catch (error) {
            console.log(error)
        }
        finally {
            runInAction(() => {
                this.loading = false;
            })
           
        }

    }

    cancelActivity = async () => {
        this.loading = true;
        try {
            await agent.Activities.attend(this.selectedActivity!.id)
            runInAction(() => {
                this.selectedActivity!.isCancelled = (!this.selectedActivity?.isCancelled)
                this.activityRegistry.set(this.selectedActivity!.id, this.selectedActivity!)
            })

        }
        catch {

        }
        finally {
            runInAction(() => this.loading = false);
        }
    }
}