import { Buffer } from "buffer"

export const callApi = async (endPoint: string) => {
  try {
    const request: string = import.meta.env.VITE_BLOCKFROST_URL + endPoint

    const response = await fetch(request, {
      //@ts-ignore
      headers: {
        "Content-Type": "application/json",
        project_id: import.meta.env.VITE_BLOCKFROST_KEY,
      },
      method: "GET",
    })

    let data = await response.json()

    // Return stake address
    // if (endPoint.includes('addresses/')){
    //   console.log(data.stake_address);
    // } else if(endPoint.includes())
    return data
  } catch (error) {}
}

export const deriveStakeAddress = async (
  rewardAddress: string
): Promise<string> => {
  const endPoint = `addresses/${rewardAddress}`
  const result = await callApi(endPoint)

  return result.stake_address
}

export const findAssets = async (stakeAddress: string) => {
  const endPoint = `accounts/${stakeAddress}/addresses/assets`
  const result = await callApi(endPoint)
  console.log(result)

  return result
}

const handleAddress = async (handleName: string): string | undefined => {
  const policyID = "f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a"

  // A blank Handle name should always be ignored.
  if (handleName.length === 0) {
    // Handle error.
  }

  // Convert handleName to hex encoding.
  const assetName = Buffer.from(handleName).toString("hex")

  // Fetch matching address for the asset.
  try {
    const data = await fetch(
      `https://cardano-mainnet.blockfrost.io/api/v0/assets/${policyID}${assetName}/addresses`,
      {
        headers: {
          // Your Blockfrost API key
          project_id: import.meta.env.VITE_BLOCKFROST_KEY,
          "Content-Type": "application/json",
        },
      }
    ).then((res) => res.json())
    const [{ address }] = data
    return address
    
    
    
  } catch (error) {
    console.log('err');
    return undefined
    
  }


 

}

export { handleAddress }
