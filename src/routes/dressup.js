import React, { useState, useEffect } from 'react';
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEthNFT } from '../api/evmnft';
import { ButtonGroup } from '@aws-amplify/ui-react';

export default function Dressup(props) {

    const query = new URLSearchParams(useLocation().search);
    const selectedNftAddress = query.get('token_address');
    const selectedTokenId = query.get('token_id');

    const selectedEthNFT = useEthNFT(selectedNftAddress, selectedTokenId);

    console.log('selectedNftAddress : ' + selectedNftAddress);
    console.log('selectedTokenId : ' + selectedTokenId);
    console.log(selectedEthNFT);

    const [selectedAttributes, setSelectedAttributes] = useState([]);

    const partsBaseUrl = "https://love-addicted-girls-test.s3.ap-northeast-3.amazonaws.com/gen-res/LAG/parts/";

    const [dressUpPicBackgroundUrl, setDressUpPicBackgroundUrl] = useState([]);
    const [dressUpPicBackhairUrl, setDressUpPicBackhairUrl] = useState([]);
    const [dressUpPicFaceUrl, setDressUpPicFaceUrl] = useState([]);
    const [dressUpPicBodyUrl, setDressUpPicBodyUrl] = useState([]);
    const [dressUpPicFronthairUrl, setDressUpPicFronthairUrl] = useState([]);

    useEffect(() => {
      window.scrollTo(0, 0)

      const nowSelectedAttributes = {};

      if (selectedEthNFT != null) {
        for (var i = 0; i < selectedEthNFT.metadata.attributes.length; i++) {
          const attribute = selectedEthNFT.metadata.attributes[i];
          nowSelectedAttributes[attribute.trait_type] = attribute.value;
        };
 
        setSelectedAttributes(nowSelectedAttributes);
        
        setDressUpPicBackgroundUrl(getImageUrl("background", nowSelectedAttributes.Background));
        setDressUpPicBackhairUrl(getImageUrl("backhair", nowSelectedAttributes.Hair));
        setDressUpPicBodyUrl(getImageUrl("body", nowSelectedAttributes.Body));
        setDressUpPicFaceUrl(getImageUrl("face", nowSelectedAttributes.Face));
        setDressUpPicFronthairUrl(getImageUrl("fronthair", nowSelectedAttributes.Hair));

        // console.log("selectedAttributes.Background");
        // console.log(selectedAttributes.Background);
      }
    }, [selectedEthNFT]);

    const onClickBackground = (event) => {

      console.log(event.target);
      // event.target.className = "select";

      if (event.target.value == null || event.target.value == undefined) {
        return;
      }

      const nowDressUpPicBackgroundUrl = getImageUrl("background", event.target.value);
      console.log(dressUpPicBackgroundUrl);
      setDressUpPicBackgroundUrl(nowDressUpPicBackgroundUrl);
    }

    const getImageUrl = (type, value) => {
      if (value == null || value == "" || value == "none") {
        return "/none.png";
      } else {
        return partsBaseUrl + type + "/" + value + ".png";
      }
    }


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
                  <div id="dress-up-window" width="400" height="400">
                    {/* <img className="dress-up-pic" src={`${selectedEthNFT.moralisImageUri}`} /> */}
                    <img className="dress-up-pic-background" src="/none.png"/>
                    {/* <img className="dress-up-pic" src="https://love-addicted-girls-test.s3.ap-northeast-3.amazonaws.com/gen-res/LAG/parts/background/%5BR%5DBlue+Pinstripe2.png" /> */}
                    <img className="dress-up-pic" src={dressUpPicBackgroundUrl} />
                    <img className="dress-up-pic" src={dressUpPicBackhairUrl} />
                    <img className="dress-up-pic" src={dressUpPicBodyUrl} />
                    <img className="dress-up-pic" src={dressUpPicFaceUrl} />
                    <img className="dress-up-pic" src={dressUpPicFronthairUrl} />
                  </div>
                  
                  <p class="card__dress-up--pj">{`${selectedEthNFT.name}`}</p>
                  <p class="card__dress-up--no">{`${selectedEthNFT.itemName}`}</p>
                </>
              }
              {selectedEthNFT == null &&
                <>
                  <div id="dress-up-window" width="400" height="400">
                    <img className="dress-up-pic-background" src="/none.png"/>
                  </div>
                  <p class="card__dress-up--pj"></p>
                  <p class="card__dress-up--no"></p>
                </>
              }
            </div>
            <div class="card__dress-up--option">
              <dl>
                <dt>Background</dt>
                <dd>
                  <ButtonGroup aria-label="Background-btn" style={{flexWrap: 'wrap'}} onClick={onClickBackground}>
                    <button value={selectedAttributes.Background}>{selectedAttributes.Background}</button>
                    <button value="none">none</button>
                    <button value="Blue Pinstripe">Blue Pinstripe</button>
                    <button value="Pink Pinstripe">Pink Pinstripe</button>
                    <button value="Violet Pinstripe">Violet Pinstripe</button>
                  </ButtonGroup>
                </dd>
              </dl>
              {/* <dl>
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
              </dl> */}
            </div>
          </div>
        </div>
      </>

    );
  }
