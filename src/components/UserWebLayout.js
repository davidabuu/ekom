import Head from "next/head";
const UserWebLayout = ({ webtitle, children }) => {
  return (
    <>
      <Head>
        <title>{webtitle} | EKOM</title>
      </Head>
      {children}
    </>
  );
};

export default UserWebLayout;
