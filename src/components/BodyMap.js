import React, { useState } from 'react';
import augmentationsData from '../assets/augmentations.json';

import BodyPart from './BodyPart';

const partDetails = {
  head: {
    position: { isLeft: true, top: '4%', left: '47.1%' },
    zoomPosition: { scale: 2.5, x: -560, y: 900 },
  },
  hand: {
    position: { top: '18%', left: '31%' },
    zoomPosition: { scale: 2.5, x: 1350, y: 700 },
  },
  uppertorso: {
    position: { top: '21%', left: '44.6%' },
    zoomPosition: { scale: 2, x: -500, y: 500 },
  },
  lowertorso: {
    position: { top: '35%', left: '44.6%' },
    zoomPosition: { scale: 2, x: -500, y: 100 },
  },
  leg: {
    position: { isLeft: true, top: '50%', left: '44.6%' },
    zoomPosition: { scale: 2.2, x: 750, y: -100 },
  },
  feet: {
    position: { isLeft: true, top: '85%', left: '44.6%' },
    zoomPosition: { scale: 2.5, x: 750, y: -900 },
  },
  arm: {
    position: { top: '22%', left: '55%' },
    zoomPosition: { scale: 2.5, x: -1450, y: 600 },
  },
};

const BodyMap = () => {
  const [zoomedPart, setZoomedPart] = useState(null);
  const [shopItems, setShopItems] = useState([]);
  const [hiddenParts, setHiddenParts] = useState({});
  const [shopPosition, setShopPosition] = useState('right');
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleClick = (part) => {
    setZoomedPart(part);
    setShopItems(augmentationsData.augmentations[part] || []);
    setHiddenParts((prev) => ({ ...prev, [part]: true }));

    // Determine if the shop should appear on the left or right
    setShopPosition(partDetails[part].position.isLeft ? 'left' : 'right');
    setCurrentIndex(0); // Reset pagination when opening a new shop
  };

  const closeShop = () => {
    setZoomedPart(null);
    setHiddenParts({});
  };

  const transitionStyle = { transition: '1s', 'ease-in-out': '0.4s' };
  const bodyAnimStyle = !zoomedPart
    ? { transform: `translateX(0) translateY(0) scale(1)` }
    : {
        transform: `translateX(${partDetails[zoomedPart].zoomPosition.x}px) translateY(${partDetails[zoomedPart].zoomPosition.y}px) scale(${partDetails[zoomedPart].zoomPosition.scale})`,
      };

  return (
    <div className='bodyContainer'>
      <img className='bodyImage' src='/assets/statue.png' alt='Body' style={{ ...bodyAnimStyle, ...transitionStyle }} />

      {/* Clickable Images */}
      {Object.keys(partDetails).map(
        (partKey) =>
          !hiddenParts[partKey] && (
            <img
              className='clickableImage'
              src='/assets/Select-Box.png'
              style={{
                top: partDetails[partKey].position.top,
                left: partDetails[partKey].position.left,
                width: '5%',
                opacity: zoomedPart ? 0 : 1,
              }}
              onClick={() => handleClick(partKey)}
            />
          ),
      )}

      {zoomedPart && (
        <div className='shopContainer' position={shopPosition}>
          <button className='closeBtn' onClick={closeShop}>
            X
          </button>
          <h2 className='title'>{zoomedPart.toUpperCase()} AUGMENTATIONS</h2>

          {/* Scroll Effect */}
          <div className='scrollContainer'>
            {shopItems.map((item, index) => {
              return <BodyPart key={index} item={item} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default BodyMap;
