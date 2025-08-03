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
import FormikCreatableMultiSelect from '../../components/FormikCreatableMultiSelect';
import { ApiEndpoints, BaseUrl } from '../../constants/Urls';
import { fetchBanner } from '../../api/Bannerapi';

export default function Country() {
    const [pageLoading, setpageLoading] = useState(true);
  const { mobileSide} = useContext(ContextDatas);
  const {mutation} = useCustomMutation(); 
  
  
  const [show, setShow] = useState(false);
 const [selectData,setselectData] =useState('')
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [deleteId,setDeleteId]=useState(null)
  const {data:bannerlist}  = useFetchData('banner',fetchBanner);
  console.log("bannerlist",bannerlist)

const [confirmationState,setConfirmationState]=useState(false)

 
  const columns = useMemo(() => [
    {
      header: "Sl.no",
      accessorKey: "",
      cell: (info) => info.row.index + 1,
    },
      {
        header: 'Title',
        accessorKey: 'title',
        cell:info=><strong >{info.getValue()}</strong>
      },
      {
        header: 'Banner Image',
        accessorKey: 'image',
        size:125,
        cell:({row})=>(
          row.original?.image?
        <img
          src={BaseUrl+row.original?.image}
          alt="image Icon"
          style={{
            width: '80px',
            height: '80px',
            marginBottom: '5px',
          }}
        />:"")
      },
     
//    {
//   header: 'Status',
//   accessorKey: 'status',
//   cell: ({ row }) => {
//     const isActive = row.original.status === true;
//     const handleToggle = () => {
//       // Handle switch toggle
//       const updatedStatus = !isActive;
//       console.log(`Toggling status for ID ${row.original.id} to ${updatedStatus}`);
//     };

//     return (
//       <Form.Check
//         type="switch"
//         id={`status-switch-${row.original.id}`}
//         checked={isActive}
//         onChange={handleToggle}
//         label={isActive ? 'Active' : 'Inactive'}
//       />
//     );
//   }
// },
     
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
        url: `${ApiEndpoints.Banner}`,
        params: { id: deleteId }, 
        key:'banner',
      });
    } catch (error) {
      console.log(error)
    }}
      const handleSubmit = (values, actions) => {
        // console.log("values...............................",values)
        // return 
        try {
          const apiurl = ApiEndpoints.Banner;
          mutation.mutate({
              method: "post",
              url: apiurl,
              values: { ...values },
              key: "banner",
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
                    <h6>Country&Cities</h6>
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
                          <Table data={bannerlist??[]} columns={columns} />
                          
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Commonmodal show={show} handleClose={handleClose} title={"Banner"} size="md">
          <Formik
      initialValues={{
        // jobId: selectData?.jobId||"",
        title: selectData?.title||"",
        image: selectData?.image||"",
        status: selectData?.status||"False",
        ...(selectData?.id ? { id: selectData.id } : {}),
        

      }}
      validate={values => {
        const errors = {};
        // if (!values.jobId) errors.jobId = 'Required';
        if (!values.title) errors.title = 'Title Required';
        if (!values.image) errors.image = 'image  Required';
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
         
            <FormikField name="title" label="Title" placeholder="Title" colWidth={12}/>
             <div style={{ 
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",  // vertically center items
  // gap: "20px"            // space between items
}}>
  <FormikField
    name="image"
    label="Image"
    type="file"
    xs={4}
    colWidth={6}
    onChange={(event) => {
      const file = event.currentTarget.files[0];
      if (file) {
        setFieldValue("image", file.name);
      }
    }}
  />

  {values?.image && (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        width: "100px",
      }}
    >
      <img
        src={BaseUrl+values.image}
        alt="PDF Icon"
        style={{
          width: "90px",
          height: "90px",
          marginBottom: "5px",
          marginTop: "12px",
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
        title={values?.image}
      >
        {values?.image}
      </p>
    </div>
  )}
</div>
            

         </Row>
      
          <Modal.Footer>
          <Button variant="primary"  type="submit" disabled={isSubmitting}>
                Add Banner
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
        message={"Are you sure you want to delete this Banner ?"}
        onConfirm={handleDelete}
        onCancel={setConfirmationState}
      />
        </div>
     )
    
     </>
   );
 }
