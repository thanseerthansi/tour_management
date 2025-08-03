import React, { useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import { useField, useFormikContext } from 'formik';
import { Col, Form } from 'react-bootstrap';

const components = {
  DropdownIndicator: null,
};

const createOption = (label) => ({
  label,
  value: label,
});

const FormikCreatableMultiSelect = ({
  name,
  label = '',
  placeholder = '',
  colWidth = 12,
  xs = 12,
}) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  const [inputValue, setInputValue] = useState('');

  const selectedOptions = (field.value || []).map((val) => ({
    label: val,
    value: val,
  }));

  const handleChange = (newValue) => {
    const values = (newValue || []).map((item) => item.value);
    setFieldValue(name, values);
  };

  const handleKeyDown = (event) => {
    if (!inputValue) return;
    if (event.key === 'Enter' || event.key === 'Tab') {
      const newOption = createOption(inputValue);
      setFieldValue(name, [...(field.value || []), newOption.value]);
      setInputValue('');
      event.preventDefault();
    }
  };

  return (
    <Col xs={xs} md={colWidth}>
      <Form.Group className="mb-3">
        {label && <Form.Label>{label}</Form.Label>}
        <CreatableSelect
          components={components}
          inputValue={inputValue}
          isClearable
          isMulti
          menuIsOpen={false}
          onInputChange={setInputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          value={selectedOptions}
        />
        {meta.touched && meta.error && (
          <div className="text-danger small">{meta.error}</div>
        )}
      </Form.Group>
    </Col>
  );
};

export default FormikCreatableMultiSelect;
