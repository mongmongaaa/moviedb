import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const DataContext = createContext();

function Context({ children }) {
  const [topMovies, setTopMovies] = useState([]); 
  const [upcomingMovies, setUpcomingMovies] = useState([]); 
  const [popularMovies, setPopularMovies] = useState([]); 
/*   const [detailMovies, setdetailMovies] = useState([]); 
  const [did, setDid] = useState(null); */
  
// 여기에 getTopMovie() 에서 가져온 데이터를 저장하는 장소

  const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    params: {
      api_key: 'f89a6c1f22aca3858a4ae7aef10de967'
    }
  });
// 주소 베이스 잡는 놈 


  //페이지가 열렸을때 바로 불러와지지 않는데 데이터로드가 될 때 딱 1번 실행하는놈 
  useEffect(() => { 
    function getTopMovie() {
      return instance.get('/movie/top_rated');
    }
    function getUpcomingMovie() {
      return instance.get('/movie/upcoming');
    }
    function getPopularMovie() {
      return instance.get('/movie/popular');
    }
  
    //이건 이 데이터들 주소야 !!! 여기서  불러와!!!
    
    
    //이게 설마 promise냐 ? //https://sudo-minz.tistory.com/28 설명글 
    axios.all([getTopMovie(), getUpcomingMovie(), getPopularMovie()])
      .then(function (results) {
        const top = results[0];
        const upcoming = results[1];
        const popular = results[2];
        setTopMovies(top.data.results); // 배열 데이터로 업데이트
        setUpcomingMovies(upcoming.data.results); // 배열 데이터로 업데이트
        setPopularMovies(popular.data.results); // 배열 데이터로 업데이트
      });
      // 데이터 정보 싹 다 불러와!!!!

  }, []);

                     
/*   useEffect(() => {
    function getdetailMovie(did){
      return instance.get(`/movie/${did}`);
    }
    getdetailMovie(did)  // did라는 상태변수의 변화를 감지하고 그에 따라 영화의 세부정보를 가져옴 
      .then((res) => {
        setdetailMovies(res.did); 이게 안되던 이유는  res.data.did 라고 해야했나?
      })
      .catch((error) => {
        console.error("Error fetching movie details:", error);
      });
  }, [did]); //did 가 1번 실행할때  */

  //did는 상태 변수로, 해당 컴포넌트의 코드 어딘가에서 setDid를 (디테일페이지)
  // 통해 값이 변경될 때마다 useEffect 내부의 콜백 함수가 다시 실행됩니다. 이로써 did 값이 변경될 때마다 아래의 로직이 수행
 
  console.log(topMovies);


  // 어떠한 데이터를 계속해서 끌고다닐 필요가 있는가?
  //데이터를 한 번 받아 놓고 데이터를 계속 수정해가면서 뿌리는게 효율적인것인가 ?
  //페이지에 데이터를 한번 뿌려놓고 그걸 계속 쓰는게 좋은지 고민을 해야함 
  


  return ( 
    <DataContext.Provider value={{ topMovies, upcomingMovies, popularMovies/* , detailMovies, setDid  */}}>
      {children} 
    </DataContext.Provider> 
  ); 
}

export default Context;