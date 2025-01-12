import { fetchReviews } from "../../api_management/fetchResults.js";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import s from "./MovieReviews.module.css";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchActors() {
      try {
        setIsLoading(() => true);
        const res = await fetchReviews(movieId);
        setData(res);
      } catch {
        console.log("error");
      } finally {
        setIsLoading(() => false);
      }
    }
    fetchActors();
  }, [movieId]);

  useEffect(() => {
    if (data.length > 0) {
      scrollBy({
        top: 100,
        behavior: "smooth",
      });
    }
  }, [data]);
  return (
    <div>
      {isLoading && <Loader />}
      {data.length > 0 ? (
        <ul className={s.reviewsList}>
          {data.map(({ id, author, content }) => {
            return (
              <li key={id} className={s.listItem}>
                <p className={s.listItemHeader}>Author: {author}</p>
                <p>{content}</p>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className={s.noReviewsMessage}>There are no reviews</p>
      )}
    </div>
  );
}