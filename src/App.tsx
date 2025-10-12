import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WalletProvider, ToastProvider, ThemeProvider } from '@contexts';
import { Layout } from '@components/layout/Layout';

// Lazy load pages for better code splitting
import { lazy, Suspense } from 'react';
import { LoadingSpinner } from '@components/ui/LoadingSpinner';

const Home = lazy(() => import('@pages/Home'));
const Wallet = lazy(() => import('@pages/Wallet'));
const Portfolio = lazy(() => import('@pages/Portfolio'));
const MultiChain = lazy(() => import('@pages/MultiChain'));
const Swap = lazy(() => import('@pages/Swap'));
const NFTGallery = lazy(() => import('@pages/NFTGallery'));
const GasTracker = lazy(() => import('@pages/GasTracker'));
const Staking = lazy(() => import('@pages/Staking'));
const Lending = lazy(() => import('@pages/Lending'));
const Social = lazy(() => import('@pages/Social'));
const Security = lazy(() => import('@pages/Security'));
const Education = lazy(() => import('@pages/Education'));
const Explorer = lazy(() => import('@pages/Explorer'));
const Services = lazy(() => import('@pages/Services'));
const Blog = lazy(() => import('@pages/Blog'));
const BlogPost = lazy(() => import('@pages/BlogPost'));
const About = lazy(() => import('@pages/About'));
const Contact = lazy(() => import('@pages/Contact'));
const NotFound = lazy(() => import('@pages/NotFound'));

function App() {
  return (
    <Router>
      <ThemeProvider>
        <ToastProvider>
          <WalletProvider>
            <Layout>
              <Suspense fallback={<LoadingSpinner fullScreen />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/wallet" element={<Wallet />} />
                  <Route path="/portfolio" element={<Portfolio />} />
                  <Route path="/multichain" element={<MultiChain />} />
                  <Route path="/swap" element={<Swap />} />
                  <Route path="/nft" element={<NFTGallery />} />
                  <Route path="/gas" element={<GasTracker />} />
                  <Route path="/staking" element={<Staking />} />
                  <Route path="/lending" element={<Lending />} />
                  <Route path="/social" element={<Social />} />
                  <Route path="/security" element={<Security />} />
                  <Route path="/education" element={<Education />} />
                  <Route path="/explorer" element={<Explorer />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:slug" element={<BlogPost />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </Layout>
          </WalletProvider>
        </ToastProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
