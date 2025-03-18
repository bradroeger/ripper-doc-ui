import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import augmentationsData from "../assets/augmentations.json";

const BodyImage = styled(motion.img)`
  width: 90vw;
  height: auto;
  max-height: 90vh;
  transition: transform 0.5s ease-in-out;
`;

const ClickableImage = styled(motion.img)`
  position: absolute;
  cursor: pointer;
  transition: opacity 0.5s, transform 0.3s;

  &:hover {
    opacity: 0.8;
  }
`;

const ShopContainer = styled(motion.div)`
  position: absolute;
  top: 10%;
  ${({ position }) => (position === "left" ? "left: 5%;" : "right: 5%;")}
  width: 40vw;
  height: 80vh;
  background: url("/assets/shopB.png") no-repeat center center;
  background-size: cover;
  color: white;
  border-radius: 10px;
  padding: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ItemCard = styled(motion.div)`
  position: absolute;
  width: 80%;
  height: 24%; /* Ensuring consistent height */
  background: rgb(0, 0, 0);
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
  padding-left: 10px;
  transform-origin: center;
  font-size: 0.9em;
  z-index: ${({ active }) =>
    active ? 10 : 1}; /* Bring active item to front */
`;

/**
 * ✅ Configurable Zoom Positions
 */
const zoomPositions = {
  head: { scale: 2.5, x: -400, y: 900 },
  hand: { scale: 2.5, x: 1350, y: 700 },
  uppertorso: { scale: 2, x: -500, y: 500 },
  lowertorso: { scale: 2, x: -500, y: 100 },
  leg: { scale: 2.2, x: 750, y: -100 },
  feet: { scale: 2.5, x: 750, y: -900 },
  arm: { scale: 2.5, x: -1350, y: 600 },
};

/**
 * ✅ Define which parts should have the shop window on the left
 */
const leftSideParts = ["hand", "leg", "feet"];

const BodyMap = () => {
  const [zoomedPart, setZoomedPart] = useState(null);
  const [shopItems, setShopItems] = useState([]);
  const [hiddenParts, setHiddenParts] = useState({});
  const [shopPosition, setShopPosition] = useState("right");
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleClick = (part) => {
    setZoomedPart(part);
    setShopItems(augmentationsData.augmentations[part] || []);
    setHiddenParts((prev) => ({ ...prev, [part]: true }));

    // Determine if the shop should appear on the left or right
    setShopPosition(leftSideParts.includes(part) ? "left" : "right");
    setCurrentIndex(0); // Reset pagination when opening a new shop
  };

  const closeShop = () => {
    setZoomedPart(null);
    setHiddenParts({});
  };

  const nextItem = () => {
    if (shopItems.length > 3) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % shopItems.length);
    }
  };

  const prevItem = () => {
    setCurrentIndex((prev) => (prev - 1 + shopItems.length) % shopItems.length);
  };

  return (
    <div className="bodyContainer">
      <BodyImage
        src="/assets/statue.png"
        alt="Body"
        animate={
          zoomedPart ? zoomPositions[zoomedPart] : { scale: 1, x: 0, y: 0 }
        }
        transition={{ duration: 0.1, ease: [0.42, 0, 0.58, 1] }}
      />

      {/* Clickable Images */}
      {!hiddenParts["head"] && (
        <ClickableImage
          src="/assets/Select-Box.png"
          style={{
            top: "6%",
            left: "47.1%",
            width: "5%",
            opacity: zoomedPart ? 0 : 1,
          }}
          onClick={() => handleClick("head")}
        />
      )}
      {!hiddenParts["hand"] && (
        <ClickableImage
          src="/assets/Select-Box.png"
          style={{
            top: "18%",
            left: "31%",
            width: "5%",
            opacity: zoomedPart ? 0 : 1,
          }}
          onClick={() => handleClick("hand")}
        />
      )}
      {!hiddenParts["uppertorso"] && (
        <ClickableImage
          src="/assets/Select-Box.png"
          style={{
            top: "21%",
            left: "44.6%",
            width: "5%",
            opacity: zoomedPart ? 0 : 1,
          }}
          onClick={() => handleClick("uppertorso")}
        />
      )}
      {!hiddenParts["lowertorso"] && (
        <ClickableImage
          src="/assets/Select-Box.png"
          style={{
            top: "35%",
            left: "44.6%",
            width: "5%",
            opacity: zoomedPart ? 0 : 1,
          }}
          onClick={() => handleClick("lowertorso")}
        />
      )}
      {!hiddenParts["leg"] && (
        <ClickableImage
          src="/assets/Select-Box.png"
          style={{
            top: "50%",
            left: "44.6%",
            width: "5%",
            opacity: zoomedPart ? 0 : 1,
          }}
          onClick={() => handleClick("leg")}
        />
      )}
      {!hiddenParts["feet"] && (
        <ClickableImage
          src="/assets/Select-Box.png"
          style={{
            top: "85%",
            left: "44.6%",
            width: "5%",
            opacity: zoomedPart ? 0 : 1,
          }}
          onClick={() => handleClick("feet")}
        />
      )}
      {!hiddenParts["arm"] && (
        <ClickableImage
          src="/assets/Select-Box.png"
          style={{
            top: "22%",
            left: "55%",
            width: "5%",
            opacity: zoomedPart ? 0 : 1,
          }}
          onClick={() => handleClick("arm")}
        />
      )}

      {zoomedPart && (
        <ShopContainer position={shopPosition}>
          <button className="closeBtn" onClick={closeShop}>
            X
          </button>
          <h2 className="title">{zoomedPart.toUpperCase()} AUGMENTATIONS</h2>

          {/* Scroll Effect */}
          <div className="scrollContainer">
            {shopItems.map((item, index) => {
              const relativeIndex =
                (index - currentIndex + shopItems.length) % shopItems.length;

              let positionY, scale, opacity, zIndex;
              const size = 29; // Ensure uniform height

              if (relativeIndex === 0) {
                positionY = -70;
                scale = 0.2;
                opacity = 1;
                zIndex = 0; // Top-most item is in front
              } else if (relativeIndex === 1) {
                positionY = 40;
                scale = 1;
                opacity = 1;
                zIndex = 5;
              } else if (relativeIndex === 2) {
                positionY = 305;
                scale = 1;
                opacity = 1;
                zIndex = 2;
              } else if (relativeIndex === 3) {
                positionY = 570;
                scale = 1;
                opacity = 1;
                zIndex = 1;
              } else if (relativeIndex === 4) {
                positionY = 730;
                scale = 0.2;
                opacity = 1;
                zIndex = 0;
              } else {
                positionY = 760;
                scale = 0;
                opacity = 0;
                zIndex = -1;
              }

              // 🔧 Ensure last item behaves like all others
              if (index === shopItems.length - 1 && relativeIndex === 0) {
                positionY = -70;
                scale = 0.2;
                opacity = 1;
                zIndex = 0;
              }

              return (
                <ItemCard
                  key={index}
                  size={size}
                  active={relativeIndex === 0} // Pass active state for styling
                  animate={{
                    y: positionY,
                    scaleY: scale,
                    opacity: opacity,
                    zIndex: zIndex,
                  }}
                  transition={{ duration: 1 }}
                >
                  <img
                    className="itemImage"
                    src={`/assets/augmentations/${item.image}`}
                    alt={item.name}
                  />
                  <div>
                    <h3>{item.name}</h3>
                    <p>
                      <strong>Cost:</strong> ${item.cost}
                    </p>
                    <p>
                      <strong>Description:</strong> {item.description}
                    </p>
                    <p>
                      <strong>Overcharge:</strong> {item.Overcharge}
                    </p>
                    <p>
                      <strong>Cost:</strong> ${item.cost}
                    </p>
                  </div>
                </ItemCard>
              );
            })}
          </div>

          {/* Navigation Buttons */}
          {shopItems.length > 3 && (
            <div className="buttonContainer">
              <div className="arrowBtn" onClick={prevItem}>
                <img
                  className="arrowImage"
                  src="/assets/Button.png"
                  alt="Prev"
                />
              </div>
              <div className="arrowBtn" onClick={nextItem}>
                <img
                  className="arrowImage"
                  src="/assets/Button.png"
                  alt="Next"
                  rotate
                />
              </div>
            </div>
          )}
        </ShopContainer>
      )}
    </div>
  );
};

export default BodyMap;
