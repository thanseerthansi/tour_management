import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useFetchData } from '../../service/useQueryFetchData';
import { fetchSchedule } from '../../api/Tourapi';
import { ApiEndpoints, BaseUrl } from '../../constants/Urls';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useCustomMutation } from '../../service/useCustomMutation';
import { PATH } from '../../constants/Path';

export default function PackageDetails() {
  const { id } = useParams();
  const { data: schedulelist } = useFetchData('schedulelist', fetchSchedule, { id });
  const {mutation} = useCustomMutation(); 
  const navigate = useNavigate();

  const packageData = schedulelist?.[0];
  console.log("packagedata",packageData)
  if (!packageData) return <div className="text-center py-10">Loading...</div>;

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
     try {
          const apiurl = ApiEndpoints.Enquiry;
          mutation.mutate({
              method: "post",
              url: apiurl,
              values: { ...values },
              key: "enquiry",
              next: () => {
                // console.log("next called")
                resetForm();
                setSubmitting(false);
                navigate(PATH.SUCCESS)

              },
          },       { onError: (error) => {
            setSubmitting(false); 
          },}
        );
        } catch (error) {
          console.log(error)
          setSubmitting(false); 
        }
    
  };

  const enquirySchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Enter a valid email address').required('Email is required'),
    phone: Yup.string().matches(/^[0-9]+$/, 'Must be digits').min(10).required(),
    message: Yup.string(),
    related_package_id: Yup.string().required(),
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Image and Title */}
     <div className="relative w-full mb-6">
  <Carousel fade controls indicators className="rounded-xl overflow-hidden shadow-lg">
    {packageData?.schedule_photo?.map((photo, index) => (
      <Carousel.Item key={index}>
        <img
          className="d-block w-full h-64 object-cover"
          src={BaseUrl + photo}
          alt={`Slide ${index}`}
        />
        <Carousel.Caption className="bg-black bg-opacity-50 rounded px-3 py-2">
          <h3 className="text-white text-xl font-bold">
            {packageData?.package_details?.package_title}
          </h3>
        </Carousel.Caption>
      </Carousel.Item>
    ))}
  </Carousel>
</div>

      {/* Details Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Package Description</h2>
            <p className="text-gray-600">{packageData.package_details.description}</p>
          </div>

          {/* Terms */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Terms & Conditions</h2>
            <p className="text-gray-600">{packageData.package_details.terms_and_conditions}</p>
          </div>

          {/* Schedule Table */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Schedule</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-left text-gray-700">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2">Title</th>
                    <th className="px-4 py-2">Dates</th>
                    <th className="px-4 py-2">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="px-4 py-2">{packageData.schedule_title}</td>
                    <td className="px-4 py-2">
                      {packageData.from_date} to {packageData.to_date}
                    </td>
                    <td className="px-4 py-2">₹{packageData.package_details.amount}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Enquiry Form */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-6 text-gray-800">Enquiry Form</h2>

          <Formik
            initialValues={{
              name: '',
              email: '',
              phone: '',
              message: '',
              related_package_id: packageData.id,
            }}
            validationSchema={enquirySchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium">Full Name *</label>
                  <Field name="name" className="w-full p-2 mt-1 border rounded-md" />
                  <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium">Email *</label>
                  <Field name="email" type="email" className="w-full p-2 mt-1 border rounded-md" />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                </div>

                <div>
                  <label className="block text-sm font-medium">Phone Number *</label>
                  <Field name="phone" type="tel" className="w-full p-2 mt-1 border rounded-md" />
                  <ErrorMessage name="phone" component="div" className="text-red-500 text-sm" />
                </div>

                <div>
                  <label className="block text-sm font-medium">Schedule</label>
                  <Field
                    as="select"
                    name="related_package_id"
                    className="w-full p-2 mt-1 border rounded-md"
                  >
                    <option value={packageData.id}>
                      {packageData.schedule_title} ({packageData.from_date} to {packageData.to_date})
                    </option>
                  </Field>
                  <ErrorMessage name="scheduleId" component="div" className="text-red-500 text-sm" />
                </div>

                <div>
                  <label className="block text-sm font-medium">Message *</label>
                  <Field
                    as="textarea"
                    name="message"
                    rows={4}
                    className="w-full p-2 mt-1 border rounded-md"
                  />
                  <ErrorMessage name="message" component="div" className="text-red-500 text-sm" />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Enquiry'}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
