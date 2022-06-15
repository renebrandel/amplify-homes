import React, { useState, useEffect } from 'react';
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Dressup(props) {

    // Moralis
    console.log('useMoralis start');
    const { authenticate, isAuthenticated, isAuthenticating, user, account, logout, isInitialized } = useMoralis();
    console.log('useMoralis end');

    console.log('useMoralisWeb3Api start');
    const Web3Api = useMoralisWeb3Api();
    console.log('useMoralisWeb3Api end');

    // Navigate
    const navigate = useNavigate();

    // LAG
    const baseNftChain = "Eth";
    const baseNftAddress = "0x9c99d7f09d4a7e23ea4e36aec4cb590c5bbdb0e2";
    const tokenIdDigit = 4;

    const [selectedEthNFT, setSelectedEthNFT] = useState([]);

    const query = new URLSearchParams(useLocation().search);
    const selectedNftAddress = query.get('token_address');
    const selectedTokenId = query.get('token_id');

    console.log('selectedNftAddress : ' + selectedNftAddress);
    console.log('selectedTokenId : ' + selectedTokenId);

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

                console.log("response.result");
                console.log(response.result);

                if (response.result == undefined || response.result.length == 0) {
                  navigate('/', {replace: true});
                  return;
                }

                for (let i = 0; i < response.result.length; i++) {
                    let nowEthNft = response.result[i];
                    // console.log(nowEthNft.token_address);
                    if (nowEthNft.token_address == selectedNftAddress
                          && nowEthNft.token_id == selectedTokenId) {
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

                        setSelectedEthNFT(nowEthNft);
                        return;
                    }
                }
                navigate('/dressup', {replace: true});
            },[])
        } else {
          navigate('/', {replace: true});
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
        <div class="card card__dress-up">
          <div class="card__dress-up--header">
            <div>
              <h1 class="card__dress-up--title">Outfit Room</h1>
              <Link to="/"><a href="" class="back-link">←Change NFT</a></Link>
            </div>
            <button>↓ Download</button>
          </div>
          <div class="card__dress-up--change">
            <div class="card__dress-up--image">
              <img src={`${selectedEthNFT.moralisImageUri}`} width="400" />
              <p class="card__dress-up--pj">{`${selectedEthNFT.name}`}</p>
              <p class="card__dress-up--no">{`${selectedEthNFT.itemName}`}</p>
            </div>
            <div class="card__dress-up--option">
              <dl>
                <dt>Background</dt>
                <dd>
                  <button>Floral</button>
                  <button>Gradation</button>
                  <button class="select">[R]Pink Pinstripe</button>
                </dd>
              </dl>
              <dl>
                <dt>Body</dt>
                <dd>
                  <button>Casual Brown</button>
                  <button class="select">Casual Brown</button>
                  <button>Autumn Kimono</button>
                  <button>Festival Kimono</button>
                </dd>
              </dl>
              <dl>
                <dt>Face</dt>
                <dd>
                  <button class="select">Puple Gal</button>
                </dd>
              </dl>
              <dl>
                <dt>Hair</dt>
                <dd>
                  <button>Straight</button>
                  <button class="select">Blue Pigtails</button>
                  <button>Bun</button>
                  <button>Wavy</button>
                  <button>[R]Black Pigtails</button>
                  <button>[R]Cafe Girl2</button>
                  <button>Foo</button>
                </dd>
              </dl>
            </div>
          </div>
        </div>
    );
  }
