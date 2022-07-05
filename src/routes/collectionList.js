import NFTList from './nftList';


export default function CollectionList() {

    const targetEvmNFTs = [
        {
            name: "Love Addicted Girls",
            chain: "Eth",
            address: "0x9c99d7f09d4a7e23ea4e36aec4cb590c5bbdb0e2",
            url: "https://opensea.io/collection/love-addicted-girls",
        },
        {
            name: "CryptoNinja Partners",
            chain: "Eth",
            address: "0x845a007d9f283614f403a24e3eb3455f720559ca",
            url: "https://opensea.io/collection/cryptoninjapartners",
        },
    ];

    // // LAG
    // const [lagNFTs, isLagLoaded] = useEthNFTs(targetEvmNFTs[0].chain, targetEvmNFTs[0].address);
    // // CNP
    // const [cnpNFTs, isCnpLoaded] = useEthNFTs(targetEvmNFTs[1].chain, targetEvmNFTs[1].address);

    // console.log("List lagNFTs");
    // console.log(lagNFTs);
    // console.log("List isLagLoaded " + isLagLoaded);

    // console.log("List cnpNFTs");
    // console.log(cnpNFTs);
    // console.log("List isCnpLoaded " + isCnpLoaded);

    // const cardNFTOverrides = {
    //     "image": {
    //       crossOrigin: "anonymous",
    //     },
    // }

    return (
        <>
            <div className="mv" key={'mv1'}>
                <p className="catch-copy">Let's dress up your NFT</p>
                <p>You can change your NFT clothes. First, select the NFT you want to dress up.</p>
            </div>

            {targetEvmNFTs.map((nowTargetEvmNFT) => (
                <>
                    {NFTList(nowTargetEvmNFT)}
                </>
            ))}

            {/* <div className="mv" key={targetEvmNFTs[0].address} style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', padding: '1em'}}>
                <p className="collection">{targetEvmNFTs[0].name}</p>
                <div class="card-list">
                    {lagNFTs !== undefined && lagNFTs.map((ethNFT) => (
                        <Link to={`/dressup?token_chain=Eth&token_address=${ethNFT.token_address}&token_id=${ethNFT.token_id}`} style={{textDecoration: 'none'}}>
                            <CardNFT
                                CardNFT={{
                                    key: ethNFT.token_hash,
                                    token_address: ethNFT.token_address,
                                    collection_name: ethNFT.name,
                                    name: ethNFT.itemName,
                                    image: ethNFT.moralisImageUri,
                                }}
                                height="368px"
                                width="300px"
                                margin="10px 10px 10px 10px"
                                overrides={ethNFT.symbol !== "LAG" && cardNFTOverrides} />
                        </Link>
                    ))}
                </div>
            </div>
            {!isAuthenticated &&
                <div className="mv" key={targetEvmNFTs[0].address + '-a'}>
                    <p>First of all, please connect to the wallet.</p>
                </div>
            }
            {isAuthenticated && !isLagLoaded &&
                <div className="mv" key={targetEvmNFTs[0].address + '-b'}>
                    <p>Now loading the NFT you have...</p>
                </div>
            }
            {isAuthenticated && isLagLoaded && lagNFTs.length === 0 &&
                <div className="mv" key={targetEvmNFTs[0].address + '-c'}>
                    <p>{targetEvmNFTs[0].name} NFT not found.</p>
                    <p>To enjoy the dress up, please purchase <a href={targetEvmNFTs[0].url}>Love Addicted Girls</a> first.</p>
                </div>
            }


            <div className="mv" key={'mv6'} style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', padding: '1em'}}>
                <p className="collection">CryptoNinja Partners</p>
                <div class="card-list">
                    {cnpNFTs.map((ethNFT) => (
                        <Link to={`/dressup?token_chain=Eth&token_address=${ethNFT.token_address}&token_id=${ethNFT.token_id}`} style={{textDecoration: 'none'}}>
                            <CardNFT
                                CardNFT={{
                                    key: ethNFT.token_hash,
                                    token_address: ethNFT.token_address,
                                    collection_name: ethNFT.name,
                                    name: ethNFT.itemName,
                                    image: ethNFT.moralisImageUri,
                                }}
                                height="368px"
                                width="300px"
                                margin="10px 10px 10px 10px"
                                overrides={ethNFT.symbol !== "LAG" && cardNFTOverrides} />
                        </Link>
                    ))}
                </div>
            </div>
            {!isAuthenticated &&
                <div className="mv" key={'mv6-a'}>
                    <p>First of all, please connect to the wallet.</p>
                </div>
            }
            {isAuthenticated && !isCnpLoaded &&
                <div className="mv" key={'mv6-b'}>
                    <p>Now loading the NFT you have...</p>
                </div>
            }
            {isAuthenticated && isCnpLoaded && cnpNFTs.length === 0 &&
                <div className="mv" key={'mv6-c'}>
                    <p>NFT not found.</p>
                    <p>To enjoy the dress up, please purchase <a href="https://opensea.io/collection/cryptoninjapartners">CryptoNinja Partners</a> first.</p>
                </div>
            } */}


            {/* {(lagNFTs == undefined || lagNFTs.length === 0) && (cnpNFTs == undefined || cnpNFTs.length === 0) &&
                <div style={{height: 300 + 'px'}}></div>
            } */}
            <div className="mv" key={'mv4'} style={{marginTop: '8em'}}>
                <p>Dress Up NFT is currently in beta version.</p>
                <p>Please contact <a href='https://twitter.com/syunduel'>shunichiro(@syunduel)</a> to report bugs, request improvements, or discuss adding collections.</p>
            </div>

        </>
    );
  }
