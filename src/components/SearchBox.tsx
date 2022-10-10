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
      console.log(rewardAddress + "!!!!!!!!!!!!!!!!")

      // If valid address
      if (rewardAddress != undefined) {
        const derivedStakeAddress = deriveStakeAddress(rewardAddress)
        setDisplayMessage(derivedStakeAddress)
        setStakeAddress(derivedStakeAddress)
      } else {
        setDisplayMessage("Handle doesn't exist")
      }
    }

    const handleUserInput = () => {
      // Handle Input
      if (validateHandle(searchInput)) {
        const handleName = searchInput.substring(1)
        getHandleRewardAddress(handleName)
      }
      // Reward address input
      else if (validateRewardAddress(searchInput)) {
        console.log("here")

        const derivedStakeAddress = deriveStakeAddress(searchInput)
        console.log(derivedStakeAddress)

        if (derivedStakeAddress) {
          console.log("-----------------------")
          console.log(derivedStakeAddress)
          console.log("-----------------------")
          setDisplayMessage(derivedStakeAddress)
          setStakeAddress(derivedStakeAddress)
        }
      } else {
        // setDisplayMessage("Incorrect Address")
        let validatedAddr
        try {
          validatedAddr = bech32.decode(searchInput)
        } catch (error) {
          validatedAddr = null
        }

        if (validatedAddr) {
          console.log("calid")
        } else {
          console.log("er7")
        }
      }
    }

    if (renders.current < 2) {
      renders.current += 1
      return
    }

    // Wait till user stops typing to execute search
    let debouncer = setTimeout(() => {
      handleUserInput()
    }, 800)
    return () => {
      clearTimeout(debouncer)
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
      <div className="">
        <div className="relative mx-5 mb-4">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <svg
              aria-hidden="true"
              className="h-5 w-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="Search Address, Handle..."
            required
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              setSearchInput(e.currentTarget.value)
            }}
          />
          
        </div>
        <div className="relative mb-4">{displayMessage}</div>

      </div>
    </>
  )
}

export default SearchBox
