import logo from "./logo.svg";
import "./App.css";
import CardDetailsContainer from "./components/CardDetails/CardDetailsContainer";
import CardForm from "./components/CardForm/CardForm";
import { useSelector } from "react-redux";
import ThankYou from "./components/ThankYou/ThankYou";

function App() {
  const cardWasUpdated = useSelector((state) => state.cardDetails.wasUpdated);

  return (
    <main>
      <CardDetailsContainer />
      {!cardWasUpdated ? <CardForm /> : <ThankYou />}
    </main>
  );
}

export default App;
