import Background from '../components/Background/Background';

const WithBackground = (WrappedComponent: (props: any) => JSX.Element) => {
    return function (props: any) {
        return (
            <>
                <WrappedComponent {...props} />
                <Background />
            </>
        );
    }
}

export default WithBackground;