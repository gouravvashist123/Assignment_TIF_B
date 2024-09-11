import React from "react";
import { useTheme } from "@chakra-ui/react";
import FromWrapper from "./FormWrapper";
import { IFormInputProps } from "@src/interface/forms";
import ReactSelect, { Props } from "react-select";

interface IFormSelectProps
  extends Omit<IFormInputProps, "inputProps" | "type" | "onChange" | "onBlur"> {
  options: { label: string; value: string }[] | any;
  selectProps?: Props;
  onChange?: (value: any) => void;
  onBlur?: (e: React.FocusEvent<HTMLElement>) => void; // Updated type for onBlur
}

const FormSelect: React.FC<IFormSelectProps> = ({
  name,
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  touched,
  selectProps = {},
  children,
  helperText,
  wrapperProps = {},
  options,
}) => {
  const theme = useTheme();

  const handleChange = (selectedOption: any) => {
    onChange && onChange(selectedOption?.value);
  };

  const handleBlur = (event: React.FocusEvent<HTMLElement>) => {
    onBlur && onBlur(event); // Pass the event to the onBlur handler
  };

  return (
    <FromWrapper
      isInvalid={Boolean(error && touched)}
      wrapperProps={wrapperProps}
      helperText={helperText}
      label={label}
      error={error as string}
      touched={touched}
    >
      <ReactSelect
        name={name}
        placeholder={placeholder}
        value={options.find((item: { value: string }) => item?.value === value)}
        onChange={handleChange}
        onBlur={handleBlur} // Handle the onBlur event
        options={options}
        menuPortalTarget={document.body}  // added
        styles={{
          container: (base) => ({
            ...base,
            width: "100%",
            minWidth: "none",
            height: "auto",
            maxHeight: "none",
            minHeight: "none",
            zIndex: 10,           //added
          }),
          control: (base, { isFocused }) => ({
            ...base,
            width: "100%",
            minWidth: "272px",
            height: "45px",
            border: isFocused
              ? `1px solid ${theme.colors.primary}`
              : error
              ? `1px solid ${theme.colors.errorRed}`
              : "1px solid #c0bcd7",
            backgroundColor: theme.colors.inputBg,
            borderRadius: "10px",
            fontSize: ".875rem",
            fontWeight: "500",
            "&:hover": {
              border: `1px solid ${theme.colors.primary}`,
            },
            zIndex: 10,      //added
          }),
          menu: (base) => ({  //menu added
            ...base,
            zIndex: 9999, // Ensure the dropdown options are rendered on top
          }),
          menuPortal: (base) => ({ // menuportal added
            ...base,
            zIndex: 9999, // Ensures the menu portal is on top of all elements
          }),
          valueContainer: (base) => ({
            ...base,
            paddingLeft: "20px",
          }),
          // option: (base) => ({
          //   ...base,
          //   // backgroundColor: 'red',
          //   fontSize: ".875rem",
          //   fontWeight: "500",
          // }),
          option: (base, { isFocused }) => ({
            ...base,
            fontSize: ".875rem",
            fontWeight: "500",
            backgroundColor: isFocused ? theme.colors.primaryLight : "white",
            color: isFocused ? theme.colors.primary : "black",
            zIndex: 20, // Ensure individual options remain on top
          }),
        }}
        {...selectProps}
      />
      {children}
    </FromWrapper>
  );
};

export default FormSelect;
