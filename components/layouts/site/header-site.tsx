import Head from 'next/head';

interface IProps {
  title: string;
}

const HeaderSite = ({ title }: IProps) => {
  return (
    <Head>
      <title>
        {title} | {process.env.NEXT_PUBLIC_NAME_SITE}
      </title>
      <meta
        property="og:title"
        content={process.env.NEXT_PUBLIC_NAME_SITE}
        key="title"
      />
      <meta
        name="description"
        content={`${process.env.NEXT_PUBLIC_NAME_SITE} est le meilleur endroit pour créer une communauté avec vos plus grands fans, partager des œuvres exclusives et transformer votre passion en une entreprise créative durable.`}
      />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
  );
};

export { HeaderSite };
