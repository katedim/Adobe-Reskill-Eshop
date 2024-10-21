// components/Layout.js

import Header from './header';
import Footer from './footer';

const Layout = ({ children }) => {
    return (
        <div>
            <Header />
            <main className="pt-16">{children}</main> {/* Adjust padding to avoid overlap with fixed header */}
            <Footer />
        </div>
    );
};

export default Layout;
