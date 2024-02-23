import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

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