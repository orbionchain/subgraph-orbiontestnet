import { PairCreated } from '../generated/Factory/UniswapV2Factory'
import { Pair as PairEntity, Token } from '../generated/schema'
import { PairTemplate } from '../generated/templates'
import { ERC20 } from '../generated/Factory/ERC20'
import { BigInt, BigDecimal } from '@graphprotocol/graph-ts'

export function handlePairCreated(event: PairCreated): void {
  const pairAddress = event.params.pair.toHex()

  // Token0
  const token0Address = event.params.token0.toHex()
  let token0 = Token.load(token0Address)
  if (!token0) {
    token0 = new Token(token0Address)
    let contract0 = ERC20.bind(event.params.token0)
    let tryName = contract0.try_name()
    let trySymbol = contract0.try_symbol()
    let tryDecimals = contract0.try_decimals()

    token0.name = tryName.reverted ? 'unknown' : tryName.value
    token0.symbol = trySymbol.reverted ? 'UNK' : trySymbol.value
    token0.decimals = tryDecimals.reverted ? 18 : tryDecimals.value
    token0.totalSupply = BigInt.zero()
    token0.save()
  }

  // Token1
  const token1Address = event.params.token1.toHex()
  let token1 = Token.load(token1Address)
  if (!token1) {
    token1 = new Token(token1Address)
    let contract1 = ERC20.bind(event.params.token1)
    let tryName = contract1.try_name()
    let trySymbol = contract1.try_symbol()
    let tryDecimals = contract1.try_decimals()

    token1.name = tryName.reverted ? 'unknown' : tryName.value
    token1.symbol = trySymbol.reverted ? 'UNK' : trySymbol.value
    token1.decimals = tryDecimals.reverted ? 18 : tryDecimals.value
    token1.totalSupply = BigInt.zero()
    token1.save()
  }

  // Pair
  let pair = new PairEntity(pairAddress)
  pair.token0 = token0.id
  pair.token1 = token1.id
  pair.reserve0 = BigDecimal.zero()
  pair.reserve1 = BigDecimal.zero()
  pair.totalSupply = BigDecimal.zero()
  pair.volumeToken0 = BigDecimal.zero()
  pair.volumeToken1 = BigDecimal.zero()
  pair.volumeUSD = BigDecimal.zero()
  pair.createdAtTimestamp = event.block.timestamp
  pair.createdAtBlockNumber = event.block.number
  pair.save()

  // Spawn dynamic template
  PairTemplate.create(event.params.pair)
}
