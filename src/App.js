import './App.css';
import { NFT } from './models';
import { CardNFTCollection, CardNFT, CardA, NavBar, MarketingFooter } from './ui-components'
import { Link } from "react-router-dom";

function App() {

return (

<div className="App">
  <NavBar width={"100vw"} />

  <div class="mv">
    <p class="catch-copy">Let's dress up your NFT</p>
    <p>You can change your NFT clothes. First, select the NFT you want to dress up.</p>
  </div>

  <Link to="/dressup">dressup</Link>
    <CardNFT
      CardNFT={{
        token_address: 'aaa',
        collection_name: 'Love Addicted Girls',
        token_id: 'aaa',
        name: 'LAG#0167',
        image: 'https://ipfs.moralis.io:2053/ipfs/QmWsNgLwBLiqGpUrhUS48ejRFAgUA92ChF6Xo45uMKWnmQ/0167.png',
      }}
      height="368px"
      width="300px"
      margin="10px 10px 10px 10px"

    />
  <CardNFTCollection itemsPerPage={20} />
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
