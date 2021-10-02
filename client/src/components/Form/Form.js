function Form() {
  const [inputs, setInputs] = useState({
    activity: "",
    description: "",
  });

  const handleInput = ({ target }) => {
    setInputs((oldInputs) => ({ ...inputs, [target.name]: target.value }));
  };

  return (
    <form>
      <input
        onChange={handleInput}
        name="activity"
        value={inputs.activity}
        type="text"
      />
      <textarea
        onChange={handleInput}
        name="description"
        value={inputs.description}
      ></textarea>
    </form>
  );
}
export default Form;
