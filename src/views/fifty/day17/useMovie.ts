export const useMovie = () => {
  const API_URL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1";
  const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
  const SEARCH_API =
    'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="';

  async function getMovies(url: string = API_URL) {
    const res = await fetch(url);
    const data = await res.json();
    return data.results;
  }

  function getClassByRate(rate: number) {
    if (rate >= 8) return "text-green-500";
    else if (rate >= 5) return "text-orange-400";
    else return "text-rose-600";
  }

  return {
    API_URL,
    IMG_PATH,
    SEARCH_API,
    getMovies,
    getClassByRate,
  };
};
