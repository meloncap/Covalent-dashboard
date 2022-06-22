# Covalent dashboard APP 

<img width="1791" alt="image" src="https://user-images.githubusercontent.com/34569321/175106028-c8d11198-2725-441b-b27d-0300555a1269.png">


I created this app for the 14th Hackthon of Gitcoin. Hackathon: Grants Round 14 Hackathon
## GR14: Web3 Application General Purpose Bounty (Covalent)
Challenge Description
We at Covalent believe that access to organized blockchain data can unlock a billion possibilities and so we provide the best single unified API to bring full transparency and visibility to assets across all blockchain networks. With the Covalent API, there is no need to invest developer resources in writing SQL or other queries since granular, decoded, multi-chain data is immediately available for 30+ blockchain networks including Ethereum, BSC, Polygon, Fantom and Avalanche. Covalent is fast becoming the go-to data provider, with the Covalent API powering over 1,000 industry-leading projects such as Zerion, ChainGuardians, 0x and Reef.

The Covalent Unified API is the fastest way to get blockchain data for your GR14 Hackathon project!


## The App

The dApp have 4 main features which are (on all 28th blockchain supported by covalent APIs) : 

- Track and check all tokens of an address (Tokens list, Folio history, TreeMap)
- Track all transactions for an address and get statistics for the address (Total fees, total transactions, total in, total out)
- A NFT collection explorer (track collections, tokenId, attributes, transactions, ....) 
- A events explorer (track all events/topics for a given contract) 



### Portfolio

<img width="1792" alt="folio" src="https://user-images.githubusercontent.com/34569321/175107496-a5dfe410-8b88-4170-9195-90a553a861aa.png">


*Covalent APIs used*
- GET /v1/{chain_id}/{address}/balances_v2/
- GET /v1/{chain_id}/{address}/portfolio_v2/
- GET /v1/chains/

### Transactions
<img width="1792" alt="event" src="https://user-images.githubusercontent.com/34569321/175108227-ac13b988-fdc0-416f-bfbe-99f1d2bc35f4.png">

*Covalent APIs used*
- GET /v1/{chainId}/{address}/transactions_v2/
- GET /v1/chains/

### NFT market
<img width="1792" alt="nft" src="https://user-images.githubusercontent.com/34569321/175108334-6b924871-5918-4163-8eae-7307425b436f.png">
*Covalent APIs used*
- GET /v1/{chainId}/tokens/{contract}/nft_token_ids/
- GET /v1/{chainId}/nft_market/
- GET /v1/pricing/historical_by_addresses_v2/{chainId}/USD/{contract}/
- GET /V1/{chainId}/tokens/{contract}/nft_metadata/{tokenId}/
- GET /V1/{chainId}/tokens/{contract}/nft_transactions/{tokenId}
- GET /v1/chains/

### Events
<img width="1792" alt="transaction" src="https://user-images.githubusercontent.com/34569321/175108647-ec485f22-759e-47b8-a8e9-0749e42f57e6.png">

- GET /v1/{chainId}/events/topics/{topic}/
- GET /v1/{chainId}/events/address/{address}/
- GET /v1/chains/

## Run the project locally

To run the project you'll need NodeJS and yarn installed in your machine.

Install all dependencies

    yarn install


Start the project

    yarn dev

Then go to `localhost:3000` to see the app on your navigator

Build the project for production

    yarn build

Don't hesitate to contribute to improve this open source project.
