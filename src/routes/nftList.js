import React, { useState, useEffect } from 'react';
import { useMoralis } from "react-moralis";
import { CardNFT } from '../ui-components'
import { Link } from "react-router-dom";
import useEthNFTs from '../api/evmnft';


export default function NFTList(params) {

    const { authenticate, isAuthenticated, isAuthenticating, user, account, logout } = useMoralis();

    // const [name, chain, address, url] = params;

    const [nfts, isLoaded] = useEthNFTs(params.chain, params.address);

    console.log("NFTList " + params.name);
    console.log(nfts);
    console.log("NFTList isLagLoaded " + isLoaded);

    const cardNFTOverrides = {
        "image": {
          crossOrigin: "anonymous",
        },
    }

    return (
        <>
            <div className="collection">{params.name}</div>
            <div className="mv" key={params.address} style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', padding: '1em'}}>
                {nfts !== undefined && nfts.map((ethNFT) => (
                    <div class="card-list">
                        <Link to={`/dressup/?token_chain=${ethNFT.chain}&token_address=${ethNFT.token_address}&token_id=${ethNFT.token_id}`} style={{textDecoration: 'none'}}>
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
                                overrides={ethNFT.symbol !== "LAG" && cardNFTOverrides} />
                        </Link>
                    </div>
                ))}
            </div>
            {!isAuthenticated &&
                <div className="mv" style={{marginBottom: "50px"}} key={params.address + '-a'}>
                    <p>First of all, please connect to the wallet.</p>
                </div>
            }
            {isAuthenticated && !isLoaded &&
                <div className="mv" style={{marginBottom: "50px"}} key={params.address + '-b'}>
                    <p>Now loading the NFT you have...</p>
                </div>
            }
            {isAuthenticated && isLoaded && nfts.length === 0 &&
                <div className="mv" style={{marginBottom: "50px"}} key={params.address + '-c'}>
                    <p>{params.name} NFT not found.</p>
                    <p>To enjoy the dress up, please purchase <a href={params.url}>{params.name}</a> first.</p>
                </div>
            }
        </>
    );
  }
