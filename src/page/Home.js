import { Link } from "react-router-dom";
import { DataContext } from "../Context";
import React, { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

function Home() {
  const { topMovies, upcomingMovies, popularMovies } =
    useContext(DataContext);
  console.log(topMovies);
  return (
    <>
      <div>
        <Swiper spaceBetween={50} slidesPerView={1} >
          {popularMovies.map((popularMovies) => (
            <SwiperSlide key={popularMovies.id}>
              <div
                style={{
                  backgroundImage: `url('https://image.tmdb.org/t/p/original/${popularMovies.backdrop_path}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}  id="spot"
              >
                <div>
                  <ul id="text">
                    <li><h2 id="h2">{popularMovies.title}</h2></li>
                    <li> <b id="b">{popularMovies.overview}</b></li>
                    <li> <div>
                      {/* ▽ 이것의 id와 디테일페이지의 아이디가 같은건가? */}
                      <Link to={`/Detail/movie2/${popularMovies.id}`}>Watch Now</Link>
                      <button>Watch trailer</button>
                    </div></li>
                  </ul>
                  <div>
                  <img
                    src={`https://image.tmdb.org/t/p/w400/${popularMovies.poster_path}`}
                  />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div id="back">
      <div id="content">
        <article>
          <h2>Trending Movies <span>
            <Link to="/MovieLis">view more</Link>
          </span></h2>
          <Swiper spaceBetween={50} slidesPerView={7}>
            {popularMovies.map((popularMovies) => (
              <SwiperSlide key={popularMovies.id}>
                <Link to={`/Detail/movie2/${popularMovies.id}`}>
                  <figure>
                    <img
                      src={`https://image.tmdb.org/t/p/w200/${popularMovies.poster_path}`}
                    ></img>
                    <figcaption>{popularMovies.title}</figcaption>
                  </figure>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </article>

        <article>
          <h2>Top Rated Movies<span>
            <Link to="/MovieLis">view more</Link>
          </span></h2>
          
          <Swiper spaceBetween={50} slidesPerView={7}>
            {topMovies.map((topMovies) => (
              <SwiperSlide key={popularMovies.id}>
                <figure>
                  <img
                    src={`https://image.tmdb.org/t/p/w200/${topMovies.poster_path}`}
                  ></img>
                  <figcaption>{topMovies.title}</figcaption>
                </figure>
              </SwiperSlide>
            ))}
          </Swiper>
        </article>

        <article>
          <h2>Top Rated TV <span>
            <Link to="/MovieLis">view more</Link>
          </span></h2>
          <Swiper spaceBetween={50} slidesPerView={7}>
            {upcomingMovies.map((upcomingMovies) => (
              <SwiperSlide key={popularMovies.id}>
                <figure>
                  <img
                    src={`https://image.tmdb.org/t/p/w200/${upcomingMovies.poster_path}`}
                  ></img>
                  <figcaption>{upcomingMovies.title}</figcaption>
                </figure>
              </SwiperSlide>
            ))}
          </Swiper>
        </article>
      </div>
      </div>
    </>
  );
}

export default Home;
