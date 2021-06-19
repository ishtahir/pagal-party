const Input = ({
  className,
  placeholder,
  value,
  onChange,
  onKeyDown,
  rest,
}) => {
  const styles = 'bg-red-100 px-10 py-2 rounded-md text-black';

  return (
    <input
      type='text'
      className={className ? `${className} ${styles}` : styles}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      {...rest}
    />
  );
};

export default Input;
