import { ConsoleLogger } from '@aws-amplify/core';
import React, { useState, useEffect } from 'react';
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import axios from "axios";

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

    const serverRoot = "https://dress-up-nft-ap-northeast-1.s3.ap-northeast-1.amazonaws.com/v1/collection/";

    useEffect(() => {
        const getNFTs = async () => {

            if (!isInitialized || !isAuthenticated) {
                return
            }

            // MoralisからNFTの一覧を取得する
            const response = await Web3Api.account.getNFTsForContract({
                chain: targetChain,
                token_address: targetAddress,
            });

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
                let nowEthNft = response.result[i];
                // console.log(nowEthNft.token_address);

                nowEthNft.chain = targetChain;
    
                console.log(`nowEthNft.metadata token_id: ${nowEthNft.token_id}`);
                console.log(nowEthNft.symbol);

                // metadataを自前サーバーから取得する
                if (nowEthNft.symbol === "LAG" || nowEthNft.symbol === "LAGM") {

                    const metadataRes = await axios.get(`${serverRoot}${targetChain}/${nowEthNft.symbol}_${targetAddress}/token-uri/${nowEthNft.token_id}.json`);

                    console.log("axios.get");
                    console.log(metadataRes.data);

                    try {
                        nowEthNft.metadata = JSON.parse(metadataRes.data);
                    } catch (error) {
                        nowEthNft.metadata = JSON.parse(JSON.stringify(metadataRes.data));
                    }

                    console.log("nowEthNft.metadata");
                    console.log(nowEthNft.metadata);

                    nowEthNft = setProps(serverRoot, nowEthNft, targetChain, targetAddress);
                    // console.log(`nowEthNft.symbol: ${nowEthNft.symbol}`);

                    console.log(nowEthNft.itemName);
                    console.log(nowEthNft.moralisImageUri);
        
                    nowEthNFTs.push(nowEthNft);
    
                } else {
                    if (nowEthNft.metadata !== undefined) {
        
                        try {
                            nowEthNft.metadata = JSON.parse(nowEthNft.metadata);
                        } catch (error) {
                            nowEthNft.metadata = JSON.parse(JSON.stringify(nowEthNft.metadata));
                        }

                        console.log("nowEthNft.metadata");
                        console.log(nowEthNft.metadata);

                        nowEthNft = setProps(serverRoot, nowEthNft, targetChain, targetAddress);

                        console.log(nowEthNft.itemName);
                        console.log(nowEthNft.moralisImageUri);
            
                        nowEthNFTs.push(nowEthNft);
                    }
                }

            }

            setEthNFTs(nowEthNFTs);
            setIsLoaded(true);

            console.log("this is return");
            console.log(ethNFTs);
            console.log("isLoaded " + isLoaded);
            return [ethNFTs, isLoaded];
        }

        getNFTs();

    }, [isInitialized, isAuthenticated, user])

    return [ethNFTs, isLoaded];

    function getMoraliImageUri(ipfsUri) {
        // console.log(ipfsUri);
        let returnStr = "https://gateway.moralisipfs.com/ipfs/" + ipfsUri.substring(7);
        // console.log(returnStr);
        return returnStr;
    }

}

function setProps(serverRoot, nowEthNft, targetChain, targetAddress) {

    if (nowEthNft.metadata !== null && nowEthNft.metadata.name !== undefined) {
        nowEthNft.itemName = nowEthNft.metadata.name;
    } else {
        nowEthNft.itemName = `${nowEthNft.symbol}_${nowEthNft.token_id}`;
    }

    // 画像を時前サーバーから取得する
    if (nowEthNft.symbol === "LAG" || nowEthNft.symbol === "LAGM" || nowEthNft.symbol === "CNP") {
        // 何故か読み込めない時があったので、画像はうちのS3に置いてある。
        let nowImageName = nowEthNft.token_id;
        // LAGとLAGMの画像ファイル名は4桁固定の0パディング
        if (nowEthNft.symbol === "LAG" || nowEthNft.symbol === "LAGM") {
            nowImageName = nowImageName.padStart(4, '0');
        }
        nowEthNft.moralisImageUri = `${serverRoot}${targetChain}/${nowEthNft.symbol}_${targetAddress}/pics/${nowImageName}.png`
        
    } else {
        nowEthNft.moralisImageUri = nowEthNft.metadata.image;
    }

    console.log(nowEthNft.moralisImageUri);

    return nowEthNft;
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