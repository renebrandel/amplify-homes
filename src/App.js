import './App.css';
import { CardNFTCollection, NavBar, MarketingFooter } from './ui-components'

function App() {
return (


<div className="App">
  <NavBar width={"100vw"} />
  <CardNFTCollection isPaginated itemsPerPage={20} />
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
