import useSWR, { mutate } from 'swr'
import fetch from "utils/fetch";
import { fetcher } from "utils/fetcher";
import { MetaplexMetadata } from "@nfteyez/sol-rayz-react/node_modules/@nfteyez/sol-rayz/dist/utils";
import { useWalletNfts, NftTokenAccount, WalletResult } from "@nfteyez/sol-rayz-react";


var json_uri = 'start';
export async function fetchNftJSON(uri:URL) :Promise<MetaplexMetadata>{
  json_uri = uri?.toString();
  //console.log("uri:req:", `${json_uri}`);
  return await fetch(`${uri}`)
    .then( async data => {
      mutate(`${uri}`, await data, false);
      //console.info("JSONdata: ", data);
      return await data;
  })
}

export function fetchJSON(uri:string) :WalletResult {
  //console.log("uri::", `${uri}`);
  const { data, error } = useSWR(
    // uri || url ? getMetaUrl(details) : null,
    uri,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  return data;
}