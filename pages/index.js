import axios from "axios";
import Link from "next/link";
import slug from "slug";
const Home = ({ activities }) => {
  return (
    <main>
      <h1>ACTIVITIES (MASTERPAGE: OVERVIEW)</h1>
      <p>DIT WERD NIEUW TOEGEVOEGD</p>
      <ul>
        {activities.map(({ act_id, act_title }) => (
          <li key={act_id}>
            <Link href={`/detail/${act_id}/${slug(act_title)}`}>
              <a>{act_title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Home;

export const getStaticProps = async (context) => {
  const { data: activities } = await axios.get(
    `${process.env.NEXT_PUBLIC_BASEPATH}/activities`
  );
  return {
    props: { activities },
    revalidate: 60,
  };
};
