//Get the movie genre from genre list
function displayMovieGenre(genreCode) {
  return new Promise((resolve, reject) => {
    let genreTitle = [];
    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/genre/movie/list",
      params: { language: "en" },
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYjllZjI1MTczNWRkY2VmYjhmNjhlMmFlOTgwZmJlMyIsIm5iZiI6MTczMTQyNTA1NS40NDQ0MDE1LCJzdWIiOiI2NzMyMjQ2ZWE3ZmRjODYwODc4OGIwZDUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.V3sZOi3jIN-mFIgTuZ2vkK4uBGQ76SN_N18VnYv-BTU",
      },
    };

    axios
      .request(options)
      .then((res) => {
        let genres = res.data.genres;
        for (let i = 0; i < genreCode.length; i++) {
          for (let j = 0; j < genres.length; j++) {
            if (genreCode[i] === genres[j].id) {
              genreTitle.push(genres[j].name);
            }
          }
        }
        console.log(genreTitle);
        resolve(genreTitle);
      })
      .catch((err) => console.error(err));
  });
}

//Get the average user score in percentage
function calculateAveragePercentage(average) {
  let averagePercentage = (average / 10) * 100;
  averagePercentage = Math.floor(averagePercentage);
  let averagePercentageString = averagePercentage + "%";
  let colorClass = "";
  if (averagePercentage < 70) {
    colorClass = "yellow";
  } else {
    colorClass = "green";
  }
  return [averagePercentageString, colorClass];
  //return averagePercentage;
}

//Get year from the release date string
function getYear(date) {
  let dateString = new Date(date);
  let year = dateString.getFullYear();
  return year;
}

//Get the hero section background image

function showMovieDetails(data) {
  console.log(data);
  let movieName = data[0].title;
  let overview = data[0].overview;
  let releaseDate = data[0].release_date;
  let year = getYear(releaseDate);
  let voterAverage = data[0].vote_average;
  let averageVoterScore = calculateAveragePercentage(voterAverage);
  let movieGenreIds = data[0].genre_ids;
  let voterScoreDiv = document.querySelector(".score");
  voterScoreDiv.classList.add(averageVoterScore[1]);
  voterScoreDiv.innerHTML = averageVoterScore[0];
  let movieNameDiv = document.querySelector(".movie-name");
  let overviewDiv = document.querySelector(".overview");
  let releaseDateDiv = document.querySelector(".release-date");
  let movieGenreDiv = document.querySelector(".movie-genres");
  displayMovieGenre(movieGenreIds).then((genres) => {
    //movieGenreDiv.innerHTML = genres;
    genres.forEach((genre, index) => {
      const genreElement = document.createElement("span");
      genreElement.classList.add("bullet");
      genreElement.textContent = genre;
      movieGenreDiv.appendChild(genreElement);
    });
    overviewDiv.innerHTML = overview;
    movieNameDiv.innerHTML = movieName;
    releaseDateDiv.innerHTML = year;
  });
}
//Display background image for movie
function displayBackground(response) {
  console.log(response);
  console.log(response.data.results[0].backdrop_path);
  let backdrop = response.data.results[0].backdrop_path;
  let posterImage = response.data.results[0].poster_path;
  let backdropUrl = `https://image.tmdb.org/t/p/original${backdrop}`;
  let posterUrl = `https://image.tmdb.org/t/p/original${posterImage}`;
  console.log(backdropUrl);
  let backdropDiv = document.querySelector(".background");
  backdropDiv.style.backgroundImage = `url(${backdropUrl})`;
  let posterImageDiv = document.querySelector(".poster");
  posterImageDiv.style.backgroundImage = `url(${posterUrl})`;
  showMovieDetails(response.data.results);
}

//Display popular movie list
function displayPopularMovie(response) {
  let popularMovieList = "";

  for (let i = 0; i < 10; i++) {
    let posterPath = response.data.results[i].poster_path;
    let posterUrl = `https://image.tmdb.org/t/p/original${posterPath}`;
    let movieName = response.data.results[i].title;
    let releaseDate = response.data.results[i].release_date;
    let yearOfRelease = getYear(releaseDate);
    let averageVoterScore = response.data.results[i].vote_average;
    let averagePercentage = calculateAveragePercentage(averageVoterScore);
    popularMovieList += `<div class=movie-card>
        <div class="popularmovie-image"><img src="${posterUrl}" alt="${movieName}" width="250" height="350" object-fit= "cover";></div>
        <div class="overlay"></div>
        <div class="popularmovie-rating">
            <span class="score ${averagePercentage[1]}" id="scoreColor"> ${averagePercentage[0]}</span>
        </div>
        <div class="movie-name"> ${movieName}</div>
        <div class="release-date">${yearOfRelease}</div>
        </div>`;
  }
  let popularMovieDiv = document.querySelector(".movie-list");
  popularMovieDiv.innerHTML = popularMovieList;
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

//API call to get the popular movie list
const options2 = {
  method: "GET",
  url: "https://api.themoviedb.org/3/movie/popular",
  params: { language: "en-US", page: "1" },
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYjllZjI1MTczNWRkY2VmYjhmNjhlMmFlOTgwZmJlMyIsIm5iZiI6MTczMTQyNTA1NS40NDQ0MDE1LCJzdWIiOiI2NzMyMjQ2ZWE3ZmRjODYwODc4OGIwZDUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.V3sZOi3jIN-mFIgTuZ2vkK4uBGQ76SN_N18VnYv-BTU",
  },
};

axios
  .request(options2)
  .then(displayPopularMovie)
  .catch((err) => console.error(err));

const options3 = {
  method: "GET",
  url: "https://api.themoviedb.org/3/discover/movie",
  params: {
    include_adult: "false",
    include_video: "false",
    language: "en-US",
    sort_by: "popularity.desc",
    "vote_average.gte": "7",
    with_genres: "28",
  },
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYjllZjI1MTczNWRkY2VmYjhmNjhlMmFlOTgwZmJlMyIsIm5iZiI6MTczMTQyNTA1NS40NDQ0MDE1LCJzdWIiOiI2NzMyMjQ2ZWE3ZmRjODYwODc4OGIwZDUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.V3sZOi3jIN-mFIgTuZ2vkK4uBGQ76SN_N18VnYv-BTU",
  },
};

axios
  .request(options3)
  .then((res) => console.log(res.data))
  .catch((err) => console.error(err));
