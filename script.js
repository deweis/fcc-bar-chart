/********** Fetch the data to be visualized **********/
let fccData = {};

fetch(
  'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json'
)
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    //console.log('data fetched');
    fccData = myJson; //JSON.stringify(myJson);
    //console.log(fccData.data[0]);
  });

/********** Create the chart **********/
const dataSet = [
  ['1947-01-01', 243.1],
  ['1947-04-01', 246.3],
  ['1947-07-01', 250.1],
  ['1947-10-01', 260.3],
  ['1948-01-01', 266.2],
  ['2014-10-01', 17615.9],
  ['2015-01-01', 17649.3],
  ['2015-04-01', 17913.7],
  ['2015-07-01', 18064.7]
];

const svgWidth = 600, // the width of the svg container
  svgHeight = 400, // the height of the svg container
  barPadding = 5, // the padding between the bars
  scalePadding = 50,
  barWidth = (svgWidth - 1.2 * scalePadding) / dataSet.length; // give equal width to every bar based on the container width;

/* configure the scales */
/*const xScale = d3
  .scaleLinear()
  .domain([0, d3.max(barChartData)])
  .range([0, svgWidth]);*/

const yScale = d3
  .scaleLinear()
  .domain([0, d3.max(dataSet, d => d[1])]) // The domain covers the set of input values
  .range([svgHeight - scalePadding, scalePadding / 2]); // The range covers the set of output values*/

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
  .attr('y', d => yScale(d[1])) // Positive values for y push the shape down from the origin point
  .attr('x', (d, i) => scalePadding + barWidth * i) // Positive values for x push the shape to the right
  .attr('width', barWidth - barPadding)
  .attr('height', d => svgHeight - yScale(d[1]) - scalePadding)
  .attr('fill', '#3949ab') //  The bar colors (Here: indigo darken-1)
  .attr('class', 'bar') // add hovering effect (managed in css)
  .append('title') // add tooltip
  .text(d => `${d[0]}: ${d[1]} Billion`);

const yAxis = d3.axisLeft(yScale);

svg
  .append('g')
  .attr('transform', 'translate(' + scalePadding + ',0)')
  .call(yAxis);
