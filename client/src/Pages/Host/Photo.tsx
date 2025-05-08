import { useOutletContext } from "react-router-dom"
import { VansType } from "../../types";
const Photo = () => {
  const currentVan:VansType = useOutletContext<VansType>();
  return (
    <div className="price-container">
      <img src={currentVan.imageUrl} alt={currentVan.name} />
    </div>
  )
}

export default Photo