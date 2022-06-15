import React, { useState, useEffect } from 'react';
import { useMoralis, useMoralisWeb3Api } from "react-moralis";


export default function useEthNFTs() {

    // Moralis
    console.log('useMoralis start');
    const { authenticate, isAuthenticated, isAuthenticating, user, account, logout, isInitialized } = useMoralis();
    console.log('useMoralis end');

    console.log('useMoralisWeb3Api start');
    const Web3Api = useMoralisWeb3Api();
    console.log('useMoralisWeb3Api end');

    // LAG
    const baseNftChain = "Eth";
    const baseNftAddress = "0x9c99d7f09d4a7e23ea4e36aec4cb590c5bbdb0e2";
    const tokenIdDigit = 4;

    const [ethNFTs, setEthNFTs] = useState([]);

    useEffect(() => {
        if (isInitialized && isAuthenticated) {
            Web3Api.Web3API.account.getNFTs(
                {
                    chain: baseNftChain,
                }
            )
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

                        nowEthNft.token_chain = baseNftChain;
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

    return ethNFTs;

    function getMoraliImageUri(ipfsUri) {
        // console.log(ipfsUri);
        let returnStr = "https://gateway.moralisipfs.com/ipfs/" + ipfsUri.substring(7);
        // console.log(returnStr);
        return returnStr;
    }
}

export function useEthNFT(token_address, token_id) {

    const ethNFTs = useEthNFTs();

    for (let i = 0; i < ethNFTs.result.length; i++) {
        let nowEthNft = ethNFTs.result[i];
        // console.log(nowEthNft.token_address);
        if (nowEthNft.token_address == token_address
              && nowEthNft.token_id == token_id) {
            
            return nowEthNft;
        }
    }

    return null;
}