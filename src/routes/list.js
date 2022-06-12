import React, { useEffect } from 'react';
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import { CardNFTCollection, CardNFT } from './../ui-components'
import { Link } from "react-router-dom";


export default function List() {

    // Moralis
    console.log('useMoralis start');
    const { authenticate, isAuthenticated, isAuthenticating, user, account, logout } = useMoralis();
    console.log('useMoralis end');

    console.log('useMoralisWeb3Api start');
    const Web3Api = useMoralisWeb3Api();
    console.log('useMoralisWeb3Api end');

    useEffect(() => {
        console.log("isAuthenticated : " + isAuthenticated);
        if (isAuthenticated) {
            // add your logic here
            dispNFTs();

        } else {
        }
            // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated]);

    // LAG
    const baseNftAddress = "0x9c99d7f09d4a7e23ea4e36aec4cb590c5bbdb0e2";
    const baseNftImgHash = "https://ipfs.moralis.io:2053/ipfs/QmWsNgLwBLiqGpUrhUS48ejRFAgUA92ChF6Xo45uMKWnmQ/";
    // const baseNftChain = "eth";
    const tokenIdDigit = 4;

    // get NFTs from connected wallet address
    const dispNFTs = () => {
        if (isAuthenticated) {
            try {
                let nfts = getNFTs();
                console.log("dispNFTs nfts");
                console.log(nfts);
                return nfts;
            } catch(e) {
                console.log(e);
            }
        } else {
            return <div id="hogehoge"></div>;
        }

    }

    const getNFTs = () => {
        // get NFTs for current user on Mainnet
        let nfts = null;
        Web3Api.account.getNFTs()
        .then(nfts => {
            nfts = renderNFTs(nfts);
            console.log("getNFTs nfts");
            console.log(nfts);
            return nfts;
        });
    }

    const renderNFTs = (nfts) => {

        try {
            console.log("renderNFTs nfts");
            console.log(nfts);
            console.log("renderNFTs nfts.result");
            console.log(nfts.result);
        } catch (e) {
            //
        }

        if (nfts == null || nfts.result == undefined) {
            return;
        }

        const items = [];

        for (var i in nfts.result) {
            let row = nfts.result[i];
            // console.log(row.token_id);

            if (row.token_address == baseNftAddress) {
                var nowTokenId = zeroPadding(row.token_id, tokenIdDigit);
                // console.log(`${row.token_id}`);
                items.push(
                    <CardNFT
                        CardNFT={{
                            token_address: row.token_address,
                            collection_name: 'Love Addicted Girls',
                            token_id: nowTokenId,
                            name: row.name,
                            image: baseNftImgHash + nowTokenId + '.png',
                        }}
                        height="368px"
                        width="300px"
                        margin="10px 10px 10px 10px" />
                );
            }
        }
        console.log("items");
        console.log(items);
        return items;

    }

    function zeroPadding(token_id, zeroPaddingLength) {
        return ('000000000' + token_id).slice( zeroPaddingLength * -1 );
    }

    return (
        <>
            <div className="mv">
                <p className="catch-copy">Let's dress up your NFT</p>
                <p>You can change your NFT clothes. First, select the NFT you want to dress up.</p>
            </div>
            {dispNFTs()}
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
