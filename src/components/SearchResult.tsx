import { useAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
import { stakeAddressAtom } from "../features/store/atoms";
import { findAssets } from "../features/blockchain/blockfrost";
import { deriveStakeAddress } from "../features/blockchain/cardanoHelpers";

const SearchResult = () => {
  const [stakeAddress, setStakeAddress] = useAtom(stakeAddressAtom);
  const [assetsExist, setAssetsExist] = useState<boolean | undefined>(undefined)

  let renders = useRef(0);

  useEffect(() => {
    
    if (renders.current < 2) {
      renders.current += 1;
      return;
    }

    const getAssets = async () => {
      console.log("finding");

      const assets = await findAssets(stakeAddress);
      console.log(assets.length);
      if (assets.length === 0) {
        setAssetsExist(false)
        console.log(assetsExist);

      } else {
        setAssetsExist(true)
      }
    };
    getAssets();
    console.log("updat");
  }, [stakeAddress]);
  return (
    <>

      {assetsExist == false && <h2>No assets were found at this address</h2>}
    </>
  );
};

export default SearchResult;
