import { useState } from "react";
import Routing from "./Components/Routing/Routing";
import { CurrencyContext } from "./CurrencyContext/CurrencyContext";

function App() {
  const [currency, setCurrency] = useState('usd');

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      <Routing />
    </CurrencyContext.Provider>
  );
}

export default App;
