import { Link } from "react-router-dom";

interface IAuthText {
  text: string;
  redirectText: string;
  redirectUrl: string;
}

const AuthText = ({ text, redirectText, redirectUrl }: IAuthText) => {
  return (
    <div className="mt-5">
      {text}{" "}
      <Link to={redirectUrl}>
        <span className="font-bold hover:text-blue-500">{redirectText}</span>
      </Link>
    </div>
  );
};
export default AuthText;
