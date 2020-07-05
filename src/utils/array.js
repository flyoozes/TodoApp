function updateOrInsert(newItem, array) {
  const itemInArray = array.find((fromArray) => fromArray.id === newItem.id);

  if (itemInArray === undefined) {
    array.push(newItem);
    return array;
  }
  newItem = { ...itemInArray, ...newItem };

  return array.map((obj) => {
    if (obj.id === newItem.id) {
      return newItem;
    }
    return obj;
  });
}

export default {
  updateOrInsert,
};
