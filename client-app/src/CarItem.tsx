import React from 'react'
import { ICar } from './demo';

interface IProps {
    car: ICar
}

//const CarItem: React.FC<IProps> = (props) => { //#1
const CarItem: React.FC<IProps> = ({car}) => {
    return (
        <div>
            {/* <h1>{props.car.color}</h1> */ /* //#1 */}
            <h1>{car.color}</h1> {/* Don't need to specify props */}
        </div>
    )
}

export default CarItem
