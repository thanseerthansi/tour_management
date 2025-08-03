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
import { fetchPackage, fetchSchedule } from '../../api/Tourapi';
import SingleSelect from '../../components/SingleSelect';
import { fetchcity } from '../../api/Countryapi';
import { PATH } from '../../constants/Path';
import {  useParams } from 'react-router-dom';

export default function Country() {
    const [pageLoading, setpageLoading] = useState(true);
  const { mobileSide} = useContext(ContextDatas);
  const {mutation} = useCustomMutation(); 
  const [show, setShow] = useState(false);
 const [selectData,setselectData] =useState('')
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [deleteId,setDeleteId]=useState(null)
  const params = useParams()
  console.log("params",params)
  const package_id = params.id
  const {data:schedulelist}  = useFetchData('schedule',fetchSchedule,{package:package_id});
  
 

const [confirmationState,setConfirmationState]=useState(false)

 
  const columns = useMemo(() => [
   { header: 'Sl.no', accessorKey: '', cell: info => info.row.index + 1 },
    { header: 'Title', accessorKey: 'schedule_title' },
    { header: 'From', accessorKey: 'from_date' },
    { header: 'To', accessorKey: 'to_date' },
    // { header: 'Amount', accessorKey: 'amount' },
    {
      header: 'Photo', accessorKey: 'schedule_photo',
      cell: ({ row }) => (
        row.original?.schedule_photo?.map((photo, index) => (
          <img key={index} src={BaseUrl + photo} alt="img" style={{ width: '50px', height: '50px' }} />
        ))
      )
    },
    {
      header: 'Actions',
      cell: ({ row }) => (
        <div className="d-flex gap-2">
          <Pencil onClick={() => { setShow(true); setselectData(row.original); }} />
          <Trash2 onClick={() => handleDeleteConfirmation(row.original.id)} />
        </div>
      )
    }
    ], []);
    const handleDeleteConfirmation = (deleteId) => {
      setConfirmationState(true);
      setDeleteId(deleteId);
    };
  const handleDelete=()=>{
    try {
      mutation.mutate({
        method: "delete",
        url: `${ApiEndpoints.Schedule}`,
        params: { id: deleteId }, 
        key:'schedule',
      });
    } catch (error) {
      console.log(error)
    }}
      const handleSubmit = (values, actions) => {
        // console.log("values...............................",values)
        // return 
        try {
          const apiurl = ApiEndpoints.Schedule;
          mutation.mutate({
              method: "post",
              url: apiurl,
              values: { ...values },
              key: "schedule",
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
                    <h6>Schedules</h6>
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
                          <Table data={schedulelist??[]} columns={columns} />
                          
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Commonmodal show={show} handleClose={handleClose} title={"schedule"} size="md">
          <Formik
      initialValues={{
            schedule_title: selectData?.schedule_title || '',
            package:package_id||"",
            from_date: selectData?.from_date || '',
            to_date: selectData?.to_date || '',
            // amount: selectData?.amount || '',
            schedule_description: selectData?.schedule_description || '',
            schedule_photo: selectData?.schedule_photo || [],
            ...(selectData?.id ? { id: selectData.id } : {})
        }}
      validate={values => {
        const errors = {};
        if (!values.schedule_title) errors.schedule_title = 'schedule title is required';
        if (!values.package) errors.package = 'package is required';
        if (!values.from_date) errors.from_date = 'from_date is required';
        if (!values.to_date) errors.to_date = 'to_date is required';
        // if (!values.amount) errors.amount = 'amount are required';
        // if (!values.package_photo || values.package_photo.length === 0) {
        //     errors.package_photo = 'At least one photo is required';
        // }

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
         
           <FormikField name="schedule_title" label="Title" colWidth={12} />
                <FormikField name="from_date" type="date" label="From Date" colWidth={6} />
                <FormikField name="to_date" type="date" label="To Date" colWidth={6} />
                {/* <FormikField name="amount" label="Amount" type="number" colWidth={12} /> */}
                <FormikField name="schedule_description" label="Description" type="textarea" colWidth={12} />

                {/* FILE UPLOAD */}
                <FormikField
                  name="schedule_photo"
                  label="Photos"
                  type="file"
                  imagetype="array"
                  colWidth={12}
                  onChange={(e) => {
                    const file = e.currentTarget.files[0];
                    if (file) {
                      // Convert to array or use custom image upload handler
                      setFieldValue("schedule_photo", [...values.schedule_photo, file.name]);
                    }
                  }}
                />
                <div className="d-flex flex-wrap gap-2">
                  {values.schedule_photo?.map((img, i) => (
                    <img key={i} src={BaseUrl + img} alt="img" width="60" height="60" />
                  ))}
                </div>
         </Row>
      
          <Modal.Footer>
          <Button variant="primary"  type="submit" disabled={isSubmitting}>
                Add Schedule
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
        message={"Are you sure you want to delete this schedule ?"}
        onConfirm={handleDelete}
        onCancel={setConfirmationState}
      />
        </div>
     )
    
     </>
   );
 }
