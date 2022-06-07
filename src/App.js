import './App.css';
import { NFT } from './models';
import { CardNFTCollection, CardNFT, CardA, NavBar, MarketingFooter } from './ui-components'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Dressup from "./routes/dressup";
import List from './routes/list';

function App() {

return (

<div className="App">
  <NavBar width={"100vw"} />

  <BrowserRouter>
    <Routes>
      <Route path="/" element={<List />} />
      <Route path="dressup" element={<Dressup />} />
    </Routes>
  </BrowserRouter>

  <MarketingFooter width={"100vw"} />
</div>


);
}

export default App;
/*
import './App.css';

function App() {
  return (
    <div className="App">
    </div>
  );
}

export default App;

*/
