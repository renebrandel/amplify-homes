import React, { useEffect } from 'react';
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import { CardNFTCollection, CardNFT } from './../ui-components'
import { Link } from "react-router-dom";


export default function List() {

    const { authenticate, isAuthenticated, isAuthenticating, user, account, logout } = useMoralis();

    useEffect(() => {
        console.log("isAuthenticated : " + isAuthenticated);
        if (isAuthenticated) {
            // add your logic here
            dispNFTs();

        } else {
        }
            // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated]);

    // Moralis
    const Web3Api = useMoralisWeb3Api();

    // LAG
    const baseNftAddress = "0x9c99d7f09d4a7e23ea4e36aec4cb590c5bbdb0e2";
    const baseNftImgHash = "QmWsNgLwBLiqGpUrhUS48ejRFAgUA92ChF6Xo45uMKWnmQ";
    // const baseNftChain = "eth";
    const tokenIdDigit = 4;

    var nfts = null;

    // get NFTs from connected wallet address
    async function dispNFTs() {

    getNFTs();
    // renderNFTs(nfts);
    }

    const getNFTs = () => {

    // get NFTs for current user on Mainnet
    const userEthNFTs = Web3Api.account.getNFTs();
    console.log(userEthNFTs);

    }

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
