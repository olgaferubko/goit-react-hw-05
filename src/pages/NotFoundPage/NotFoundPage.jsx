import s from "./NotFoundPage.module.css";
import { Link } from "react-router-dom";
export default function NotFoundPage() {
  return (
    <div className={s.container}>
      <p className={s.text}>Looks like we do not have page like this!</p>
      <Link to="/" className={s.link}>
        Home page
      </Link>
    </div>
  );
}