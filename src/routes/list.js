import React, { useState, useEffect } from 'react';
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import { CardNFTCollection, CardNFT } from './../ui-components'
import { Link } from "react-router-dom";
import useEthNFTs from '../api/evmnft';


export default function List() {

    const { authenticate, isAuthenticated, isAuthenticating, user, account, logout } = useMoralis();

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
              <div class="card-list">
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
            </div>
            {isAuthenticated && ethNFTs.length == 0 &&
                <div className="mv" key={'mv4'} style={{marginTop: '2em'}}>
                    <p>To enjoy the dress-up, please purchase <a href="https://opensea.io/collection/love-addicted-girls">Love Addicted Girls</a> or <a href="https://opensea.io/collection/cryptoninjapartners">CryptoNinja Partners</a> first.</p>
                </div>
            }
            {ethNFTs.length == 0 &&
                <div style={{height: 300 + 'px'}}></div>
            }
            <div className="mv" key={'mv3'} style={{marginTop: '2em'}}>
                <p>Dress Up NFT is currently in beta version.</p>
                <p>Please contact <a href='https://twitter.com/syunduel'>shunichiro.icp(@syunduel)</a> to report bugs, request improvements, or discuss adding collections.</p>
            </div>

        </>
    );
  }
