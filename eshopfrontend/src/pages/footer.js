
const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-4">
            <div className="max-w-screen-xl mx-auto text-center">
                <p>© {new Date().getFullYear()} Javaria. All Rights Reserved.</p>
                <nav className="space-x-4">
                        <span className="text-gray-400 cursor-pointer hover:text-gray-300">Privacy Policy</span>

                        <span className="text-gray-400 cursor-pointer hover:text-gray-300">Terms of Service</span>

                </nav>
            </div>
        </footer>
    );
};

export default Footer;
