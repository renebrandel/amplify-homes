import './App.css';
import { NFT } from './models';
import { CardNFTCollection, CardNFT, CardA, NavBar, MarketingFooter } from './ui-components'

function App() {

return (

<div className="App">
  <NavBar width={"100vw"} />
  <CardNFT
    CardNFT={{
      token_address: 'aaa',
      collection_name: 'bbb',
      token_id: 'aaa',
      name: 'LAG #1234',
      image: 'https://ipfs.moralis.io:2053/ipfs/QmWsNgLwBLiqGpUrhUS48ejRFAgUA92ChF6Xo45uMKWnmQ/0891.png',
    }}
    height="358px"
    width="300px"
    margin="10px 10px 10px 10px"

  />
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
