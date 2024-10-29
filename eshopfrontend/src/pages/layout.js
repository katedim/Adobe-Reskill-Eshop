import Header from './header';
import Footer from './footer';

const Layout = ({ children }) => {
    return (
        <div>
            <Header />
            <main className="pt-16">{children}</main> 
            <Footer />
        </div>
    );
};

export default Layout;
