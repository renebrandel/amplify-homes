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
    const baseNFTChains = [
        "0x9c99d7f09d4a7e23ea4e36aec4cb590c5bbdb0e2",
        "0x845a007d9f283614f403a24e3eb3455f720559ca",
    ];

    const [ethNFTs, setEthNFTs] = useState([]);
    const [ethNFTsAll, setEthNFTsAll] = useState([]);
    const isLoaded = false;

    useEffect(() => {
        if (isInitialized && isAuthenticated) {
            Web3Api.Web3API.account.getNFTs({
                chain: "Eth",
            })
            .then(response => {
                console.log("fetchEthNFTs NFTs");
                console.log(response);
                const nowEthNFTs = [];
                const nowEthNFTsAll = [];

                console.log("response.result");
                console.log(response.result);

                if (response.result == undefined || response.result.length == 0) {
                    setEthNFTs(nowEthNFTs);
                    return;
                }

                for (let i = 0; i < response.result.length; i++) {
                    const nowEthNft = response.result[i];
                    // console.log(nowEthNft.token_address);

                    // console.log(nowEthNft.metadata);
                    if (nowEthNft.metadata !== undefined) {

                        try {
                            nowEthNft.metadata = JSON.parse(nowEthNft.metadata);
                        } catch (error) {
                            nowEthNft.metadata = JSON.parse(JSON.stringify(nowEthNft.metadata));
                        }
                        if (nowEthNft.metadata !== null && nowEthNft.metadata.name !== undefined) {
                            nowEthNft.itemName = nowEthNft.metadata.name;
                        } else {
                            nowEthNft.itemName = `${nowEthNft.symbol}_${nowEthNft.token_id}`;
                        }

                        if (nowEthNft.metadata === null || nowEthNft.metadata.image === undefined) {
                            nowEthNft.moralisImageUri = "";
                        } else {
                            if (nowEthNft.metadata.image.startsWith("ipfs://")) {
                                nowEthNft.moralisImageUri = getMoraliImageUri(nowEthNft.metadata.image);
                            } else {
                                if (nowEthNft.symbol == "CNP") {
                                    // CNPは画像をうちのS3に置いてある。何故か読み込めない時があったので。
                                    nowEthNft.moralisImageUri = `https://love-addicted-girls-test.s3.ap-northeast-3.amazonaws.com/gen-res/CNP/pics/${nowEthNft.token_id}.png`
                                } else {
                                    nowEthNft.moralisImageUri = nowEthNft.metadata.image;
                                }
                            }
                        }
                    } else {
                        nowEthNft.itemName = `${nowEthNft.symbol}_${nowEthNft.token_id}`;
                        nowEthNft.moralisImageUri = "";
                    }

                    nowEthNft.token_chain = "Eth";

                    console.log(nowEthNft.itemName);
                    // console.log(nowEthNft.moralisImageUri);

                    // 着せ替え対象だけ選別する
                    if (baseNFTChains.indexOf(nowEthNft.token_address) != -1) {
                        nowEthNFTs.push(nowEthNft);
                    }

                    // こちらは全て保持する（取得したものの調査のため
                    nowEthNFTsAll.push(nowEthNft);
                }
                setEthNFTs(nowEthNFTs);
                setEthNFTsAll(nowEthNFTsAll);
                isLoaded = true;
            },[])
        }
    }, [isInitialized, isAuthenticated])

    return [ethNFTs, ethNFTsAll, isLoaded];

    function getMoraliImageUri(ipfsUri) {
        // console.log(ipfsUri);
        let returnStr = "https://gateway.moralisipfs.com/ipfs/" + ipfsUri.substring(7);
        // console.log(returnStr);
        return returnStr;
    }
}

export function useEthNFT(token_address, token_id) {

    const [ethNFTs, ethNFTsAll, isLoaded] = useEthNFTs();

    for (let i = 0; i < ethNFTs.length; i++) {
        let nowEthNft = ethNFTs[i];
        // console.log(nowEthNft.token_address);
        if (nowEthNft.token_address === token_address
              && nowEthNft.token_id === token_id) {
            
            return nowEthNft;
        }
    }

    return null;
}