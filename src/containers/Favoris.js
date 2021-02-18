import { useLocation } from "react-router-dom";

const Favoris = () => {
  const location = useLocation();
  const { id } = location.state;
  console.log(id);
  return <div className="Favoris">Favoris</div>;
};

export default Favoris;
