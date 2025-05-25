# 🧠 Subgraph OrbionTestnet

This repository contains a dynamic Subgraph for tracking all Uniswap V2-compatible liquidity pools, swaps, and token reserves on the **Orbion Testnet** (Chain ID: `109901`).  
It is used to power on-chain analytics such as TVL, price charts, and swap volumes for tokens deployed on the network.

---

## 🌐 Network Details

| Item            | Value                                               |
|-----------------|-----------------------------------------------------|
| Network         | OrbionTestnet                                       |
| Chain ID        | `109901`                                            |
| Factory Address | `0x95B2A9C481921774A8C5c88DB8831A8D6ED755d2`         |
| Router Address  | `0xb44a6a23cf55035419166140E10Ed30608Fbd428`         |
| WORB Token      | `0x7A8ba8b98eE2B67d157637C9Bce8535b7CA87761`         |
| RPC URL         | `http://rpc-testnet-zero1.orbionchain.com`          |

---

## 📦 Features

- Tracks all LP pairs created via `UniswapV2Factory`
- Dynamic template spawning for new pairs (`PairCreated`)
- Records `Swap`, `Sync`, `Reserve`, and pair creation data
- Supports charting: price, liquidity (TVL), and volume
- Built on top of `@graphprotocol/graph-cli` and IPFS

---

