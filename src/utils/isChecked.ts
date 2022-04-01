/**
 * Looks for the checked value in the form
 * @param e - Form Event Object
 * @returns - The Checked Option
 */
export const isChecked = (e: React.FormEvent<HTMLFormElement>) => {
  const arr = e.currentTarget;
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i] as HTMLInputElement;
    if (element.checked) return element.id;
  }
};
