import mongoose from 'mongoose';
import React from 'react'

const parseAdminData = (obj) =>  {
    const schemaDefinition = {};

    for (const fieldName in obj) {
        if (obj.hasOwnProperty(fieldName)) {
            const fieldType = obj[fieldName];
            if (fieldType === 'Number') {
            schemaDefinition[fieldName] = Number;
            } else if (fieldType === 'String') {
            schemaDefinition[fieldName] = String;
        //   } else if (/* add more type checks here */) {
        //     // Handle other types as needed
        //   }
            }
        }
    }
    return mongoose.Schema(schemaDefinition);
}

export default parseAdminData;