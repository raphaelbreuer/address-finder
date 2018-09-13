async function setAddressFields(results: any, obj: any) {
    results.forEach((e: any) => {
         switch (e.types[0]) {
             case 'postal_code':
                 obj.zip = e.long_name;
                 break;
             case 'street_number':
                 obj.physical_address_1 = e.long_name;
             case 'locality':
                 obj.city = e.long_name;
                 break;
             case 'route':
                 const tempAddress = obj.physical_address_1;
                 obj.physical_address_1 = tempAddress + ' ' + e.long_name;
                 break;
             case 'administrative_area_level_2':
                 obj.county = e.long_name.replace('County', '');
                 break;
             case 'administrative_area_level_1':
                 obj.state = e.short_name;
                 break;
         }

     });
 }

 export {
     setAddressFields
 }