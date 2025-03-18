import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import augmentationsData from "../assets/augmentations.json";

const ShopPage = () => {
  const { part } = useParams();
  const [augmentations, setAugmentations] = useState([]);

  useEffect(() => {
    if (augmentationsData.augmentations[part]) {
      setAugmentations(augmentationsData.augmentations[part]);
    }
  }, [part]);

  return (
    <div className="shopContainer">
      <h2>{part.toUpperCase()} AUGMENTATIONS</h2>
      {augmentations.map((item, index) => (
        <div className="itemCard" key={index}>
          <h3>{item.name}</h3>
          <p>{item.description}</p>
          <p>
            <strong>Mechanics:</strong> {item.mechanics}
          </p>
          <p>
            <strong>Overcharge:</strong> {item.Overcharge}
          </p>
          <p>
            <strong>Cost:</strong> L {item.cost}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ShopPage;
