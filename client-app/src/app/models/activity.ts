export interface IActivity {
    id: string;
    title: string;
    description: string;
    category: string;
    date: string; //5.064 had to set to string bc that is what we're returning so far
    city: string;
    venue: string;
}