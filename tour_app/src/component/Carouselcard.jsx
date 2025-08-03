import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BaseUrl } from '../constants/Urls';

function Carouselcard({ data }) {
  
  return (
    <>
      {data?.length ? (
        <Carousel>
          {data.map((item, index) => (
            <Carousel.Item key={index}>
              <img
                className="d-block w-100"
                src={BaseUrl+item.image || "https://via.placeholder.com/800x400"}
                alt={`Slide ${index + 1}`}
              />
              <Carousel.Caption>
                <h3>{item.title || `Slide ${index + 1}`}</h3>
                <p>{item.description || ''}</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      ) : null}
    </>
  );
}

export default Carouselcard;
