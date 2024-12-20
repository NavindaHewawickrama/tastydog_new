"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import './style.css';

import { EffectFade, Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";

const Slider = () => {
  return (
    <Swiper
      spaceBetween={20}
      effect={"fade"}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: true,
      }}
      pagination={{
        clickable: true,
      }}
      modules={[EffectFade, Autoplay, Pagination]}
      className="xl:max-w-[1500px] lg:max-w-[1200px] md:max-w-[750px] max-w-[250px] xl:h-[500px] lg:h-[500px] md:h-[500px] h-[200px] rounded-xl"
    >
      <SwiperSlide className="w-[1800px] h-[500px]">
        <Image
          src="/sliderImage.png"
          alt="sliderImg"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1800px) 50vw, 33vw"
          className="rounded-xl"
        />
      </SwiperSlide>
      <SwiperSlide className="w-[1800px] h-[500px]">
        <Image
          src="/foodBanner.webp"
          alt="sliderImg"
          fill
          className="rounded-xl h-full"
        />
      </SwiperSlide>
      <SwiperSlide className="w-[1200px] h-[500px]">
        <Image
          src="/sliderDummy2.jpg"
          alt="sliderImg"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 768px) 50vw, 33vw"
          className="rounded-xl h-full"
        />
      </SwiperSlide>
      <SwiperSlide className="w-[1200px] h-[300px]">
        <Image
          src="/foodMenu.jpg"
          alt="sliderImg"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 768px) 50vw, 33vw"
          className="rounded-xl h-full"
        />
      </SwiperSlide>
    </Swiper>
  );
};

export default Slider;
