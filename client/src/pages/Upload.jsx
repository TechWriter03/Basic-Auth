import { useLocation } from "react-router-dom";
import '../style.css';

const Upload = () => {
  const location = useLocation();
  const username = location.state.username

  return (
    <div>
      <div className="header">Welcome, {username} !</div>
    </div>
  );
};

export default Upload;