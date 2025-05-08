
import { useOutletContext } from "react-router-dom"
import { VansType } from "../../types";
const Details = () => {
  const currentVan: VansType = useOutletContext();
  return (
    <div className="detail-container">
      <p><span>Name:</span> {currentVan.name}</p>
      <br />
      <p><span>Category:</span> {currentVan.type[0].toUpperCase() + currentVan.type.slice(1)}</p>
      <br />
      <p><span>Description:</span> {currentVan.description}</p>
      <br />
      <p><span>Visibility:</span> Public</p>
    </div>
  )
}

export default Details