import Link from "next/link";
import { FC, useState, useEffect } from "react";

import { fetchJSON, fetchNftJSON } from "utils/fetchJSON";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Metadata, MetadataAccount, Metaplex } from "@metaplex-foundation/js"
import { MetaplexMetadata } from "@nfteyez/sol-rayz-react/node_modules/@nfteyez/sol-rayz/dist/utils";

// import {
//   resolveToWalletAddrress, // this is misspelled but it works. just gonna leave it
//   getParsedNftAccountsByOwner,
// } from "@nfteyez/sol-rayz-react/node_modules/@nfteyez/sol-rayz";
import { useWalletNfts, NftTokenAccount, WalletResult } from "@nfteyez/sol-rayz-react";
// import { useConnection } from "@solana/wallet-adapter-react";

import { Loader, SolanaLogo, SelectAndConnectWalletButton } from "components";
import { NftCard } from "./NftCard";
import styles from "./index.module.css";
import React from 'react'
// import Link from 'next/link'
import Head from "next/head";
import { concat, extendWith } from "lodash";
import { PublicKey } from "@solana/web3.js";
import { waitUntilSymbol } from "next/dist/server/web/spec-compliant/fetch-event";
import { walletPublicKeys } from "config/index.config.js";
import { filterMappedNfts, useWalletFilterMapNfts } from "utils/fetchAggregate";

