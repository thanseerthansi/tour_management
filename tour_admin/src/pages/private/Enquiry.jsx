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
import { fetchEnquiry } from '../../api/Enquiry';

export default function Country() {
    const [pageLoading, setpageLoading] = useState(true);
  const { mobileSide} = useContext(ContextDatas);
  const {mutation} = useCustomMutation(); 
  
  
  const [show, setShow] = useState(false);
 const [selectData,setselectData] =useState('')
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [deleteId,setDeleteId]=useState(null)
  const {data:enquirylist}  = useFetchData('enquiry',fetchEnquiry);
  console.log("enquiry",enquirylist)

const [confirmationState,setConfirmationState]=useState(false)

 
  const columns = useMemo(() => [
    {
      header: "Sl.no",
      accessorKey: "",
      cell: (info) => info.row.index + 1,
    },
      {
        header: 'Name',
        accessorKey: 'name',
        cell:info=><strong >{info.getValue()}</strong>
      },
      {
        header: 'Email',
        accessorKey: 'email',
       
      },
      {
        header: 'Phone',
        accessorKey: 'phone',
       
      },
      {
        header: 'Package',
        accessorKey: 'related_package.name',
       
      },
      {
              header: 'Action',
              cell: ({ row }) => (
              <ul className='text-align-center '>
                <li className="d-flex gap-3">
                  {/* <a href="#" className="view"onClick={() => {
                      handleShow(); 
                      setselectData(row.original);
                    }} >
                      <Pencil className="wh-20 flex-shrink-0 cursor-pointer" />
                    </a> */}
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
        url: `${ApiEndpoints.Enquiry}`,
        params: { id: deleteId }, 
        key:'enquiry',
      });
    } catch (error) {
      console.log(error)
    }}
      const handleSubmit = (values, actions) => {
        // console.log("values...............................",values)
        // return 
        try {
          const apiurl = ApiEndpoints.Enquiry;
          mutation.mutate({
              method: "post",
              url: apiurl,
              values: { ...values },
              key: "enquiry",
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
                    <h6>Enquiry</h6>
                    {/* <div className="card-extra">
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
                      </div> */}
                    </div>
                    <div className="card-body p-0">
                      <div className="tab-content">
                        <div
                          className="tab-pane fade active show"
                          id="t_selling-today222"
                          role="tabpanel"
                          aria-labelledby="t_selling-today222-tab"
                        >
                          <Table data={enquirylist??[]} columns={columns} />
                          
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <ConfirmationDialog
        open={confirmationState}
        onOpenChange={setConfirmationState}
        title="Confirm Deletion"
        message={"Are you sure you want to delete this Enquiry ?"}
        onConfirm={handleDelete}
        onCancel={setConfirmationState}
      />
        </div>
     )
    
     </>
   );
 }
