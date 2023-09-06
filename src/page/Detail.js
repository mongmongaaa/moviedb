import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from 'axios';

function Detail() {
 
  const [movie, setMovie] = useState(null);
  const { type, id } = useParams();

  useEffect(() => {
    // API 호출을 수행하여 영화 상세 정보를 가져오는 부분 
                                                     //movie2 와 이름이 같을 경우 movie가 나오고 아닐경우 tv가 나옴 
    axios.get(`https://api.themoviedb.org/3/${type === "movie2" ? "movie" : "tv"}/${id}?api_key=f89a6c1f22aca3858a4ae7aef10de967`)
      .then(response => {
        setMovie(response.data);

        // 주소를 잡아온 걸 setMovie에 담음 

        //Response Object Structure: API 응답 객체는 일반적으로 data라는 프로퍼티를 가지고 있습니다.
        // 따라서 response.data를 사용하여 실제 API 응답 데이터에 접근할 수 있습니다. 
      })
      .catch(error => {
        console.error('Error fetching movie data:', error);
      });
  }, [id]);// id가 바뀔때마다 실행 

  if (!movie) {
    return <p>Loading...</p>;
  }

  const genres = movie.genres.map(genre => genre.name); // 장르를 map으로 돌린 것 // 이걸 담을 수도 있규나,,

  return (
    <div>
      <div style={{
                  backgroundImage: `url('https://image.tmdb.org/t/p/original/${movie.backdrop_path}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}>
        <img src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}></img>
        <div>
          <div>
            <h2>{movie.original_title}</h2>
            <div>{genres.join(" ")}</div>
            <p>{movie.overview}</p>
          </div>
          <ul>
            <li>
              <h2>Casts</h2>
              <img></img>
              <p>Jason Statham</p>
            </li>
          </ul>
        </div>
      </div>
      <article>
        <h2>Extended Preview</h2>
          <iframe></iframe>
      </article>
    </div>
    
  );
}

export default Detail;
