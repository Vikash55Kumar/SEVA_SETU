import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import img1 from '../../assets/img1.png';
import img2 from '../../assets/img2.png';
import img3 from '../../assets/img3.png';
import img4 from '../../assets/img4.png';

import './slider.css';

export default function Slider() {
  return (
    <div className="swap">
      <Swiper
        pagination={{ type: 'fraction' }}
        navigation={true}
        autoplay={{
          delay: 4000, // Slide delay in milliseconds (3 seconds here)
          disableOnInteraction: false, // Continue autoplay after user interaction
        }}
        modules={[ Autoplay]}
        className="mySwiper"
      >
        {[img1, img2, img3, img4].map((img, index) => (
          <SwiperSlide key={index}>
            <img src={img} alt={`Slide ${index + 1}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
