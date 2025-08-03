import React, { useRef, useState } from 'react';
import { Form, Col } from 'react-bootstrap';
import { useField, useFormikContext } from 'formik';
import { FileUp } from 'lucide-react';
import { ApiEndpoints, BaseUrl } from '../constants/Urls';

const FormikField = ({ label, name, type, placeholder, xs = 12, colWidth = 12, disabled = false,onChange, uploadUrl,imagetype = "string" }) => {
  const [field, meta] = useField(name); // Hooks into Formik's context
  const { setFieldValue ,values} = useFormikContext();
  // const {mutation} = useCustomMutation();
  
  const fileInputRef = useRef(null); // Reference to the hidden file input
  const [showPassword, setShowPassword] = useState(false);
  
  
  
  const firstTrim = (value) => {
    return value.replace(/^\s+/, "");
  };

  const handleChange = (e) => {
    console.log("handleChange called with value:", e.target.value);
    const trimmedValue = firstTrim(e.target.value);
    console.log("Trimmed value:", trimmedValue);
    if (onChange) {
      onChange(trimmedValue);
    } else {
      setFieldValue(name, trimmedValue); 
    }
  };
  const handleImageChange = async (e) => {
    const file = e.target.files; // Get the uploaded file
    console.log("Selected file:", file);
    if (file[0]) {
      
      const formData = new FormData();
      formData.append('image', file[0]);
      
      try {
        const response = await fetch(BaseUrl+ApiEndpoints.Image_upload, {
          method: 'POST',
          body: formData,
        });
        
        const result = await response.json();
        console.log('Upload successful:', result);
        // setFieldValue(name,result.data) 
        if(imagetype === "array"){
          let newImages = result.image_url;

          if (typeof result.image_url === 'string') {
            newImages = [result.image_url];
          }

          if (Array.isArray(result.image_url) && typeof result.image_url[0] === 'string') {
            newImages = result.image_url;
          }

          const currentValues = Array.isArray(values[name]) ? values[name] : [];
          console.log("Current values before update:", currentValues);

          setFieldValue(name, [...currentValues, ...newImages]);                  
        }else{
          setFieldValue(name,result.image_url)
        }
        
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };
  return (
    <Col xs={xs} md={colWidth}>
      <Form.Group className="mb-3" controlId={`form${name}`}>
        <Form.Label>{label}</Form.Label>
        {type === 'file' ? (
         
          <div>
           
            
                  <FileUp strokeWidth={0.5}   style={{
                width: '90px',
                height: '90px',
                cursor: 'pointer',
              }}
              // onClick={handleImageChange}
              onClick={() => fileInputRef.current.click()}
              />
               <p style={{ marginLeft: '8px', fontSize: '14px', color: '#555', cursor: 'pointer' }} onClick={() => fileInputRef.current.click()}>
    Upload Files
  </p>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              accept=".pdf,image/*"
              onChange={handleImageChange}
            />
          </div>
        ) : (
          <>
           <div className="position-relative">
           <Form.Control
            type={type==="password"?showPassword?"text":"password":type}
            placeholder={placeholder}
            {...field} // Spread Formik's field props
            disabled={disabled}
            onChange={handleChange}
          />
          {type==="password"?
          <div
            onClick={() => setShowPassword(!showPassword)}
            className={`${
              showPassword ? "uil-eye-slash" : "uil-eye"
            } text-lighten fs-15 field-icon toggle-password2 cursor-true`}
          ></div>   
          :""}                                       
          </div>
        </>
        )}

        {meta.touched && meta.error ? (
          <div className="text-danger small">{meta.error}</div>
        ) : null}
      </Form.Group>
    </Col>
  );
};

export default FormikField;