export const CI_GalleryView: FC = ({}) => {

  /* const { connection } = useConnection();
  const [walletToParsePublicKey, setWalletToParsePublicKey] = useState<string>(walletPublicKeyOwner); */
  //const { connection } = useConnection();
  
  //const { connection } = useConnection();
  /* const [walletToParsePublicKey, setWalletToParsePublicKey] = useState<string>(walletPublicKeys.walletDefault);
  const {publicKey: publicKey} = useWallet();
  const { nfts, isLoading, error } = useWalletNfts({
    publicAddress: walletToParsePublicKey,
    // connection,
  });
  
    

  const mappedNfts = CI_mapFilter(nfts)
  .then((async () => {
    const value = await CI_mapFilter(nfts);
    console.info("value: ",value);
  })()).catch(console.error) */

  const {connection} = useConnection();
  const [walletToParsePublicKey, setWalletToParsePublicKey] = useState<string>(walletPublicKeys.Default);
  const {publicKey: publicKey} = useWallet();
  const {nfts, isLoading, error} = useWalletNfts({
    publicAddress: walletPublicKeys.Default,
  });
  useWalletFilterMapNfts(nfts);
  const mappedNfts = filterMappedNfts;


  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setWalletToParsePublicKey(value.trim());
  };

  const onUseWalletClick = () => {
    if (publicKey) {
      setWalletToParsePublicKey(publicKey?.toBase58());
    }
  };

  return (
    <div className="container mx-auto max-w-6xl p-8 2xl:px-0">
      <div className={styles.container}>
        <div className="navbar mb-2 shadow-lg bg-neutral text-neutral-content rounded-box">
          <div className="flex-none">
            <button className="btn btn-square btn-ghost">
              <span className="text-4xl">🏞</span>
            </button>
          </div>
          <div className="flex-1 px-2 mx-2">
            <div className="text-sm breadcrumbs">
              <ul className="text-xl">
                <li>
                  <Link href="/">
                    <a>Templates</a>
                  </Link>
                </li>
                <li>
                  <span className="opacity-40">NFT Gallery</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex-none">
            <WalletMultiButton className="btn btn-ghost" />
          </div>
        </div>

        <div className="text-center pt-2">
          <div className="hero min-h-16 p-0 pt-10">
            <div className="text-center hero-content w-full">
              <div className="w-full">
                <h1 className="mb-5 text-5xl">
                  NFT Gallery on Solana <SolanaLogo />
                </h1>

                <div className="w-full min-w-full">
                  <p className="mb-5">
                    Here is very basic example of NFT Gallery. It parses
                    mainnet. <br />
                    And uses{" "}
                    <a
                      href="https://www.npmjs.com/package/@nfteyez/sol-rayz-react"
                      target="_blank"
                      className="link font-bold"
                      rel="noreferrer"
                    >
                      @nfteyez/sol-rayz-react
                    </a>{" "}
                    package to fetch NFTs for specific wallet.
                  </p>
                  <div>
                    <div className="form-control mt-8">
                      <label className="input-group input-group-vertical input-group-lg">
                        <span>Search</span>
                        <div className="flex space-x-2">
                          <input
                            type="text"
                            placeholder="Enter Wallet Address"
                            className="w-full input input-bordered input-lg"
                            value={walletToParsePublicKey}
                            onChange={onChange}
                            style={{
                              borderRadius:
                                "0 0 var(--rounded-btn,.5rem) var(--rounded-btn,.5rem)",
                            }}
                          />

                          <SelectAndConnectWalletButton
                            onUseWalletClick={onUseWalletClick}
                          />
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="my-10">
                  {error ? (
                    <div>
                      <h1>OOps..</h1>
                      {(error as any)?.message}
                    </div>
                  ) : null}

                  {!error && isLoading ? (
                    <div>
                      <Loader />
                    </div>
                  ) : (

                    <NftCIList nfts={mappedNfts} error={error} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

type NftListProps = {
  nfts: NftTokenAccount[];
  error?: Error;
};

export type NftCIListProps = {
  nfts: MetaplexMetadata[];
  error?: Error;
};

export function NftCIList({nfts, error }: NftCIListProps) {
  if (error) {
    return null;
  }

  if (!nfts?.length) {
    return (
      <div className="text-center text-2xl pt-16">
        No NFTs found in this wallet
      </div>
    )
  }
  let i = 0;
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-start">
      {nfts?.map((nft) => (
        <NftCard key={`${nft}_${i++}`} details={nft} onSelect={() => {}} />
      ))}
      {/* {async () => {
        return await nfts?.map((nft) => (
        <NftCard key={`${nft.name}_${i++}`} details={nft} onSelect={() => { } } />
      ))
      } } */}
    </div>
  );
};



//export 
 function fetchCICollection(walletNfts:WalletResult) :{ci_nfts:MetaplexMetadata[], ci_error:Error} {
    
  // reset global arrays
  let filteredNfts:WalletResult = [];
  let populatedNfts:MetaplexMetadata[] = [];

  // build local nft db
  walletNfts?.forEach((walletNft:WalletResult) => {
    if (walletNft.updateAuthority == walletPublicKeys.UACI1)
    {
         filteredNfts.push(walletNft);
    }
    else if(walletNft.updateAuthority == walletPublicKeys.UACI2)
    {
         filteredNfts.push(walletNft);
    }
    else if(walletNft.updateAuthority == walletPublicKeys.UACI3)
    {
         filteredNfts.push(walletNft);
    }
    else if(walletNft.updateAuthority == walletPublicKeys.UACI4)
    {
         filteredNfts.push(walletNft);
    }
  });

  let ci_nfts!:MetaplexMetadata[];
  let error!:Error;

  walletNfts = filteredNfts;


  populatedNfts = filteredNfts.map( (nft:WalletResult) => /*console.info("datauri", nft.data.uri);*/ 
        fetchNftJSON(nft.data.uri)
        .then((nftMeta:MetaplexMetadata) => {
          //console.info("nfts(g00d):",nftMeta);
          //debugger;
          return nftMeta; // [valueOfPromise1, valueOfPromise2, ...]
        })
        .catch((nftMeta:MetaplexMetadata) => {
          //console.info("nfts(err0r):",nftMeta);
          return nftMeta;  // rejectReason of any first rejected promise
        })
        .finally(() => {
          //console.info("nfts(f1nally):", populatedNfts);
          return nft;
          // return {ci_nfts:nftMeta, ci_error: error};
        })
      );
  


  return {ci_nfts:populatedNfts, ci_error:error};

  const allPromise = Promise.all(populatedNfts = filteredNfts.map( (nft:WalletResult) => { return fetchNftJSON(nft.data.uri) }));  
  
  allPromise.then(populatedNfts => {
    console.info("nfts(g00d):",populatedNfts);
    //debugger;
    return {ci_nfts:populatedNfts, ci_error: error}; // [valueOfPromise1, valueOfPromise2, ...]
  }).catch(ci_error => {
    console.info("nfts(err0r):",populatedNfts);
    return {ci_nfts:populatedNfts, ci_error};  // rejectReason of any first rejected promise
  }).finally(() => {
    console.info("nfts(f1nally):",populatedNfts);
    return {ci_nfts:populatedNfts, ci_error: error};
  });
  console.info("nfts(else0):",populatedNfts);
  return {ci_nfts:populatedNfts, ci_error: error};

}

