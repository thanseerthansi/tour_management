import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useFetchData } from '../../service/useQueryFetchData';
import { fetchSchedule } from '../../api/Tourapi';
import { BaseUrl } from '../../constants/Urls';
import { PATH } from '../../constants/Path';

export default function Schedules() {
    const params = useParams()
    const package_id = params.id
    const navigate = useNavigate();
    const {data:schedulelist}  = useFetchData('schedule',fetchSchedule,{package:package_id});
    console.log("schedulelist",schedulelist )
  return (
    <div className="container mx-auto px-4 py-8">
      
      <section className="my-12">
        <h2 className="text-3xl font-bold mb-8 text-center"> {schedulelist?.[0]?.package_details?.package_title??""} </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {schedulelist?.length?schedulelist.map(pkg => (
            <div key={pkg?.id} className='cursor-pointer' onClick={()=>navigate(PATH.PACKAGE_DETAILS+'/'+pkg.id)}>
             <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100">
      <div className="relative">
        <img 
          src={BaseUrl + pkg.schedule_photo?.[0]??""} 
          alt={pkg?.package_details?.package_title} 
          className="w-full h-56 object-cover transition-transform duration-300 hover:scale-105"
        />
        <span className="absolute top-3 right-3 bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded-full shadow-md">
          {pkg?.from_date} → {pkg?.to_date}
        </span>
      </div>

      <div className="p-2">
        <h3 className="text-2xl font-semibold mb-1 text-gray-800">{pkg?.package_details?.package_title}</h3>
        <p className="text-gray-600 text-sm mb-2 line-clamp-3">{pkg?.package_details?.description}</p>
         {/* <Link 
            to={PATH.Package + pkg.id}
            className="inline-block bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            View Details
          </Link> */}
        <div className="flex justify-between items-center mt-4">
          
          {/* Optional badge or amount display */}
          <span className="text-sm text-green-600 font-medium">₹{pkg?.package_details?.amount??""}</span>
          <span className="text-sm text-blue-600 font-medium">{pkg?.schedule_title??""}</span>
        </div>
      </div>
    </div>
            </div>
          )):[]}
        </div>
      </section>
    </div>
  )
}
