import { useSelector, useDispatch } from "react-redux";
import { getRecipes } from "../../Redux/actions/index";

//import styles from "./Paginate.module.css";

function Paginate(props) {
  const dispatch = useDispatch();
  const page = useSelector((state) => state.page);

  const handlePage = (page = 0) => {
    if (page > 0) dispatch(getRecipes(props.search, page));
  };

  return (
    <div>
      <button onClick={(e) => handlePage(page - 1)}>Prev</button>
      <button>{page + 1}</button>
      <button onClick={(e) => handlePage(page + 1)}>Next</button>
    </div>
  );
}
export default Paginate;
