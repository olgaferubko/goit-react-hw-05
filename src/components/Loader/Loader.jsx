import { DNA } from "react-loader-spinner";
import s from "./Loader.module.css";
export default function Loader() {
    return (
        <div className={s.loaderWrapper}>
            <DNA
                visible={true}
                height="80"
                width="80"
                ariaLabel="dna-loading"
            />
        </div>
    );
}