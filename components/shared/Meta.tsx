import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";

interface Props {
  pageTitle: string;
  description: string;
}

const Meta = ({ pageTitle, description }: Props) => {
  const router = useRouter();

  const url = "https://covalent-board.netlify.app";
  const path = router.asPath;

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta
        name="description"
        property="og:description"
        content={description}
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />

      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#ffffff"></meta>

      <meta
        name="image"
        property="og:image"
        content={`${url}/images/folio.png`}
      />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      <meta property="og:title" content={`${pageTitle}`} />
      <meta property="og:url" content={`${url}${path}`} />
      <link rel="canonical" href={`${url}${path}`} />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="twitter:creator" content="@Charlie85270" />
      <meta
        property="og:image"
        content="https://covalent-board.netlify.app/images/folio.png"
      />
      <meta name="twitter:site" content="@Charlie85270" />
      <meta name="twitter:creator" content="@Charlie85270" />
      <meta name="twitter:title" content="Covalent crypto Dashboard" />
      <meta
        name="twitter:description"
        content="Covalent board / Dashboard built with covalent API."
      />
      <meta
        name="twitter:image"
        content="https://covalent-board.netlify.app/images/folio.png"
      />
    </Head>
  );
};
export default Meta;
