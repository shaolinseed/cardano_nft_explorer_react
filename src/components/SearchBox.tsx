import { useEffect, useRef, useState } from "react"
import { stakeAddressAtom } from "../features/store/atoms"
import { useAtom } from "jotai"
import {
  validateAlphaNumeric,
  validateHandle,
  validateRewardAddress,
} from "../features/utils/utils"
import { AddressLengths } from "../features/constants/enums"
import { handleAddress } from "../features/blockchain/blockfrost"
import { deriveStakeAddress } from "../features/blockchain/cardanoHelpers"
import { Buffer } from "buffer"

import { bech32 } from "bech32"
import {
  Value,
  TransactionUnspentOutput,
  BaseAddress,
  RewardAddress,
  Transaction,
  Address,
} from "@emurgo/cardano-serialization-lib-browser"

const SearchBox = () => {
  const [searchInput, setSearchInput] = useState("")
  const [stakeAddress, setStakeAddress] = useAtom(stakeAddressAtom)
  const [displayMessage, setDisplayMessage] = useState("")

  let renders = useRef(0)

  useEffect(() => {
    const getHandleRewardAddress = async (handleName: string) => {
      const rewardAddress = await handleAddress(handleName)
      console.log(rewardAddress + '!!!!!!!!!!!!!!!!');
      
    }

    if (renders.current < 2) {
      renders.current += 1
      return
    }
    // Handle Input
    if (validateHandle(searchInput)) {
      const handleName = searchInput.substring(1)
      getHandleRewardAddress(handleName)
    } 
    // Reward address input
    else if (
      searchInput.length === AddressLengths.Reward &&
      validateRewardAddress(searchInput)
    ) {
      const derivedStakeAddress = deriveStakeAddress(searchInput)
      if (derivedStakeAddress) {
        console.log("-----------------------")
        console.log(derivedStakeAddress)
        console.log("-----------------------")
        setDisplayMessage(derivedStakeAddress)
        setStakeAddress(derivedStakeAddress)
      }
    } else {
      setDisplayMessage("Incorrect Address")
    }

    // const timeOutId = setTimeout(() => callApi(searchInput), 500);
    // return () => clearTimeout(timeOutId);
    // deriveStakeAddress('addr1zxgx3far7qygq0k6epa0zcvcvrevmn0ypsnfsue94nsn3tvpw288a4x0xf8pxgcntelxmyclq83s0ykeehchz2wtspks905plm')

    // console.log(getDecoded(address));
    // console.log(bech32.decode('stake1uxqh9rn76n8nynsnyvf4ulndjv0srcc8jtvumut3989cqmgjt4fh6', 103));

    // try {
    //   bech32.decode(
    //     "stake1uxqh9rn76n8nynsnyvf4ulndjv0srcc8jtvumut3989cqmgjt49h6",
    //     103
    //   );

    //   if (
    //     searchInput.length === AddressLengths.Reward &&
    //     validateRewardAddress(searchInput)
    //   ) {
    //     getStakeAddress();
    //   } else if (searchInput.length === AddressLengths.Base) {
    //     // TODO find nfts
    //   }
    // } catch (error) {
    //   console.log("error");
    // }

    // if (
    //   searchInput.length === AddressLengths.Reward &&
    //   validateRewardAddress(searchInput)
    // ) {
    //   getStakeAddress();
    // } else if (searchInput.length === AddressLengths.Base) {
    //   // TODO find nfts
    // } else {
    // }
  }, [searchInput])

  return (
    <>
      <input
        type="text"
        placeholder="Search.."
        className="text-l p-4 mb-4 w-[48em] rounded-md"
        onChange={(e: React.FormEvent<HTMLInputElement>) => {
          setSearchInput(e.currentTarget.value)
        }}
      />
      <div>{displayMessage}</div>
    </>
  )
}

export default SearchBox
