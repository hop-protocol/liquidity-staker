require('dotenv').config()
import { ethers } from 'hardhat'
import { BigNumber } from 'ethers'

async function main () {
  const network = await ethers.provider.getNetwork()
  console.log('network:', network)

  const signer = (await ethers.getSigners())[0]
  console.log('signer:', await signer.getAddress())

  const StakingRewards = await ethers.getContractFactory(
    'contracts/StakingRewards.sol:StakingRewards',
    { signer }
  )

  const rewardsDistribution = '0x0000000000000000000000000000000000000000'
  const rewardsToken = '0x6D4dd09982853F08d9966aC3cA4Eb5885F16f2b2'
  const stakingToken = '0xF78b961f6D1a7702C3204FD5a6BC8cC8ECf18741'

  const stakingRewards = await StakingRewards.deploy(
    rewardsDistribution,
    rewardsToken,
    stakingToken
  )
  await stakingRewards.deployed()
  console.log('stakingRewards address:', stakingRewards.address)
  console.log(
    'deployed bytecode:',
    await ethers.provider.getCode(stakingRewards.address)
    )
  console.log('complete')
}

main()
  .catch(error => {
    console.error(error)
  })
  .finally(() => process.exit(0))
