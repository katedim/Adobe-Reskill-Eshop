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
      <div id="root" className="flex flex-col min-h-screen"> 
        {!noHeaderFooterRoutes.includes(router.pathname) && <Header />}
        <main className="main flex-grow"> 
          <Component {...pageProps} />
        </main>
        {!noHeaderFooterRoutes.includes(router.pathname) && <Footer />}
      </div>
    </AuthProvider>
  );
}
