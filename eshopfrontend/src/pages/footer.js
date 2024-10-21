// components/Footer.js

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-4">
            <div className="max-w-screen-xl mx-auto text-center">
                <p>© {new Date().getFullYear()} Your Company Name. All Rights Reserved.</p>
                <nav className="space-x-4">
                    <a href="/privacy" className="text-gray-400">Privacy Policy</a>
                    <a href="/terms" className="text-gray-400">Terms of Service</a>
                </nav>
            </div>
        </footer>
    );
};

export default Footer;
