import React, { useState, useEffect } from 'react';
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import { CardNFTCollection, CardNFT } from './../ui-components'
import { Link } from "react-router-dom";
import useEthNFTs from '../api/evmnft';


export default function List() {

    const ethNFTs = useEthNFTs();
    console.log("ethNFTs");
    console.log(ethNFTs);

    const cardNFTOverrides = {
        "image": {
          crossOrigin: "anonymous",
        },
    }

    return (
        <>
            <div className="mv" key={'mv1'}>
                <p className="catch-copy">Let's dress up your NFT</p>
                <p>You can change your NFT clothes. First, select the NFT you want to dress up.</p>
            </div>
            <div className="mv" key={'mv2'} style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', padding: '1em'}}>
                {ethNFTs.map((ethNFT) => (
                    <Link to={`/dressup?token_chain=${ethNFT.token_chain}&token_address=${ethNFT.token_address}&token_id=${ethNFT.token_id}`} style={{textDecoration: 'none'}}>
                        <CardNFT
                            CardNFT={{
                                key: ethNFT.token_hash,
                                token_address: ethNFT.token_address,
                                collection_name: ethNFT.name,
                                name: ethNFT.itemName,
                                image: ethNFT.moralisImageUri,
                            }}
                            height="368px"
                            width="300px"
                            margin="10px 10px 10px 10px"
                            overrides={ethNFT.symbol != "LAG" && cardNFTOverrides} />
                    </Link>
                ))}
            </div>
            {ethNFTs.length == 0 &&
                <div style={{height: 500 + 'px'}}></div>
            }

            {/* <Link to="/dressup">
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
            <CardNFTCollection itemsPerPage={20} /> */}
        </>
    );
  }
