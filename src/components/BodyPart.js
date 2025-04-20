const BodyPart = ({ item }) => {
  return (
    <div className="itemCard">
      <img
        className="itemImage"
        src={`/assets/augmentations/${item.image}`}
        alt={item.name}
      />
      <div className="itemContent">
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
    </div>
  );
};

export default BodyPart;
