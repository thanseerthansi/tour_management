import React from "react";
import Select, { components } from "react-select";
import { useField } from "formik";
import { ChevronDown } from "lucide-react";
import { Col } from "react-bootstrap";

const CustomOption = (props) => {
  const { data } = props;

  if (data.isAddNew) {
    return (
      <div
        onMouseDown={(e) => {
          e.preventDefault();
          e.stopPropagation();
          props.selectProps.onAddNew();
        }}
        className="px-2 py-2 text-primary cursor-pointer ms-1"
      >
        {data.label}
      </div>
    );
  }

  return <components.Option {...props} />;
};

// Custom styles for react-select
const customStyles = {
  control: (provided) => ({
    ...provided,
    padding: "0",
    border: "none",
    boxShadow: "none",
    backgroundColor: "transparent",
  }),
  indicatorSeparator: () => ({ display: "none" }),
  menuPortal: (provided) => ({ ...provided, zIndex: 100 }),
  menu: (provided) => ({ ...provided, zIndex: 100 }),
  clearIndicator: (provided) => ({
    ...provided,
    cursor: "pointer",
  }),
};

// Variant classes mapped to Bootstrap classes
const variantClasses = {
  default: "text-secondary bg-light border-0 border-bottom pb-1 rounded-0 hover:bg-secondary",
  transparent: "text-secondary border-0 border-bottom rounded-0 hover:bg-secondary",
  normal: "border-bottom border-secondary rounded-0 hover:bg-secondary focus:outline-none",
  error: "border-danger focus:border-danger",
  success: "border-success focus:border-success",
  primary: "text-gray bg-white border border-secondary rounded-3",
  border: "text-gray bg-white  border-lightborder rounded-3",
};

// Label classes mapped to Bootstrap classes
const labelClasses = {
  default: "form-label text-primary",
  primary: "form-label fs-6 ", // Larger size
  transparent: "form-label text-primary mb-1",
};

const CustomDropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="#6C757D"
        stroke="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-chevron-down"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </components.DropdownIndicator>
  );
};

const SingleSelect = ({
  placeholder,
  label,
  className,
  addBtnFn,
  showAddNew,
  options = [],
  menuPortalTarget,
  xs = 12,
  colWidth = 12,
  onChange,
  disabled=false,
  variant = "default",
  getOptionLabel = (option) => option.label,
  getOptionValue = (option) => option.value,
  ...props
}) => {
  const [field, meta, helpers] = useField(props);
  const { setValue } = helpers;

  const addNewOption = {
    value: "add-new",
    label: "Add New",
    isAddNew: true,
  };

  // const handleChange = (option) => {
  //   if (option === null) {
  //     // Handle clearing the selection
  //     setValue("");
  //     if (onChange) {
  //       onChange(null);
  //     }
  //   } else {
  //     // Handle regular selection
  //     setValue(option.value);
  //     if (addBtnFn && option && !option.isAddNew) {
  //       addBtnFn(option);
  //     }
  //     if (onChange) {
  //       onChange(option);
  //     }
  //   }
  // };
  const handleChange = (option) => {
  if (!option) {
    setValue("");
    onChange?.(null);
    return;
  }

  setValue(getOptionValue(option)); // store city id in formik
  addBtnFn?.(option);
  onChange?.(option);
};

  const validOptions = Array.isArray(options) ? options : [];
  return (
    <Col  xs={xs} md={colWidth}>
    <div  className={`d-flex flex-column align-items-start ${className}`}>
      {label && (
        <label
          className={`mb-1 ${labelClasses[variant]}`}
          htmlFor={field.name}
        >
          {label}
        </label>
      )}
      <div className="w-100">
      {/* <Select 
      id={field.name}
      classNamePrefix="select"
      options={showAddNew ? [addNewOption, ...validOptions] : validOptions} 
      /> */}
        <Select
          id={field.name}
          classNamePrefix="select"
          options={showAddNew ? [addNewOption, ...validOptions] : validOptions}
          placeholder={placeholder}
          defaultValue={props.value}
          isDisabled={disabled?true:false}
          value={
            validOptions.find((option) => getOptionValue(option) === field.value) || null
          }
          // value={
          //   validOptions
          //     ? validOptions.find((option) => option?.value === field.value)
          //     : ""
          // }
          styles={customStyles}
          onChange={handleChange}
          className={`w-100  placeholder-secondary label-text text-secondary whitespace-nowrap ${variantClasses[variant]}`}
          getOptionLabel={getOptionLabel}
            getOptionValue={getOptionValue}
          menuPortalTarget={menuPortalTarget}
          components={{
            Option: CustomOption,
            DropdownIndicator: CustomDropdownIndicator,
          }}
          isClearable // Enable the clear (close) icon
        />

        {meta.touched && meta.error ? (
          <div className="text-danger small mb-1" style={{ height: "12px" }}>
            {typeof meta.error === "string" && meta.error}
          </div>
        ) : (
          <div className="text-transparent small mb-1" style={{ height: "12px" }}>
              
          </div>
        )}
      </div>
    </div>
    </Col>
  );
};

export default SingleSelect;
