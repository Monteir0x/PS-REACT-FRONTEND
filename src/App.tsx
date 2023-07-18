import styled from "styled-components";
import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { InfoTable } from "./components/infoTable";

function App() {
  return (
    <>
      <Container>
        <InfoTable />
      </Container>
    </>
  );
}
const Container = styled.div`
  max-width: 1024px;
  margin: 0px auto;
  height: 100vh;
`;
export default App;
