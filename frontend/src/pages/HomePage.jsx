import { useAuth } from "../context/AuthContext";

function HomePAges() {
  const data = useAuth()
  return <div>HomePAges</div>;
}

export default HomePAges;
