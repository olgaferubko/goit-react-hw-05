import { lazy, useEffect, useState } from "react";
const MovieList = lazy(() => import("../../components/MovieList/MovieList"));
import { fetchQuery } from "../../api_management/fetchResults";
import s from "./MoviesPage.module.css";
import Loader from "../../components/Loader/Loader";
import { useSearchParams } from "react-router-dom";

export default function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const query = searchParams.get("query") ?? "";

  useEffect(() => {
    const search = async () => {
      if (!query) return;
      try {
        setIsLoading(true);
        const data = await fetchQuery(query);
        setData(data);
      } catch {
        console.log("error");
      } finally {
        setIsLoading(false);
      }
    };
    search();
  }, [query]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const query = e.currentTarget.searchQuery.value.trim();
    if (!query) return;
    setSearchParams({ query });
  };

  return (
    <div>
      {isLoading && <Loader />}
      <form onSubmit={handleSubmit} className={s.form}>
        <input type="text" name="searchQuery" className={s.input} />
        <button className={s.submitButton}>Search</button>
      </form>
      {data.length > 0 && <MovieList list={data} />}
    </div>
  );
}