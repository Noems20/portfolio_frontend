import { About, Footer, Header, Skills, Testimonial, Work } from "./container";
import { Navbar } from "./components";
import { ThemeContextProvider } from "./ThemeContext";

import "./App.scss";

function App() {
  return (
    <ThemeContextProvider>
      <div className="app">
        <Navbar />
        <Header />
        <About />
        <Work />
        <Skills />
        <Testimonial />
        <Footer />
      </div>
    </ThemeContextProvider>
  );
}

export default App;
