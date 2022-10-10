import { useAtom } from "jotai"
import { useEffect, useRef, useState } from "react"
import { stakeAddressAtom } from "../features/store/atoms"
import {
  findAssets,
  findSpecificAsset,
} from "../features/blockchain/blockfrost"
import Asset from "./Asset"

type BasicAsset = {
  unit: string
  quantity: number
}

export interface OnchainMetadata {
  name?: string
  image?: string
  description?: string
}

export interface Metadata {
  logo?: string
  image?: string
  description?: string
  ticker?: string
}

type DetailedAsset = {
  asset: string
  policy_id: string
  asset_name: string
  fingerprint: string
  quantity: string
  initial_mint_tx_hash: string
  mint_or_burn_count: number
  onchain_metadata?: OnchainMetadata
  metadata?: Metadata
  image?: string
  name?: string
}

const SearchResult = () => {
  const [stakeAddress, setStakeAddress] = useAtom(stakeAddressAtom)
  const [assetsExist, setAssetsExist] = useState<boolean | undefined>(undefined)
  const [foundAssets, setFoundAssets] = useState<BasicAsset[]>([])
  const [detailedAssets, setDetailedAssets] = useState<DetailedAsset[]>([])

  const [imagesReady, setImagesReady] = useState<boolean>(false)

  let renders = useRef(0)

  useEffect(() => {
    if (renders.current < 2) {
      renders.current += 1
      return
    }

    const getAssets = async (): Promise<void> => {
      const assets = await findAssets(stakeAddress)

      if (assets.length === 0) {
        setAssetsExist(false)
      } else {
        setAssetsExist(true)
        setFoundAssets(assets)
      }
    }

    getAssets()
  }, [stakeAddress])

  useEffect(() => {
    const getAssetDetails = async () => {
      const resultArray = await Promise.all(
        foundAssets.map(async (i) => findSpecificAsset(i.unit))
      )
      setDetailedAssets(resultArray)
    }

    getAssetDetails()
  }, [foundAssets])

  useEffect(() => {
    
    detailedAssets.forEach((asset, i) => {
      
      
      // non standard nft metadata
      // try {
      //   console.log(asset.onchain_metadata);

      // } catch(error){

      // }
      // console.log(asset.asset_name);
      


      // Try to find image data
      if (asset.onchain_metadata == null){
        asset.image = 'data:image/png;base64, ' + asset.metadata?.logo

      } 
      else if (asset.onchain_metadata == undefined){
        
      }
      
      
      else {

        if (asset.onchain_metadata.name == undefined){
          
          
        }


        asset.image = asset.onchain_metadata.image
        console.log(asset.image);
        
        asset.image = 'https://ipfs.io/ipfs/' + asset.image?.slice(7)
        console.log(asset.image);
        
        
        asset.name = asset.onchain_metadata.name
      }
      // console.log(asset);
      
      setImagesReady(true)
      

    })

    
    try {
    } catch (error) {}
  }, [detailedAssets])

  return (
    <>
      {assetsExist == false && <h2>No assets were found at this address</h2>}

    


      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-4">
        {/* {detailedAssets.length > 0 &&
          detailedAssets.map((asset) => (
            <Asset key = {asset.asset}
                   name = {asset.onchain_metadata.name}
                   image = {asset.onchain_metadata?.image.slice(7)}

                   
                   />
          ))
          // <Asset
          //   name={detailedAssets[0].onchain_metadata.name}
          //   image={`https://ipfs.io/ipfs/${detailedAssets[1].onchain_metadata?.image?.slice(
          //     7
          //   )}`}
          //   quantity={detailedAssets[0].quantity}
          // />
        } */}
          {imagesReady && 

          detailedAssets.filter(asset => asset.name != undefined)
.map((asset) => (
          <Asset key={asset.asset} name={asset.name} image={asset.image} quantity={asset.quantity}/>
        ))
      
      
      }
      </div>
    </>
  )
}

export default SearchResult
