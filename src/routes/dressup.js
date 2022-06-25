import React, { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import { useEthNFT } from '../api/evmnft';
import { ButtonGroup } from '@aws-amplify/ui-react';
import html2canvas from "html2canvas";

export default function Dressup(props) {

  console.log("Dressup start");
  console.log(props);

    const query = new URLSearchParams(useLocation().search);
    const selectedChain = query.get('token_chain');
    const selectedNftAddress = query.get('token_address');
    const selectedTokenId = query.get('token_id');

    const selectedEthNFT = useEthNFT(selectedChain, selectedNftAddress, selectedTokenId);

    console.log('selectedNftAddress : ' + selectedNftAddress);
    console.log('selectedTokenId : ' + selectedTokenId);
    console.log(selectedEthNFT);

    const [selectedAttributes, setSelectedAttributes] = useState([]);

    const partsBaseUrl = "https://love-addicted-girls-test.s3.ap-northeast-3.amazonaws.com/gen-res/";

    const [dressUpPicBackgroundUrl, setDressUpPicBackgroundUrl] = useState([]);
    const [dressUpPicBackhairUrl, setDressUpPicBackhairUrl] = useState([]);
    const [dressUpPicFaceUrl, setDressUpPicFaceUrl] = useState([]);
    const [dressUpPicBodyUrl, setDressUpPicBodyUrl] = useState([]);
    const [dressUpPicFronthairUrl, setDressUpPicFronthairUrl] = useState([]);
    const [dressUpPicVailStyle, setDressUpPicVailStyle] = useState({backgroundColor: 'lightgray'});

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

        if (nowSelectedAttributes.Hair == undefined) {
          // LAG以外の場合、暫定的にbackhairに元の画像を入れる
          setDressUpPicBackhairUrl(selectedEthNFT.moralisImageUri);
        }

        // パーツがパラパラ表示されるのを防ぐために灰色にしておいたヴェールを2秒後に透明にする
        // パーツ画像が全部ロードされたのを検知してやりたかったが、難しかったので固定の秒数で暫定対応
        const timer = setTimeout(() => {
          //some action
          setDressUpPicVailStyle({backgroundColor: 'transparent'});
        }, 1.3 * 1000);
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
        if (value.startsWith("CNP") || value.startsWith("LAG")) {
          return partsBaseUrl + value.substr(0, 3) + "/parts/" + type + "/" + value.substr(4) + ".png";
        } else {
          return partsBaseUrl + "LAG/parts/" + type + "/" + value + ".png";
        }
      }
    }


    const saveAsImage = uri => {
      const downloadLink = document.createElement("a");
    
      if (typeof downloadLink.download === "string") {
        downloadLink.href = uri;
    
        // ファイル名
        downloadLink.download = "dressup.png";
    
        // Firefox では body の中にダウンロードリンクがないといけないので一時的に追加
        document.body.appendChild(downloadLink);
    
        // ダウンロードリンクが設定された a タグをクリック
        downloadLink.click();
    
        // Firefox 対策で追加したリンクを削除しておく
        document.body.removeChild(downloadLink);
      } else {
        window.open(uri);
      }
    }
    
    const onClickExport = () => {
      // 画像に変換する component の id を指定
      const target = document.getElementById("dress-up-window");
      const area = target.getBoundingClientRect();

      html2canvas(target, {
        useCORS: true,
        scrollX: 0,
        scrollY: 0,
        width: area.width,
        height: area.height,
        onrendered: function (canvas) {
          document.body.appendChild(canvas);
        },
        backgroundColor :null,
      }).then(canvas => {
        const targetImgUri = canvas.toDataURL("img/png");
        saveAsImage(targetImgUri);
      });
    }
    
  return (
      <>
        <div class="card card__dress-up">
          <div class="card__dress-up--header">
            <div>
              <Link to={`/`} class="back-link">←Change NFT</Link>
              <h1 class="card__dress-up--title">Outfit Room</h1>
            </div>
            <button onClick={onClickExport}>↓ Download</button>
          </div>
          <div class="card__dress-up--change">
            <div class="card__dress-up--image">
              {selectedEthNFT != null &&
                <>
                  <div id="dress-up-window" width="400" height="400">
                    {/* <img className="dress-up-pic" src={`${selectedEthNFT.moralisImageUri}`} /> */}
                    <img className="dress-up-pic-background" src="/none.png"/>
                    {/* <img className="dress-up-pic" src="https://love-addicted-girls-test.s3.ap-northeast-3.amazonaws.com/gen-res/LAG/parts/background/%5BR%5DBlue+Pinstripe2.png" /> */}
                    <img className="dress-up-pic" crossOrigin='anonymous' src={dressUpPicBackgroundUrl} />
                    <img className="dress-up-pic" crossOrigin='anonymous' src={dressUpPicBackhairUrl} />
                    <img className="dress-up-pic" crossOrigin='anonymous' src={dressUpPicBodyUrl} />
                    <img className="dress-up-pic" crossOrigin='anonymous' src={dressUpPicFaceUrl} />
                    <img className="dress-up-pic" crossOrigin='anonymous' src={dressUpPicFronthairUrl} />
                    <div id="dress-up-pic-vail" width="400" height="400" className='dress-up-pic' style={dressUpPicVailStyle} />
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
                    <button value="none">none</button>
                    {selectedEthNFT != null && selectedEthNFT.symbol == "LAG" &&
                      <>
                        <button value={selectedAttributes.Background}>{selectedAttributes.Background}</button>
                        <button value="LAG Blue Pinstripe">Blue Pinstripe</button>
                        <button value="LAG Pink Pinstripe">Pink Pinstripe</button>
                        <button value="LAG Violet Pinstripe">Violet Pinstripe</button>
                        <button value="LAG AstarCats1139">AstarCats1139</button>
                        <button value="LAG AstarCats2377">AstarCats2377</button>
                        <button value="LAG AstarCats6730">AstarCats6730</button>
                      </>
                    }
                    {selectedEthNFT != null && selectedEthNFT.symbol == "CNP" &&
                      <>
                        <button value="CNP back_01_001">Standard01</button>
                        <button value="CNP back_01_002">Standard02</button>
                        <button value="CNP back_01_003">Standard03</button>
                        <button value="CNP back_01_004">Standard04</button>
                        <button value="CNP back_01_005">Standard05</button>
                        <button value="CNP back_01_006">Standard06</button>
                        <button value="CNP back_01_007">Standard07</button>
                        <button value="CNP back_01_008">Standard08</button>
                        <button value="CNP back_01_009">Standard09</button>
                        <button value="CNP back_01_010">Standard10</button>
                        <button value="CNP back_02_001">Choppy sea01</button>
                        <button value="CNP back_02_002">Choppy sea02</button>
                        <button value="CNP back_02_003">Choppy sea03</button>
                        <button value="CNP back_02_004">Choppy sea04</button>
                        <button value="CNP back_02_005">Choppy sea05</button>
                        <button value="CNP back_02_006">Choppy sea06</button>
                        <button value="CNP back_02_007">Choppy sea07</button>
                        <button value="CNP back_02_008">Choppy sea08</button>
                        <button value="CNP back_02_009">Choppy sea09</button>
                        <button value="CNP back_02_010">Choppy sea10</button>
                      </>
                    }
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
