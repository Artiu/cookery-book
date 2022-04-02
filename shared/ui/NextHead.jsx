import Head from "next/head";

export default function HeadComponent({ title, description, route = "/", image = "/logo.png" }) {
    const url = "https://przepisy.send-your.works" + route;
    return (
        <Head>
            <title>{title}</title>
            <meta name="title" content={title} key="title" />
            <meta name="description" content={description} key="description" />
            <meta property="og:type" content="website" key="type" />
            <meta property="og:image" content={image} key="ogImage" />
            <meta property="og:url" content={url} key="ogUrl" />
            <meta property="og:title" content={title} key="ogTitle" />
            <meta property="og:description" content={description} key="ogDescription" />
            <meta property="twitter:card" content="summary_large_image" key="twitterCard" />
            <meta property="twitter:image" content={image} key="twitterImage" />
            <meta property="twitter:url" content={url} key="twitterUrl" />
            <meta property="twitter:title" content={title} key="twitterTitle" />
            <meta property="twitter:description" content={description} key="twitterDescription" />
        </Head>
    );
}
