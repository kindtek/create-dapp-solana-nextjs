import { useWalletNfts, NftTokenAccount, WalletResult } from "@nfteyez/sol-rayz-react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { walletPublicKeys } from "config/index.config";
import { useState } from "react";
import { fetchNftJSON } from "./fetchJSON";


/* export default async function aggregate<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  try{  
    const res = await fetch(input, init);
    return res.json();
  } catch (e) {
    console.error(e);
    throw new Error('error :' + input);
  }
  
  
} */

let filterMappedNfts:WalletResult;

// const {publicKey: publicKey} = useWallet();
// const {nfts, isLoading, error} = useWalletNfts({
//   publicAddress: walletPublicKeys.Default,
// });


// tried like crazy to get this to pull the external metadata using the existing WalletResult and pulling JSON uri data but I don't think it's meant to be.
// pulling the metadata seemed to go okay, but the problem is all the results were returned as promises and i haven't figured out how to unwrap the promise since this is all top level
// just wanted to save my work before i tear it down in favor of a hook-based, state- and data-sharing approach which should work better - in theory

//export const CI_mapFilter: WalletResult = async (nfts:WalletResult)  => {
export /* async */ function useWalletFilterMapNfts(nfts: WalletResult) {
  //const {ci_nfts:ci_nfts, ci_error:ci_error} = fetchCICollection(nfts);
  /* await */ /* Promise.all( */
  filterMappedNfts = /* await Promise.allSettled( */nfts?.filter((nft: WalletResult) => nft?.updateAuthority == walletPublicKeys.UACI2 || nft?.updateAuthority == walletPublicKeys.UACI1 || nft?.updateAuthority == walletPublicKeys.UACI3 || nft?.updateAuthority == walletPublicKeys.UACI4)
    ?.map(/* async */ (nft?: any) => {
      return {
        //...await fetchNftJSON(nft?.data?.uri), //with this is removed, the pictures will show but no sorting, or grouping of nft collections can be done - which is the whole reason i'm here
        ...nft,
        ...nft?.data
      };
    })/* ) */;
  
  // sorting not required here but shouldnt hurt
  filterMappedNfts.sort((a: { updateAuthority: any; }, b: { updateAuthority: any; }) => {
    let uAutha = a?.updateAuthority;
    let uAuthb = b?.updateAuthority;
    //console.info('a-uauth: ', a?.updateAuthority);
    //console.info('b-uauth: ', b?.updateAuthority);
    if (uAutha > uAuthb)
      return -1;
    if (uAutha > uAuthb)
      return 1;
    return 0;
  });

  console.info("ci_nfts >>> sort type", filterMappedNfts); // when JSON fetch is used, this is always embedded in a promise

}

export {filterMappedNfts};


let users;

(async () => {
  const url = 'https://jsonplaceholder.typicode.com/users';
  const response = await fetch(url);
  users = await response.json();
})();

export { users };