import GetCurrentRouteData from '../hooks/CommonHooks';
import { Provider } from '../context/Context';

interface IWithProviderProps {
    contextType: string
}

const WithProvider = (WrappedComponent: (props: any) => JSX.Element) => {
    return (props: IWithProviderProps) => {
        const routeData = GetCurrentRouteData();
        return (
            <>
                <Provider router={routeData} contextType={props.contextType}>
                    <WrappedComponent {...props} />
                </Provider>
            </>
        );
    }
}

export default WithProvider;