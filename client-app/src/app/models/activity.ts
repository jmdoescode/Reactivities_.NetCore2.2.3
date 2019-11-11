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