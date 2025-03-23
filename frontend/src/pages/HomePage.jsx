import { useAuth } from "../context/AuthContext";

function HomePAges() {
  const data = useAuth()
  console.log(data);
  return <div>HomePAges</div>;
}

export default HomePAges;
