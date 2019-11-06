import { observable, action } from 'mobx';
import { createContext } from 'react';
import { IActivity } from '../models/activity';
import agent from '../api/agent';

class ActivityStore {
    @observable activities: IActivity[] = [];
    @observable selectedActivity: IActivity | undefined;
    @observable loadingInitial = false;
    @observable editMode = false;
    @observable submitting = false;

    @action loadActivities = async () => {
        this.loadingInitial = true;

        try{
            const activities = await agent.Activities.list();
            activities.forEach((activity) => {
                activity.date = activity.date.split('.')[0];
                this.activities.push(activity);
            });
            this.loadingInitial = false
        } catch (error){
            console.log(error);
            this.loadingInitial = false //7.084 - in the catch as well so that if we have a problem it'll stay in loading
        }
    };

    @action createActivity = async (activity: IActivity) => {
        this.submitting = true;
        try{
            await agent.Activities.create(activity);
            this.activities.push(activity);
            this.editMode = false;
            this.submitting = false;
        }catch(error){
            this.submitting = false;
            console.log(error);
        }
    }

    @action openCreateForm = () => {
        this.editMode = true;
        this.selectedActivity = undefined;
    }

    @action selectActivity = (id: string) => {
        this.selectedActivity = this.activities.find(a => a.id === id);
        this.editMode = false;
    }
}

export default createContext(new ActivityStore()) //7.081 - make sure to auto import from reactimport { IActivity } from './../models/activity';
