function Card(props) {
  return (
    <div>
      <img src={props.image} alt={props.title} />
      <h5>{props.title}</h5>
      <ul>
        {props.diets.map((diet) => (
          <li key={diet}>{diet}</li>
        ))}
      </ul>
    </div>
  );
}
export default Card;
