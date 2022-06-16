import React, { useState, useEffect } from 'react';
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEthNFT } from '../api/evmnft';

export default function Dressup(props) {

    const query = new URLSearchParams(useLocation().search);
    const selectedNftAddress = query.get('token_address');
    const selectedTokenId = query.get('token_id');

    let selectedEthNFT = useEthNFT(selectedNftAddress, selectedTokenId);;

    console.log('selectedNftAddress : ' + selectedNftAddress);
    console.log('selectedTokenId : ' + selectedTokenId);
    console.log('selectedEthNFT : ' + selectedEthNFT);

    useEffect(() => {
      window.scrollTo(0, 0)
    }, []);

  return (
      <>
        <div class="card card__dress-up">
          <div class="card__dress-up--header">
            <div>
              <Link to={`/`} class="back-link">←Change NFT</Link>
              <h1 class="card__dress-up--title">Outfit Room</h1>
            </div>
            <button>↓ Download</button>
          </div>
          <div class="card__dress-up--change">
            <div class="card__dress-up--image">
              {selectedEthNFT != null &&
                <>
                  <img src={`${selectedEthNFT.moralisImageUri}`} width="400" />
                  <p class="card__dress-up--pj">{`${selectedEthNFT.name}`}</p>
                  <p class="card__dress-up--no">{`${selectedEthNFT.itemName}`}</p>
                </>
              }
              {selectedEthNFT == null &&
                <>
                  <img src="/shadow.png" width="400" />
                  <p class="card__dress-up--pj"></p>
                  <p class="card__dress-up--no"></p>
                </>
              }
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
      </>

    );
  }
