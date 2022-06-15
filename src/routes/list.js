import React, { useState, useEffect } from 'react';
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import { CardNFTCollection, CardNFT } from './../ui-components'
import { Link } from "react-router-dom";


export default function List() {

    // Moralis
    console.log('useMoralis start');
    const { authenticate, isAuthenticated, isAuthenticating, user, account, logout, isInitialized } = useMoralis();
    console.log('useMoralis end');

    console.log('useMoralisWeb3Api start');
    const Web3Api = useMoralisWeb3Api();
    console.log('useMoralisWeb3Api end');

    // LAG
    const baseNftAddress = "0x9c99d7f09d4a7e23ea4e36aec4cb590c5bbdb0e2";
    const baseNftImgHash = "https://ipfs.moralis.io:2053/ipfs/QmWsNgLwBLiqGpUrhUS48ejRFAgUA92ChF6Xo45uMKWnmQ/";
    // const baseNftChain = "eth";
    const tokenIdDigit = 4;

    const [ethNFTs, setEthNFTs] = useState([]);

    useEffect(() => {
        if (isInitialized && isAuthenticated) {
            Web3Api.Web3API.account.getNFTs()
            .then(response => {
                console.log("fetchEthNFTs NFTs");
                console.log(response);
                let nowEthNFTs = [];

                console.log("response.result");
                console.log(response.result);

                if (response.result == undefined || response.result.length == 0) {
                    setEthNFTs(nowEthNFTs);
                    return;
                }

                for (let i = 0; i < response.result.length; i++) {
                    let nowEthNft = response.result[i];
                    // console.log(nowEthNft.token_address);
                    if (nowEthNft.token_address == baseNftAddress) {
                        // console.log("add");

                        // console.log(nowEthNft.metadata);
                        try {
                            nowEthNft.metadata = JSON.parse(nowEthNft.metadata);
                            nowEthNft.itemName = nowEthNft.metadata.name;
                        } catch (error) {
                            nowEthNft.metadata = JSON.parse(JSON.stringify(nowEthNft.metadata));
                            nowEthNft.itemName = nowEthNft.metadata.name;
                        }

                        nowEthNft.moralisImageUri = getMoraliImageUri(nowEthNft.metadata.image);

                        console.log(nowEthNft.itemName);
                        // console.log(nowEthNft.moralisImageUri);

                        nowEthNFTs.push(nowEthNft);
                    }
                }
                setEthNFTs(nowEthNFTs);
            },[])
        }
    }, [isInitialized, isAuthenticated])


    function zeroPadding(token_id, zeroPaddingLength) {
        return ('000000000' + token_id).slice( zeroPaddingLength * -1 );
    }

    function getMoraliImageUri(ipfsUri) {
        // console.log(ipfsUri);
        let returnStr = "https://gateway.moralisipfs.com/ipfs/" + ipfsUri.substring(7);
        // console.log(returnStr);
        return returnStr;
    }

    return (
        <>
            <div className="mv">
                <p className="catch-copy">Let's dress up your NFT</p>
                <p>You can change your NFT clothes. First, select the NFT you want to dress up.</p>
            </div>
            <div class="card-list">
            {ethNFTs.map((ethNft) => (
                <Link to="/dressup">
                    <CardNFT
                        CardNFT={{
                            key: ethNft.token_hash,
                            token_address: ethNft.token_address,
                            collection_name: ethNft.name,
                            token_id: zeroPadding(ethNft.token_id, tokenIdDigit),
                            name: ethNft.itemName,
                            image: ethNft.moralisImageUri,
                        }}
                        height="368px"
                        width="300px"
                        margin="10px 10px 10px 10px" />
                </Link>
            ))}
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
