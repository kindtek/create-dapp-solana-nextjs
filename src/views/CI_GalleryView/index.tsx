import Link from "next/link";
import { FC, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
// import {
//   resolveToWalletAddrress, // this is misspelled but it works. just gonna leave it
//   getParsedNftAccountsByOwner,
// } from "@nfteyez/sol-rayz-react/node_modules/@nfteyez/sol-rayz";
import { useWalletNfts, NftTokenAccount } from "@nfteyez/sol-rayz-react";
import { useConnection } from "@solana/wallet-adapter-react";

import { Loader, SolanaLogo, SelectAndConnectWalletButton } from "components";
import { NftCard } from "./NftCard";
import styles from "./index.module.css";
const walletPublicKeyOwner = "ENdwKrjZicGvRYa5T9FUnNyiYHCTdT3covgtaf7ac6op";
const walletPublicKeyButts = "57G2mwfM83VNKFNdrvMwTDJAo1xhoDSw6Wp5WyruRdyG";
const walletPublicKeyBoobs = "63DCfJUUqe9ANLCZnTr487NaQMsgqrCtARAfVWhHfSAa";
const walletPublicKeyFaces = "CCcKY9KX14tpNWx82nH911WYhrdzkdVsFtkFT1vPkaZo";


export const CI_GalleryView: FC = ({}) => {
  const { connection } = useConnection();
  const [walletToParsePublicKey, setWalletToParsePublicKey] =
    useState<string>(walletPublicKeyOwner);
  // const [walletToParsePublicKeyButts, setWalletToParsePublicKeyButts] =
  //   useState<string>(walletPublicKeyButts);
  // const [walletToParsePublicKeyBoobs, setWalletToParsePublicKeyBoobs] =
  //   useState<string>(walletPublicKeyBoobs);
  // const [walletToParsePublicKeyFaces, setWalletToParsePublicKeyFaces] =
  //   useState<string>(walletPublicKeyFaces);

  const { publicKey: publicKey } = useWallet();

  const { nfts, isLoading, error } = useWalletNfts({
    publicAddress: walletToParsePublicKey,
    connection,
  });

  // const { nfts_butts, isLoadingButts, errorButts } = useWalletNfts({
  //   publicAddress: walletPublicKeyButts,
  //   connection,
  // });

  // const { nfts_boobs, isLoadingBoobs, errorBoobs } = useWalletNfts({
  //   publicAddress: walletPublicKeyBoobs,
  //   connection,
  // });

  // const { nfts_faces, isLoadingFaces, errorFaces } = useWalletNfts({
  //   publicAddress: walletPublicKeyFaces,
  //   connection,
  // });

  var nfts_owned_ci = new Array();
  var nfts_owned_ci_butts = new Array();
  var nfts_owned_ci_boobs = new Array();
  var nfts_owned_ci_faces = new Array();

  nfts.forEach((nft: any) => {
    //console.log("nft uauth", nft.updateAuthority)
    if (nft.updateAuthority == walletPublicKeyButts)
    {
      nfts_owned_ci_butts.push(nft);
      //console.log("butt uauth", nft)
    }
    else if(nft.updateAuthority == walletPublicKeyBoobs)
    {
      nfts_owned_ci_boobs.push(nft);
      //console.log("boob uauth", nft)
    }
    else if(nft.updateAuthority == walletPublicKeyFaces)
    {
      nfts_owned_ci_faces.push(nft);
      //console.log("face uauth", nft)
    }
    // nfts_butts.forEach((nft_butt: any) => {
    //   if (JSON.stringify(nft) == JSON.stringify(nft_butt))
    //     nfts_owned_ci_boobs.push(nft);
    // });
    // nfts_boobs.forEach((nft_boob: any) => {
    //   if (JSON.stringify(nft) == JSON.stringify(nft_boob))
    //     nfts_owned_ci_boobs.push(nft);
    // });
    // nfts_faces.forEach((nft_face: any) => {
    //   if (JSON.stringify(nft) == JSON.stringify(nft_face))
    //     nfts_owned_ci_boobs.push(nft);
    // });
  });

  
  const nfts_ci = nfts_owned_ci_butts.concat(nfts_owned_ci_boobs, nfts_owned_ci_faces);
  //nfts =  nfts_owned_ci;
  console.log("nfts_owned_ci_butts", nfts_owned_ci_butts);
  console.log("nfts_owned_ci_boobs", nfts_owned_ci_boobs);
  console.log("nfts_owned_ci_faces", nfts_owned_ci_faces);
  console.log("nfts_owned_ci", nfts_owned_ci);

  console.log("nfts_ci", nfts_ci);
  // console.log("nfts_butts", nfts_butts);
  // console.log("nfts_boobs", nfts_boobs);
  // console.log("nfts_faces", nfts_faces);

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
                      <h1>Error Occures</h1>
                      {(error as any)?.message}
                    </div>
                  ) : null}

                  {!error && isLoading ? (
                    <div>
                      <Loader />
                    </div>
                  ) : (

                    <NftList nfts={nfts_ci} error={error} />
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

const NftList = ({ nfts, error }: NftListProps) => {
  if (error) {
    return null;
  }

  if (!nfts?.length) {
    return (
      <div className="text-center text-2xl pt-16">
        No NFTs found in this wallet
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-start">
      {nfts?.map((nft) => (
        <NftCard key={nft.mint} details={nft} onSelect={() => {}} />
      ))}
    </div>
  );
};
