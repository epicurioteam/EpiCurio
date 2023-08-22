import mongoose from 'mongoose';
import React from 'react'
import mongoose from 'mongoose';

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
    
      return new mongoose.Schema(schemaDefinition);
    }
}

export default parseAdminData;