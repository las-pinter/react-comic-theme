import {
    Consumer, IContextState,
} from '../context/Context';

export interface IConsumerProps {
    context: IContextState
}

const WithConsumer = (WrappedComponent: (props: any) => JSX.Element) => {
    return (props: any) => {
        return (
            <Consumer>
                {context => <WrappedComponent {...props} context={context} />}
            </Consumer>
        );
    };
}

export default WithConsumer;