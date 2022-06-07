import { CardNFTCollection, CardNFT } from './../ui-components'
import { Link } from "react-router-dom";

export default function List() {
    return (
        <>
            <div className="mv">
                <p className="catch-copy">Let's dress up your NFT</p>
                <p>You can change your NFT clothes. First, select the NFT you want to dress up.</p>
            </div>
            <Link to="/dressup">
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
                    margin="10px 10px 10px 10px" />
            </Link>
            <CardNFTCollection itemsPerPage={20} />
        </>
    );
  }
