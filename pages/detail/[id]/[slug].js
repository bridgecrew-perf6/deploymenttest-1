import axios from "axios";
import Link from "next/link";
import slug from "slug";

const Home = ({ activity: { typ_name, act_activity, act_link } }) => {
  return (
    <main>
      <h1>CHOSEN ACTIVITY (DETAILPAGE: DETAIL)</h1>
      <Link href="/">
        <a>go back</a>
      </Link>
      <h2>type: {typ_name}</h2>
      <h3>activity: {act_activity}</h3>
      <a href={act_link} target="_blank" rel="noreferrer">
        visit activity link
      </a>
    </main>
  );
};

export default Home;

export async function getStaticPaths() {
  const { data: activities } = await axios.get(
    `${process.env.NEXT_PUBLIC_BASEPATH}/activities`
  );
  return {
    paths: activities.map(({ act_id, act_title }) => ({
      params: { id: act_id, slug: slug(act_title) },
    })),
    fallback: "blocking", // false or 'blocking'
  };
}

export const getStaticProps = async (context) => {
  const { id } = context.params;
  const { data: activity } = await axios.get(
    `${process.env.NEXT_PUBLIC_BASEPATH}/activity/${id}`
  );
  return {
    props: { activity: activity[0] },
    revalidate: 60,
  };
};
