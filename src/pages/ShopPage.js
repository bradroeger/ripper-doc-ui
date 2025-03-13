import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import augmentationsData from "../assets/augmentations.json";

const ShopContainer = styled.div`
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  width: 40vw;
  height: 80vh;
  color: white;
  border-radius: 10px;
  padding: 20px;
  overflow-y: auto;
`;

const ItemCard = styled.div`
  margin: 10px;
  padding: 10px;
  border-radius: 5px;
`;

const ShopPage = () => {
  const { part } = useParams();
  const [augmentations, setAugmentations] = useState([]);

  useEffect(() => {
    if (augmentationsData.augmentations[part]) {
      setAugmentations(augmentationsData.augmentations[part]);
    }
  }, [part]);

  return (
    <ShopContainer>
      <h2>{part.toUpperCase()} AUGMENTATIONS</h2>
      {augmentations.map((item, index) => (
        <ItemCard key={index}>
          <h3>{item.name}</h3>
          <p>{item.description}</p>
          <p><strong>Mechanics:</strong> {item.mechanics}</p>
          <p><strong>Overcharge:</strong> {item.Overcharge}</p>
          <p><strong>Cost:</strong> L {item.cost}</p>
        </ItemCard>
      ))}
    </ShopContainer>
  );
};

export default ShopPage;
