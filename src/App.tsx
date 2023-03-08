import {
  About,
  Footer,
  Header,
  Experiences,
  Testimonial,
  Work,
} from "./container";
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
        <Experiences />
        <Testimonial />
        <Footer />
      </div>
    </ThemeContextProvider>
  );
}

export default App;
