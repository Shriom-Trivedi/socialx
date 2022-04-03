import "./formControl.css";

export const TextInput = ({
  label,
  type,
  placeholder,
  name,
  id,
  w = "100%",
}) => {
  return (
    <div className='formGroup'>
      <label htmlFor='email' className='loginLabel'>
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={id}
        className='loginInput'
        placeholder={placeholder}
        style={{ width: w }}
      />
    </div>
  );
};
