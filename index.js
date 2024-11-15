//Get the hero section background image
function displayBackground(response) {
  console.log(response.data.results[0].backdrop_path);
  let backdrop = response.data.results[0].backdrop_path;
  let backdropUrl = `https://image.tmdb.org/t/p/original${backdrop}`;
  console.log(backdropUrl);
  let backdropDiv = document.querySelector(".background");
  backdropDiv.style.backgroundImage = `url(${backdropUrl})`;
}

//API call to get the display picture from trending movies
const options = {
  method: "GET",
  url: "https://api.themoviedb.org/3/trending/movie/day",
  params: { language: "en-US" },
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYjllZjI1MTczNWRkY2VmYjhmNjhlMmFlOTgwZmJlMyIsIm5iZiI6MTczMTQyNTA1NS40NDQ0MDE1LCJzdWIiOiI2NzMyMjQ2ZWE3ZmRjODYwODc4OGIwZDUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.V3sZOi3jIN-mFIgTuZ2vkK4uBGQ76SN_N18VnYv-BTU",
  },
};

axios
  .request(options)
  .then(displayBackground)
  //.then(displayBackground)
  .catch((err) => console.error(err));

//((res) =>
// console.log(
//   ``
// )
