import { lazy, useEffect, useState } from "react";
const MovieList = lazy(() => import("../../components/MovieList/MovieList"));
import { fetchTrending } from "../../api_management/fetchResults.js";
import Loader from "../../components/Loader/Loader";
export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    setIsLoading(() => true);
    const fetchTrend = async () => {
      try {
        const result = await fetchTrending();
        setData(result);
      } catch {
        console.log("error");
      } finally {
        setIsLoading(() => false);
      }
    };
    fetchTrend();
  }, []);

  return (
    <div>
      <MovieList isHomePage={true} list={data} />
      {isLoading && <Loader />}
    </div>
  );
}