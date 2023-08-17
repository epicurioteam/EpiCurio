export default (
  itemFields = 
    {
      name: "",
      unit_quantity: "",
      location: "",
      shelf_life: "",
      vendor: "",
      description: "",
      category: "",
      creator: "",
    }, 
  action
) => {
  switch (action.type) {
    case "FETCH_ITEM_FIELDS":
      return action.payload;
    default:
      return itemFields;
  }
};
