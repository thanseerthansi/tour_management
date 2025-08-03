import { fetchBanner } from "../../api/Bannerapi";
import { fetchPackage } from "../../api/Tourapi";
import Carouselcard from "../../component/Carouselcard";
import PackageCard from "../../component/PackageCard";
import { useFetchData } from "../../service/useQueryFetchData";



const Home = () => {
  const {data:bannerlist} = useFetchData('banner',fetchBanner)
  const {data:packagelist}  = useFetchData('package',fetchPackage);
  console.log("bannerlist",bannerlist)
  console.log("packagelist",packagelist)
 

  return (
    <div className="container mx-auto px-4 py-8">
      <Carouselcard data = {bannerlist} />
      
      <section className="my-12">
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Packages</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packagelist?.length?packagelist.map(pkg => (
            <PackageCard key={pkg?.id} pkg={pkg} />
          )):[]}
        </div>
      </section>
    </div>
  );
};

export default Home;