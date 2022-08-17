import { FC, useState, useEffect } from "react";
import useSWR from "swr";
import { EyeOffIcon } from "@heroicons/react/outline";

import { fetcher } from "utils/fetcher";


type Props = {
  details: any;
  onSelect: (id: string) => void;
  onTokenDetailsFetched?: (props: any) => unknown;
};

export const NftCard: FC<Props> = ({
  details,
  onSelect,
  onTokenDetailsFetched = () => {},
}) => {
  const [fallbackImage, setFallbackImage] = useState(false);
  const { name, uri } = details?.data ?? {};


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
  
  //console.info("nft card data", data);

  useEffect(() => {
    if (!error && !!data) {
      onTokenDetailsFetched(data);
    }
  }, [data, error]);
  const onImageError = () => setFallbackImage(true);
  const { image, attributes } = data ?? {};

  //const { trait_type {trait_name, trait_val} } = attributes ?? {};

  //console.info("attributes", attributes);
  
  const {trait_type:str1, value:bg} = attributes?.[0] ?? {};
  //console.info("name - background", name + " - " + bg);
  //console.info ("data details:", details);

  return (
    <div className={`card bordered max-w-xs compact rounded-md`}>
      <figure className="min-h-16 animation-pulse-color">
        {!fallbackImage || !error ? (
          <img
            src={image}
            onError={onImageError}
            className="bg-gray-800 object-cover"
          />
        ) : (
          // Fallback when preview isn't available
          // This could be broken image, video, or audio
          <div className="w-auto h-48 flex items-center justify-center bg-gray-900 bg-opacity-40">
            <EyeOffIcon className="h-16 w-16 text-white-500" />
          </div>
        )}
      </figure>
      <div className="card-body">
        <h2 className="card-title text-sm text-center">{name}</h2>
        <h3 className="card-attr  text-sm text-center">{bg}</h3>
      </div>
    </div>
  );
};

// EXAMPLE DATA:
// { 
//   "name": "Crypto Idolz #3648", 
//   "symbol": "IDOLZ", 
//   "description": "6969 masterpieces capturing the natural female beauty", 
//   "seller_fee_basis_points": 690, 
//   "image": "https://www.arweave.net/G0FPtAaF_o4sZcy0qjcryxA4kzLw-5cgiblQYzU5Q4o?ext=png", 
//   "external_url": "https://linktr.ee/cryptoidolz", 
//   "collection": {  "name": "CryptoIdolz 2nd Edition", 
//                    "family": "CryptoIdolz" 
//    }, 
  // "attributes": [ 
  //                 { "trait_type": "BG", "value": "Purple Bitch" }, 
  //                 { "trait_type": "Body", "value": "Dark Rum" }, 
  //                 { "trait_type": "Body Size", "value": "Passion Fruit" }, 
  //                 { "trait_type": "Hand", "value": "None" }, 
  //                 { "trait_type": "Surprise", "value": "None" }, 
  //                 { "trait_type": "Legs", "value": "Garter" }, 
  //                 { "trait_type": "Accessories", "value": "Barcode" }, 
  //                 { "trait_type": "Sweat", "value": "None" }, 
  //                 { "trait_type": "Surroundings", "value": "None" }
  //               ], 
  //   "properties": {
  //       "files": [
  //         { "uri": "https://www.arweave.net/G0FPtAaF_o4sZcy0qjcryxA4kzLw-5cgiblQYzU5Q4o?ext=png",
  //           "type": "image/png" 
  //         }
  //       ], 
  //       "category": "image", "creators": [
  //           { "address": "GfmmC9mJGieYjJxkYSabzYCbtLaSm2iAbZScgLTeU9sn", "share": 50 },
  //           { "address": "mfU2SKFPgWPhXEa7sYbFf35K5ZD7qLE3xVoVHhQdk7N", "share": 49 },
  //           { "address": "57G2mwfM83VNKFNdrvMwTDJAo1xhoDSw6Wp5WyruRdyG", "share": 1 }
  //       ] 
//    }
// }