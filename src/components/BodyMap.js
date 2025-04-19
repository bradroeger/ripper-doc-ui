import React, { useState } from "react";
import { motion } from "framer-motion";
import augmentationsData from "../assets/augmentations.json";

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
      <motion.img
        className="bodyImage"
        src="/assets/statue.png"
        alt="Body"
        animate={
          zoomedPart ? zoomPositions[zoomedPart] : { scale: 1, x: 0, y: 0 }
        }
        transition={{ duration: 0.1, ease: [0.42, 0, 0.58, 1] }}
      />

      {/* Clickable Images */}
      {!hiddenParts["head"] && (
        <motion.img
          className="clickableImage"
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
        <motion.img
          className="clickableImage"
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
        <motion.img
          className="clickableImage"
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
        <motion.img
          className="clickableImage"
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
        <motion.img
          className="clickableImage"
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
        <motion.img
          className="clickableImage"
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
        <motion.img
          className="clickableImage"
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
        <motion.div className="shopContainer" position={shopPosition}>
          <button className="closeBtn" onClick={closeShop}>
            X
          </button>
          <h2 className="title">{zoomedPart.toUpperCase()} AUGMENTATIONS</h2>

          {/* Scroll Effect */}
          <div className="scrollContainer">
            {shopItems.map((item, index) => {
              return (
                <motion.div
                  key={index}
                  className="itemCard"
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
                </motion.div>
              );
            })}
          </div>

          {/* Navigation Buttons 
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
          )}*/}
        </motion.div>
      )}
    </div>
  );
};

export default BodyMap;
