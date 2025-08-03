import React, { useContext, useEffect, useMemo, useState } from 'react'
import { ContextDatas } from '../../services/Context';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Col, Row } from 'react-bootstrap';
import Table from '../../components/Table';
import { Formik } from 'formik';
import FormikField from '../../components/InputComponents';
import { useCustomMutation } from '../../services/useCustomMutation';
import { Pencil, Trash2 } from 'lucide-react';
import Commonmodal from '../../components/modal/Commonmodal';
import ConfirmationDialog from '../../components/modal/ConfirmationDialog';
import { useFetchData } from '../../services/useQueryFetchData';
import { ApiEndpoints, BaseUrl } from '../../constants/Urls';
import { fetchPackage } from '../../api/Tourapi';
import SingleSelect from '../../components/SingleSelect';
import { fetchcity } from '../../api/Countryapi';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../constants/Path';

export default function Country() {
    const [pageLoading, setpageLoading] = useState(true);
  const { mobileSide} = useContext(ContextDatas);
  const {mutation} = useCustomMutation(); 
  const navigate = useNavigate();
  
  const [show, setShow] = useState(false);
 const [selectData,setselectData] =useState('')
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [deleteId,setDeleteId]=useState(null)
  const {data:packagelist}  = useFetchData('package',fetchPackage);
  const {data:citylist}  = useFetchData('city',fetchcity);
 

const [confirmationState,setConfirmationState]=useState(false)

 
  const columns = useMemo(() => [
    {
      header: "Sl.no",
      accessorKey: "",
      cell: (info) => info.row.index + 1,
    },
      {
        header: 'Title',
        accessorKey: 'package_title',
        cell:info=><strong >{info.getValue()}</strong>
      },
      {
        header: 'City',
        accessorKey: 'city.name',
          },
      {
        header: 'Destination',
        accessorKey: 'destination.name',
        
      },
      { header: 'Amount', accessorKey: 'amount' },
      {
        header: 'description',
        accessorKey: 'description',
        
      },
      {
        header: 'Terms and Conditions',
        accessorKey: 'terms_and_conditions',
        
      },
      {
        header: 'package photo ',
        accessorKey: 'package_photo',
        size:125,
        cell:({row})=>(
          row.original?.package_photo?
          row.original?.package_photo?.map((item, index) => (
            
        <img
          src={BaseUrl+item}
            key={index}
          alt="image Icon"
          style={{
            width: '50px',
            height: '50px',
            marginBottom: '2px',
          }}
        /> )):"")
      },
      {
        header: 'Schedule',
        cell: ({ row }) => (
            
            <button
              className="btn btn-primary"
              onClick={() => {navigate(PATH.SCHEDULE+'/'+row.original.id)}}
            >
               Schedule
            </button>
          )
        
      },
   
      {
        header: 'Action',
        cell: ({ row }) => (
        <ul className='text-align-center '>
          <li className="d-flex gap-3">
            <a href="#" className="view"onClick={() => {
                handleShow(); 
                setselectData(row.original);
              }} >
                <Pencil className="wh-20 flex-shrink-0 cursor-pointer" />
              </a>
          <a href="#" className="view" onClick={()=>handleDeleteConfirmation(row?.original?.id)}>
                <Trash2 className="wh-20 flex-shrink-0 cursor-pointer" />
              </a>
           
          </li>
        </ul>
      )
      },
    ], []);
    const handleDeleteConfirmation = (deleteId) => {
      setConfirmationState(true);
      setDeleteId(deleteId);
    };
  const handleDelete=()=>{
    try {
      mutation.mutate({
        method: "delete",
        url: `${ApiEndpoints.Package}`,
        params: { id: deleteId }, 
        key:'package',
      });
    } catch (error) {
      console.log(error)
    }}
      const handleSubmit = (values, actions) => {
        // console.log("values...............................",values)
        // return 
        try {
          const apiurl = ApiEndpoints.Package;
          mutation.mutate({
              method: "post",
              url: apiurl,
              values: { ...values },
              key: "package",
              next: () => {
                // console.log("next called")
                handleClose(); 
                actions.resetForm()
                actions.setSubmitting(false)
                setdata(null)
              },
          },       { onError: (error) => {
            actions.setSubmitting(false); 
          },}
        );
        } catch (error) {
          console.log(error)
          actions.setSubmitting(false); 
        }
       
      };
  return (
    <>
     (
      <div className={`contents  ${mobileSide ? "expanded" : ""}`}>
        <div className="demo2 mb-15 t-thead-bg">
          <div className="container-fluid">
            <div className="row mt-20">
              <div className="col-xxl-8 mb-25">
                <div className="card border-0 px-25">
                  <div className="card-header px-0 border-0">
                    <h6>Packages</h6>
                    <div className="card-extra">
                        <ul
                          className="card-tab-links nav-tabs nav"
                          role="tablist"
                        >
                          <li>
                            <a
                              href="#t_selling-month333"
                              data-bs-toggle="tab"
                              id="t_selling-month333-tab"
                              role="tab"
                              aria-selected="true"
                              className='active'
                              onClick={()=>
                              {handleShow(); 
                                setselectData('')}
                              }
                            >
                              Add New +
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="card-body p-0">
                      <div className="tab-content">
                        <div
                          className="tab-pane fade active show"
                          id="t_selling-today222"
                          role="tabpanel"
                          aria-labelledby="t_selling-today222-tab"
                        >
                          <Table data={packagelist??[]} columns={columns} />
                          
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Commonmodal show={show} handleClose={handleClose} title={"Package"} size="md">
          <Formik
      initialValues={{
        package_title: selectData?.package_title || "",
        city_id: selectData?.city || "",               
        destination_id: selectData?.destination || "", 
        amount: selectData?.amount || '',
        description: selectData?.description || "",
        terms_and_conditions: selectData?.terms_and_conditions || "",
        package_photo: selectData?.package_photo || [],

        ...(selectData?.id ? { id: selectData.id } : {})
        }}
      validate={values => {
        const errors = {};
        if (!values.package_title) errors.package_title = 'Package title is required';
        if (!values.city_id) errors.city_id = 'City is required';
        if (!values.destination_id) errors.destination_id = 'Destination is required';
        if (!values.amount) errors.amount = 'amount are required';
        // if (!values.description) errors.description = 'Description is required';
        if (!values.terms_and_conditions) errors.terms_and_conditions = 'Terms & Conditions are required';
        if (!values.package_photo || values.package_photo.length === 0) {
            errors.package_photo = 'At least one photo is required';
        }

        console.log("error",errors)
        return errors;
      }}
      onSubmit={(values,actions ) => {
        handleSubmit(values,actions)
      }}
    >
      {({
        handleSubmit,
        isSubmitting,
        resetForm,
        setSubmitting,
        setFieldValue,
        values
      }) => {
        console.log("values",values)
        return(
        <Form onSubmit={handleSubmit}>
         <Row>
         <div className="d-flex align-items-center ms-auto">
   
  </div>
         
            <FormikField name="package_title" label="Title" placeholder="package_title" colWidth={12}/>
            <SingleSelect
            name="city_id"
            label="city "
            placeholder="Select city"
            className="w-100"
            options={citylist??[]}
            getOptionLabel={(option) => `${option.name} - ${option.country?.country}`} // how to display
            getOptionValue={(option) => option.id}  
            colWidth={12} 
           
            variant="border"  
          /> 
            <SingleSelect
            name="destination_id"
            label="destination "
            placeholder="Select destination"
            className="w-100"
            options={citylist??[]}
            getOptionLabel={(option) => `${option.name} - ${option.country?.country}`} // how to display
            getOptionValue={(option) => option.id}  
            colWidth={12} 
           
            variant="border"  
          /> 
          <FormikField name="amount" label="Amount" type="number" colWidth={12} />
          <FormikField name="description" label="description" type='text' placeholder="description" colWidth={12}/>
          <FormikField name="terms_and_conditions" label="terms_and_conditions" type='text' placeholder="terms_and_conditions" colWidth={12}/>
             <div style={{ 
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",  // vertically center items
  // gap: "20px"            // space between items
}}>
  <FormikField
    name="package_photo"
    label="package_photo"
    type="file"
    imagetype='array'
    xs={4}
    colWidth={6}
    onChange={(event) => {
      const file = event.currentTarget.files[0];
      if (file) {
        setFieldValue("image", file.name);
      }
    }}
  />

  {Array.isArray(values?.package_photo) && values.package_photo.length > 0 && (
  <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginTop: "12px" }}>
    {values.package_photo.map((photo, index) => (
      <div
        key={index}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          width: "100px",
        }}
      >
        <img
          src={BaseUrl+photo}
          alt={`Photo ${index + 1}`}
          style={{
            width: "90px",
            height: "90px",
            objectFit: "cover",
            borderRadius: "8px",
            marginBottom: "5px",
          }}
        />
        <p
          style={{
            fontSize: "14px",
            color: "#555",
            cursor: "pointer",
            width: "100px",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            margin: 0,
          }}
          title={photo}
        >
          {photo}
        </p>
      </div>
    ))}
  </div>
)}

</div>
            

         </Row>
      
          <Modal.Footer>
          <Button variant="primary"  type="submit" disabled={isSubmitting}>
                Add package
              </Button>
             
        </Modal.Footer>
        </Form>
      )}}
    </Formik>
           
          </Commonmodal>
          <ConfirmationDialog
        open={confirmationState}
        onOpenChange={setConfirmationState}
        title="Confirm Deletion"
        message={"Are you sure you want to delete this package ?"}
        onConfirm={handleDelete}
        onCancel={setConfirmationState}
      />
        </div>
     )
    
     </>
   );
 }
