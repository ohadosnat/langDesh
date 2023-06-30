import { ChangeEvent, useState } from "react";

/**
 * Form Input Field Custom Hook
 * @param initial - Form Fields
 * @returns the states of the input fields:
 * - `values` - The state
 * - `setValuesEvent` - handler function to set the correct input field
 * @example
 * const [values, setValuesEvent] =useForm({email: "", password: ""})
 */
export const useForm = (initial: Record<string, string>): useFormReturn => {
  // the form values
  const [values, setValues] = useState<Record<string, string>>(initial);

  /**
   * A Handlers to change the correct input field.
   * @param e - Change Event
   */
  const setValuesEvent = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.id.startsWith("clearButton")) {
      setValues((state) => {
        const prevElement = e.target.previousElementSibling as HTMLInputElement;
        return { ...state, [prevElement.name]: "" };
      });
    } else {
      setValues((state) => ({ ...state, [e.target.name]: e.target.value }));
    }
  };

  // this will only update the value based on the input "name" attribute.
  return [values, setValuesEvent];
};
