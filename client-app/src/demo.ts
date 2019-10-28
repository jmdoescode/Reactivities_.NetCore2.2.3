let data: any;
let data2: number;
let data3: number | string;


data = '42';


interface ICar{
    color: string;
    model: string;
    topSpeed?: number;
}

const car1 : ICar = {
    color: 'blue'
    ,model: 'bmw'
}

const car2 : ICar = {
    color: 'red'
    ,model: 'Mercedes'
    ,topSpeed: 100
}

const multiple = (x: number, y: number) => {
    (x * y).toString();
}