/* Fetch the data to be visualized */
let fccData = {};

fetch(
  'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json'
)
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    console.log('data fetched');
    fccData = myJson; //JSON.stringify(myJson);
    console.log(fccData.data[0]);
  });
