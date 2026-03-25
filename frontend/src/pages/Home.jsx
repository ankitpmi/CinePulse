import Header from "./Movies/Header";
import MoviesContainerPage from "./Movies/MoviesContainerPage";

const Home = () => {
  return (
    <>
      <Header />

      <section className="mt-20 sm:mt-24">
        <MoviesContainerPage />
      </section>
    </>
  );
};

export default Home;
