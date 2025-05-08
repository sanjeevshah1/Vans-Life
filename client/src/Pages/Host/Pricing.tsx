import { useOutletContext } from "react-router-dom"
import { VansType } from "../../types";
const Pricing = () => {
  const currentVan: VansType = useOutletContext<VansType>();
  return (
    <div className="price-container">
      <p><span id="price">${currentVan.price}</span>/day</p>
    </div>
  )
}

export default Pricing