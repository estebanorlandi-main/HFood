import { useSelector, useDispatch } from "react-redux";
import { getRecipes } from "../../Redux/actions/index";

//import styles from "./Paginate.module.css";

function Paginate(props) {
  const dispatch = useDispatch();

  const page = useSelector((state) => ({
    actual: state.page,
    totalPages: state.totalPages,
  }));

  const handlePage = (nextPage = 0) => {
    if (nextPage > 0 && nextPage < page.totalPages)
      dispatch(getRecipes(props.search, nextPage));
  };

  return (
    <div>
      <button onClick={(e) => handlePage(page.actual - 1)}>Prev</button>
      <button>{page.actual + 1}</button>
      <button onClick={(e) => handlePage(page.actual + 1)}>Next</button>
    </div>
  );
}
export default Paginate;
