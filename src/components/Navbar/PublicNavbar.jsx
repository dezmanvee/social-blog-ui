import { useNavigate } from "react-router-dom";

const PublicNavbar = () => {
  const navigate = useNavigate();
  return (
    <nav>
      <ul>
        <li
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/create-post")}
        >
          create post
        </li>
        <li style={{ cursor: "pointer" }} onClick={() => navigate("/posts")}>
          all post
        </li>
      </ul>
    </nav>
  );
};
export default PublicNavbar;
