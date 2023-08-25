import mongoose from "mongoose";
const parseAdminData = (attributeArray) => {
  const schemaDefinition = {};

  for (const attribute of attributeArray) {
    const fieldName = attribute.name;
    const fieldType = attribute.type;

    if (fieldType === "Number") {
      schemaDefinition[fieldName] = mongoose.Schema.Types.Number;
    } else if (fieldType === "String") {
      schemaDefinition[fieldName] = mongoose.Schema.Types.String;
      // Add more conditions for other data types as needed
    }
  }

  return schemaDefinition;
};

export default parseAdminData


