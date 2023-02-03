import React from "react";
import useSWR from "swr";
import { fetcher, tmdbAPI } from "../../config";
import { Swiper, SwiperSlide } from "swiper/react";
import BannerSlide from "./BannerSlide";

function Banner() {
  const { data } = useSWR(tmdbAPI.getBanner("upcoming"), fetcher);
  const movies = data?.results || [];

  return (
    <section className="banner h-[500px] page-container mb-20 overflow-hidden">
      <Swiper grabCursor={"true"} slidesPerView={"auto"}>
        {movies.length > 0 &&
          movies.map((item) => (
            <SwiperSlide key={item.id}>
              <BannerSlide item={item}></BannerSlide>
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
}

export default Banner;
