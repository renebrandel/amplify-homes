import NFTList from './nftList';


export default function CollectionList() {

    const targetEvmNFTs = [
        // {
        //     name: "Love Addicted Girls",
        //     chain: "Eth",
        //     address: "0x9c99d7f09d4a7e23ea4e36aec4cb590c5bbdb0e2",
        //     url: "https://opensea.io/collection/love-addicted-girls",
        // },
        {
            name: "Love Addicted Girls Memories",
            chain: "Polygon",
            address: "0x1a4041cce1aea5fff82e13780d1b1f522a047ef9",
            url: "https://opensea.io/collection/love-addicted-girls",
        },
        {
            name: "CryptoNinja Partners",
            chain: "Eth",
            address: "0x845a007d9f283614f403a24e3eb3455f720559ca",
            url: "https://opensea.io/collection/cryptoninjapartners",
        },
    ];

    return (
        <>
            <div className="mv" key={'mv1'}>
                <p className="catch-copy">Let's dress up your NFT</p>
                <p>You can change your NFT clothes. First, select the NFT you want to dress up.</p>
            </div>

            {targetEvmNFTs.map((nowTargetEvmNFT) => (
                <div key={nowTargetEvmNFT.address}>
                    {NFTList(nowTargetEvmNFT)}
                </div>
            ))}

            <div className="mv" key={'mv3'} style={{marginTop: '8em'}}>
                <p>Dress Up NFT is currently in beta version.</p>
                <p>Please contact <a href='https://twitter.com/syunduel'>shunichiro(@syunduel)</a> to report bugs, request improvements, or discuss adding collections.</p>
            </div>

        </>
    );
  }
