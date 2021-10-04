function Buttons(props) {
  return (
    <button className="btn primary" onClick={props.onClick}>
      {props.text}
    </button>
  );
}
export default Buttons;
