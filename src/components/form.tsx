import React from "react";
import * as yup from "yup";

type Props = {};

interface Person {
  id: string;
  name: string | null;
}

interface PersonWithNullableName {
  id: string;
  name: string | null;
}

const Form: React.FC<Props> = () => {


   // # NO TYPE INTELLISENSE . BUT WORKS 

  // try to remove a field, and click 'ctrl+space' to view type intellisense behind it
  // this will not provide intellisense  
  const personSchema: yup.ObjectSchema<Person> = yup.object({
    id: yup.string().required(),
    name: yup.string().required(),
  }).required();


  // # TYPE INTELLISENSE IS THERE, BUT DOES NOT WORK

  // now using shape with defining the interface, it will provide types intellisense
  // but we get the following error:
  // Type 'Person' does not satisfy the constraint 'ObjectShape'.
  // Index signature for type 'string' is missing in type 'Person'
  const personSchema2 = yup.object().shape<Person>({
    id: yup.string().required(),
  }).required();


  // # NULLABLE FIELD ISSUE --> PersonWithNullableName interface.

  // the field is null, so it should be working for nullable by adding 'nullable'
  // but it always complains with: Type 'undefined' is not assignable to type 'string | null' 
  // adding .default(null) seems to work, but why do we need to do that? or is it a bug?
  const personSchema3: yup.ObjectSchema<PersonWithNullableName> = yup.object({
    id: yup.string().required(),
    name: yup.string().nullable(),
  }).required();
  

  return <div></div>;
};

export default Form;
