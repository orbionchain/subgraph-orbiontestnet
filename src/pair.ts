import { Swap, Pair } from '../generated/schema'
import {
  Swap as SwapEvent,
  Sync
} from '../generated/templates/PairTemplate/UniswapV2Pair'

export function handleSwap(event: SwapEvent): void {
  const id = event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  const swap = new Swap(id)

  swap.pair = event.address.toHex()
  swap.sender = event.params.sender
  swap.to = event.params.to
  swap.amount0In = event.params.amount0In.toBigDecimal()
  swap.amount1In = event.params.amount1In.toBigDecimal()
  swap.amount0Out = event.params.amount0Out.toBigDecimal()
  swap.amount1Out = event.params.amount1Out.toBigDecimal()
  swap.timestamp = event.block.timestamp
  swap.transaction = event.transaction.hash

  swap.save()

  // Optional: update volumeToken0 / volumeToken1
  const pair = Pair.load(event.address.toHex())
  if (pair) {
    const volume0 = event.params.amount0In.plus(event.params.amount0Out)
    const volume1 = event.params.amount1In.plus(event.params.amount1Out)

    pair.volumeToken0 = pair.volumeToken0.plus(volume0.toBigDecimal())
    pair.volumeToken1 = pair.volumeToken1.plus(volume1.toBigDecimal())

    pair.save()
  }
}

export function handleSync(event: Sync): void {
  const pairId = event.address.toHex()
  const pair = Pair.load(pairId)

  // Hindari error jika Pair belum dibuat di handlePairCreated
  if (!pair) return

  pair.reserve0 = event.params.reserve0.toBigDecimal()
  pair.reserve1 = event.params.reserve1.toBigDecimal()

  pair.save()
}
