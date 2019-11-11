import { initializeInstance } from "mobx/lib/internal";

export interface IActivity {
    id: string;
    title: string;
    description: string;
    category: string;
    date: Date; //11.143 - changed to a date
    city: string;
    venue: string;
}

export interface IActivityFormValues extends Partial<IActivity> {
    time?: Date;
}


export class ActivityFormValues implements IActivityFormValues {
    id?: string = undefined;
    title: string = "";
    category: string = "";
    description: string = "";
    date?: Date = undefined;
    time?: Date = undefined;
    city: string = "";
    venue: string = "";

    constructor(init?: IActivityFormValues) {
        if(init && init.date){
            init.time = init.date;
        }
        Object.assign(this, init); //11.147 - typescript should auto map the properties since v2.1
    }
}