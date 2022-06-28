import { ConsoleLogger } from '@aws-amplify/core';
import React, { useState, useEffect } from 'react';
import { useMoralis, useMoralisWeb3Api } from "react-moralis";


export default function useEthNFTs(targetChain, targetAddress) {

    console.log("useEthNFTs start");

    // Moralis
    // console.log('useMoralis start');
    const { authenticate, isAuthenticated, isAuthenticating, user, account, logout, isInitialized } = useMoralis();
    // console.log('useMoralis end');

    // console.log('useMoralisWeb3Api start');
    const Web3Api = useMoralisWeb3Api();
    // console.log('useMoralisWeb3Api end');

    const [ethNFTs, setEthNFTs] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (isInitialized && isAuthenticated) {

            Web3Api.account.getNFTsForContract({
                chain: targetChain,
                token_address: targetAddress,
            })
            .then(response => {
                console.log("fetchEthNFTs NFTs");
                console.log(response);
        
                // console.log("response.result");
                // console.log(response.result);
        
                if (response.result === undefined || response.result.length === 0) {
                    setIsLoaded(true);
                    return [ethNFTs, true];
                }

                let nowEthNFTs = [];
        
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
                            if (nowEthNft.symbol === "LAG" || nowEthNft.symbol === "CNP") {
                                // LAGとCNPは画像をうちのS3に置いてある。何故か読み込めない時があったので。
                                let nowImageName = nowEthNft.token_id;
                                // LAGの画像ファイル名は4桁固定の0パディング
                                if (nowEthNft.symbol === "LAG") {
                                    nowImageName = nowImageName.padStart(4, '0');
                                }
                                nowEthNft.moralisImageUri = `https://love-addicted-girls-test.s3.ap-northeast-3.amazonaws.com/gen-res/${nowEthNft.symbol}/pics/${nowImageName}.png`
                            } else if (nowEthNft.metadata.image.startsWith("ipfs://")) {
                                // IPFSの場合は、moralisがキャッシュしてくれる画像を取ってくる。
                                // でもちらほら見れないという報告が来るので、基本的に自前のサーバーに持ってきたほうが良さそう。
                                nowEthNft.moralisImageUri = getMoraliImageUri(nowEthNft.metadata.image);
                            } else {
                                nowEthNft.moralisImageUri = nowEthNft.metadata.image;
                            }
                        }
                    } else {
                        nowEthNft.itemName = `${nowEthNft.symbol}_${nowEthNft.token_id}`;
                        nowEthNft.moralisImageUri = "";
                    }
        
                    // console.log(nowEthNft.itemName);
                    // console.log(nowEthNft.moralisImageUri);
        
                    nowEthNFTs.push(nowEthNft);
                }

                setEthNFTs(nowEthNFTs);
                setIsLoaded(true);
    
                console.log("this is return");
                console.log(ethNFTs);
                console.log("isLoaded " + isLoaded);
                return [ethNFTs, isLoaded];
            },[])

        console.log("this is return");
        console.log(ethNFTs);
        console.log("isLoaded " + isLoaded);
        return [ethNFTs, isLoaded];

        }
    }, [isInitialized, isAuthenticated, user])

    return [ethNFTs, isLoaded];

    function getMoraliImageUri(ipfsUri) {
        // console.log(ipfsUri);
        let returnStr = "https://gateway.moralisipfs.com/ipfs/" + ipfsUri.substring(7);
        // console.log(returnStr);
        return returnStr;
    }

}

export function useEthNFT(targetChain, targetAddress, targetTokenId) {

    const [ethNFTs, isLoaded] = useEthNFTs(targetChain, targetAddress);

    for (let i = 0; i < ethNFTs.length; i++) {
        let nowEthNft = ethNFTs[i];
        // console.log(nowEthNft.token_address);
        if (nowEthNft.token_id === targetTokenId) {
            return nowEthNft;
        }
    }

    return null;
}