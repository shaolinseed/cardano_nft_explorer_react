import {
  Value,
  TransactionUnspentOutput,
  BaseAddress,
  RewardAddress,
  Transaction,
  Address,
} from "@emurgo/cardano-serialization-lib-browser"

const deriveStakeAddress = (rewardAddress: string): string | undefined => {
  try {
    // Build base address
    let addr = Address.from_bech32(rewardAddress)
    let base_addr = BaseAddress.from_address(addr)

    // Extract stake credential
    let stake_cred = base_addr.stake_cred()

    // Build reward address (add 0xe1 prefix to 28 last bytes of stake credential one)
    let reward_addr_bytes = new Uint8Array(29)
    reward_addr_bytes.set([0xe1], 0)
    reward_addr_bytes.set(stake_cred.to_bytes().slice(4, 32), 1)
    let reward_addr = RewardAddress.from_address(
      Address.from_bytes(reward_addr_bytes)
    )
    // Log bech32 address
    return reward_addr?.to_address().to_bech32()
  } catch (error) {
    return undefined
  }
}

const handleAddress = (handle: string): string | undefined => {
  const handlePolicyId =
    "f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a"

    // Convert handleName to hex encoding.
    const assetName = Buffer.from(handle).toString('hex')

    
}

export { deriveStakeAddress }
