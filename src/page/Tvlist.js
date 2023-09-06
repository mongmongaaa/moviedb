import { Link } from "react-router-dom";
import React, { useState, useEffect,useRef } from "react";
import axios from "axios";


function Tvlist() {
  const [load, setLode] = useState([]);
  const [pageNum, setPageNum] = useState(1); // 현재 페이지 번호 상태

  // 검색 기능 불러와주는 것
  const [inputValue, setInputValue] = useState("");  //사용자가 입력한 검색어
  const [movies, setMovies] = useState([]); //API로부터 받아온 검색 결과 영화 목록

  const inputRef = useRef(null); // ref를 사용하여 input 요소를 추적.

  // "Load more" 버튼 클릭 시 페이지 번호를 증가시키는 함수
  function loadMore() {
    setPageNum((CPageNum) => CPageNum + 1);
  }

  useEffect(() => {
    // 데이터를 불러오는 함수
    const loademovie = async () => {
      const reponse = await axios.get(
        `https://api.themoviedb.org/3/tv/top_rated?api_key=f89a6c1f22aca3858a4ae7aef10de967&page=${pageNum}`
      );
      const newData = reponse.data.results; // 데이터를 배열 형태로 가져옴
      setLode([...load, ...newData]);
    };
    loademovie();
  }, [pageNum]);

  function searchMovies() {
   // 입력 양식에서 검색 버튼을 클릭했을 때 검색 실행
    const inputValue = inputRef.current.value;
    // API 요청을 보낼 URL

    if (inputValue){
      const apiUrl = `https://api.themoviedb.org/3/search/tv?query=${inputValue}&api_key=f89a6c1f22aca3858a4ae7aef10de967`;

      // Axios를 사용하여 API 요청 보내기
      axios.get(apiUrl).then((response) => {
        // API 응답에서 필요한 데이터 추출
        const searchResults = response.data.results;
        setMovies(searchResults);
      });

    }
 
  }

  useEffect(() => {
    // 입력 양식에서 검색 버튼을 클릭했을 때 영화 검색 실행
    if (inputValue) {
      searchMovies();
    }
  }, [inputValue]);
  return (
    <>
      <div>Movies</div>                                         {/*  ▽입력한 값을 가져오는애 */}
      <form  onSubmit={(e) => {e.preventDefault();setInputValue(inputRef.current.value); // 검색 버튼 클릭 시 검색어 업데이트searchMovies();
       }}>                                               {/*  ▽입력한 값을 참조하는애 여기서 쓸거다 ~ 느낌인가봄 */}
        <input type="text"placeholder="Enter Keyword"ref={inputRef} />
        <button type="submit">Search</button>
      </form>
      {inputValue ? (
        // 검색어가 입력된 경우 검색 결과를 표시
        <ul>
          {movies.map((movie) => (
            <Link key={movie.id} to={`/Detail/tv/${movie.id}`}>
              <li>
                <figure>
                  <img
                    src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                    alt={movie.title}
                  />
                  <figcaption>{movie.name}</figcaption>
                </figure>
              </li>
            </Link>
          ))}
        </ul>
      ) : (
        // 검색어가 입력되지 않은 경우 일반 영화 목록을 표시
        <ul>
          {load.map((popularMovies) => (
            <Link key={popularMovies.id} to={`/Detail/tv/${popularMovies.id}`}>
              <li>
                <figure>
                  <img
                    src={`https://image.tmdb.org/t/p/w200/${popularMovies.poster_path}`}
                  ></img>
                  <figcaption>{popularMovies.name}</figcaption>
                </figure>
              </li>
            </Link>
          ))}
        </ul>
      )}
      <button onClick={loadMore}>Load more</button>
    </>
  )
}

export default Tvlist