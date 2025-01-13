import { makeAutoObservable, runInAction } from "mobx"
import { Photo, Profile } from "../Models/Profile";
import agent from "../API/agent";
import { store } from "./store";





export default class modelStore {

    profile: Profile|null=null;
    isprofileloading:boolean=false;
    IsUploadingPhoto:boolean=false;
    isLoading:boolean=false;


    constructor() {

        makeAutoObservable(this);
    }



    loadProfile = async (username: string) => {
        this.isprofileloading = true;
        try {
           const profile= await agent.profiles.get(username);
            runInAction(() => {
                this.profile = profile;
                this.isprofileloading = false;
            })

        }
        catch {

        }
        finally {
            runInAction(() => { this.isprofileloading = false; })
        }
        
    }

    uploadPhoto = async (file: Blob) => {
        this.IsUploadingPhoto = true;

        try {
            const response = await agent.profiles.Upload(file);
            const photo = response.data;
            runInAction(() => {
                this.profile?.photos?.push(photo);
                if (photo.isMain && store.userStore.user) {
                    store.userStore.setImage(photo.url);
                    this.profile!.image = photo.url;
                }

                this.IsUploadingPhoto = false;
            })

        }
        catch (error) {
            runInAction(() => {
                this.IsUploadingPhoto = false;
            })
        }
      
    }

    setMain = async (file: Photo) => {
        this.isLoading = true;

        try {
             await agent.profiles.setMain(file.id);
            store.userStore.setImage(file.url);
            runInAction(() => {
                if (this.profile && this.profile.photos) {
                    this.profile.photos.find(m => m.isMain)!.isMain = false;
                    this.profile.photos.find(m => m.id == file.id)!.isMain = true;
                    this.profile!.image = file.url
                    this.isLoading = false;
                }
               
            })

        }
        catch (error) {
            runInAction(() => {
                this.isLoading = false;
            })
        }

    }

    deletePhoto = async (file: Photo) => {
        this.isLoading = true;

        try {
            await agent.profiles.deletePhoto(file.id);
      
            runInAction(() => {
                if (this.profile && this.profile.photos) {
                    this.profile.photos=this.profile.photos.filter(m => m.id != file.id)
                    this.isLoading = false;
                }

            })

        }
        catch (error) {
            runInAction(() => {
                this.isLoading = false;
            })
        }

    }


    get isCurrentUser() {

        return (store.userStore.user?.userName == this.profile?.username)
         
    }


}