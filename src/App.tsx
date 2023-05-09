import { ThemeProvider } from "styled-components";
import customTheme from "./theme/theme";
import GlobalStyle from "./theme/globalStyle";
import Home from "./pages/Home/Home";

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <GlobalStyle />
      <Home />
    </ThemeProvider>
  );
}

export default App;
