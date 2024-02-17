import Header from '../components/Header';
import Footer from '../components/Footer';

const WithHeadFoot = (WrappedComponent: (props: any) => JSX.Element) => {
    return function (props: any) {
        return (
            <>
                <Header />
                <WrappedComponent {...props} />
                <Footer />
            </>
        );
    }
}

export default WithHeadFoot;