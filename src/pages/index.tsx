import { LucidePlus } from "lucide-react";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Card from "~/components/Card";
import Chip from "~/components/Chip";
const Home: NextPage = () => {
  const tags = ["computer-games", "electronics", "food", "origami"];
  const homePageCards = [
    {
      title: "How to paint on T-Shirts",
      image: "/dashboard/tshirt.png",
      imageClassName: "h-96 w-96 object-cover",
      className: undefined,
    },
    {
      title: "Let’s talk about this DIY workflow...",
      image: "/dashboard/tape.png",
      imageClassName: "h-96",
      className: undefined,
    },
    {
      title: "Easy guide to make aesthetic blah",
      image: "/dashboard/cutting.png",
      imageClassName: "w-90",
      className: undefined,
    },
    {
      title: "Getting started with IoT",
      image: "/dashboard/iot.png",
      imageClassName: "w-72 h-full object-cover",
      className: undefined,
    },
  ];

  return (
    <>
      <Head>
        <title>DiY</title>
        <meta name="description" content="DiY ya stuff" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <input
            type="text"
            className="w-1/2 rounded-full px-4 py-3 text-xl focus:outline-none"
            placeholder="Search"
          />

          <div>
            <button className="rounded-full bg-[#A3C05E] px-4 py-4 hover:bg-opacity-90">
              <LucidePlus />
            </button>
          </div>

          <div>
            <Link
              className="rounded-full bg-[#CABDD9] px-8 py-4 hover:bg-opacity-90"
              href="/projects"
            >
              Your Projects
            </Link>
          </div>
        </div>

        {/* tags | chips */}
        <div className="flex gap-4">
          {tags.map((tag) => (
            <Chip key={tag} title={tag} />
          ))}
        </div>

        <div className="flex flex-wrap gap-8">
          {homePageCards.map((card) => (
            <Card
              key={card.image}
              title={card.title}
              image={card.image}
              className={card.className}
              imageClassName={card.imageClassName}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
