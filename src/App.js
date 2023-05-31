import { createGlobalStyle } from "styled-components";
import Posts from "./menuPage/Menu";

function App() {
  return (
    <>
      <GlobalStyle />
      <Posts />
    </>
  );
}

const GlobalStyle = createGlobalStyle`
`;

export default App;
