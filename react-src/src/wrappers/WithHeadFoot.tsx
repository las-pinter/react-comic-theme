import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

const WithHeadFoot = (WrappedComponent: (props: any) => JSX.Element) => {
    return (props: any) => {
        return (
            <>
                <Header {...props}/>
                <WrappedComponent {...props} />
                <Footer />
            </>
        );
    }
}

export default WithHeadFoot;