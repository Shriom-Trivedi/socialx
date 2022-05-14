import "./formControl.css";

export const TextInput = ({
  label,
  type,
  placeholder,
  name,
  id,
  w = "100%",
  inputRef = null,
}) => {
  return (
    <div className='formGroup' style={{ width: w }}>
      <label htmlFor='email' className='loginLabel'>
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={id}
        className='loginInput'
        placeholder={placeholder}
        ref={inputRef}
      />
    </div>
  );
};
