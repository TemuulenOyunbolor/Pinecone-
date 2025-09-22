export const FormInputPassword = (props) => {
  const { error, value, handleChange, inputTag, name, errorMessage } = props;

  return (
    <div>
      <p className="name">
        {inputTag} <span style={{ color: "red" }}>* </span>
      </p>
      <input
        name={name}
        value={value}
        className={error ? "input-error" : "input-style"}
        onChange={handleChange}
        placeholder="placeholder"
        type="password"
      />
      {error && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
};
