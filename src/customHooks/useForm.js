import { useState } from "react";

export const useForm = (initialValues) => {
  // the form values
  const [values, setValues] = useState(initialValues);

  // this will only update the value based on the input "name" attribute.
  return [
    values,
    (e) => {
      if (e.target.id === "clearButton")
        setValues({ ...values, [e.target.previousElementSibling.name]: "" });
      else setValues({ ...values, [e.target.name]: e.target.value });
    },
  ];
};
