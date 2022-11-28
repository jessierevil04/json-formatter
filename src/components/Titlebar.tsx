type Props = {
  error?: string;
};

const Message: React.FC<Props> = ({ error }) => {

  return (
    <div id="hero" className={error ? "error" : ""}>
      <h1>JSON Formatter</h1>
      {error ? <></> : <span>A client-side JSON Formatter</span>}
      <div>{error}</div>
    </div>
  );
};

export default Message;
