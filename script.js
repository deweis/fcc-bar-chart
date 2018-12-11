/********** Fetch the data to be visualized **********/
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
    //console.log(fccData.data[0]);
  });

/********** Create the chart **********/
const dataSet = [
  ['1947-01-01', 243.1],
  ['1947-04-01', 246.3],
  ['1947-07-01', 250.1],
  ['1947-10-01', 260.3],
  ['1948-01-01', 266.2]
];

const dataSetValues = dataSet.map(x => x[1]);
console.log(dataSetValues);

const dataSetText = dataSet.map(x => x[0]);
console.log(dataSetText);

const svgWidth = 500, // the width of the svg container
  svgHeight = 300, // the height of the svg container
  barPadding = 5, // the padding between the bars
  barWidth = svgWidth / dataSet.length; // give equal width to every bar based on the container width;

/* configure the svg container */
const svg = d3
  .select('svg')
  .attr('width', svgWidth)
  .attr('height', svgHeight);

/* configure the chart */
const barChart = svg
  .selectAll('rect')
  .data(dataSet)
  .enter()
  .append('rect') // The origin point of (0, 0) is in the upper-left corner.
  .attr('y', d => svgHeight - d[1]) // Positive values for y push the shape down from the origin point
  .attr('x', (d, i) => barWidth * i) // Positive values for x push the shape to the right
  .attr('width', barWidth - barPadding)
  .attr('height', d => d[1])
  .attr('fill', '#3949ab') //  The bar colors (Here: indigo darken-1)
  .attr('class', 'bar') // add hovering effect (managed in css)
  .append('title') // add tooltip
  .text(d => `${d[0]}: ${d[1]} Billion`);

/*
.selectAll('rect') // bars are basically nothing else than rectangles (returns an empty selection here)
.data(barChartData) // call the data method and provide it the dataset. I.e. will put the data in waiting state for further processing
.enter() // will put the data in waiting state for further processing. It takes the data from the waiting state and performs the following operations on each data item.
.append('rect') // appends a rectangle inside the svg container
.attr('y', d => svgHeight - yScale(d)) // the upper left point of the bar
.attr('height', d => yScale(d)) // the height to fill the bar
.attr('width', barWidth - barPadding) // the width plus some padding between the bars
.attr('transform', (d, i) => `translate(${[barWidth * i, 0]})`); // to put the bars next to each other
*/
