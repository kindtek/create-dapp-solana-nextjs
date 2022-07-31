import type { NextPage } from "next";
import Head from "next/head";
import { CI_GalleryView } from "../views";

const Home: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>NFT CI Gallery!</title>
      </Head>
      <CI_GalleryView />
    </div>
  );
};

export default Home;
