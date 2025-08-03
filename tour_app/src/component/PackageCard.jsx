import { Link } from 'react-router-dom';
import { PATH } from '../constants/Path';
import { BaseUrl } from '../constants/Urls';

const PackageCard = ({ pkg }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100">
      <div className="relative">
        <img 
          src={BaseUrl + pkg?.package_photo[0]??""} 
          alt={pkg?.package_title??"1"} 
          className="w-full h-56 object-cover transition-transform duration-300 hover:scale-105"
        />
        <span className="absolute top-3 right-3 bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded-full shadow-md">
          {pkg?.city?.name??""} → {pkg?.destination?.name??""}
        </span>
      </div>

      <div className="p-2">
        <h3 className="text-2xl font-semibold mb-1 text-gray-800">{pkg?.package_title??""}</h3>
        <p className="text-gray-600 text-sm mb-2 line-clamp-3">{pkg?.description??""}</p>
         {/* <Link 
            to={PATH.Package + pkg.id}
            className="inline-block bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            View Details
          </Link> */}
        <div className="flex justify-between items-center mt-4">
          <Link 
            to={PATH.SCHEDULE +'/'+ pkg?.id}
            className="inline-block bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            View Details
          </Link>
          {/* Optional badge or amount display */}
          <span className="text-sm text-green-600 font-medium">₹{pkg?.amount}</span>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;
