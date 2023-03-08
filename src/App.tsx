import {
  About,
  Footer,
  Header,
  Experiences,
  Skills,
  Testimonial,
  Work,
} from "./container";
import { Navbar } from "./components";
import { ThemeContextProvider } from "./ThemeContext";
import StarsCanvas from "./components/canvas/Stars";

import "./App.scss";

function App() {
  return (
    <ThemeContextProvider>
      <div className="app">
        <Navbar />
        <Header />
        <About />
        <Work />
        <Experiences />
        <Skills />
        {/* <Testimonial /> */}
        <div className="relative z-0">
          <Footer />
          <StarsCanvas />
        </div>
      </div>
    </ThemeContextProvider>
  );
}

export default App;
