import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import MovieGrid from "./components/MovieGrid";
import ScrollToTopButton from "./components/ScrollTopButton";

function App() {
  return (
    <>
     <Navbar />
     <Hero />
     <MovieGrid />
     <Footer />
     <ScrollToTopButton />
    </>
  )
}

export default App;