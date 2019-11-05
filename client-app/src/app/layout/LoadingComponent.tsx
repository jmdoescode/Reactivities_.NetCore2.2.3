import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

const LoadingComponent: React.FC<{inverted?: boolean, content?: string}> = ({
    inverted = true, //6.075 - for a lighter background
    content
}) => {
    return (
        <Dimmer active inverted={inverted}>
            <Loader content={content}/>
        </Dimmer>
    )
}

export default LoadingComponent
