// pages/_app.js
import "@/styles/globals.css";
import { AuthProvider } from "./context/AuthContext";
import Header from "./header";
import Footer from "./footer";
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const noHeaderFooterRoutes = ['/login', '/register'];

  return (
    <AuthProvider>
      <div id="root" className="flex flex-col min-h-screen"> {/* This makes sure the root takes up at least the full height of the viewport */}
        {!noHeaderFooterRoutes.includes(router.pathname) && <Header />}
        <main className="main flex-grow"> {/* Flex-grow makes sure the main content takes available space */}
          <Component {...pageProps} />
        </main>
        {!noHeaderFooterRoutes.includes(router.pathname) && <Footer />}
      </div>
    </AuthProvider>
  );
}
