import {
    Consumer,
    IContextState,
    IProps
} from '../context/Context';

export interface IConsumerProps extends IProps {
    context: IContextState
}

const WithConsumer = (WrappedComponent: ({ context }: IConsumerProps) => JSX.Element) => {
    return function (props: IProps) {
        return (
            <Consumer>
                {context => <WrappedComponent {...props} context={context} />}
            </Consumer>
        );
    };
}

export default WithConsumer;