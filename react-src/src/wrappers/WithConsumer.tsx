import {
    Consumer,
    IContextState,
    IProps
} from '../context/Context';

export interface IConsumerProps extends IProps {
    ctxState: IContextState
}

const WithConsumer = (WrappedComponent: ({ ctxState }: IConsumerProps) => JSX.Element) => {
    return function (props: IProps) {
        return (
            <Consumer>
                {ctxState => <WrappedComponent {...props} ctxState={ctxState} />}
            </Consumer>
        );
    };
}

export default WithConsumer;