/**************************************************************************************************
  Simple Example on creating p elements based on a dataset
**************************************************************************************************/
const dataset = [1, 2, 3, 4, 5];

/* Create a p tag for each item in dataset */
d3.select('#pExample') // select the body element
  .selectAll('p') // select all p tags -> will return an empty selection as no p elements available
  .data(dataset) // will put the data in waiting state for further processing
  .enter() // will take the data items one by one and perform further operations on them
  .append('p') // appends a p item for each data item
  .text(d => d); // binds respective text inside each p item (in this case the dataitem itself)

/**************************************************************************************************
  Example on creating a simple bar chart
**************************************************************************************************/
const barChartData = [80, 100, 56, 120, 180, 30, 40, 120, 160], // the dataset
  svgWidth = 500, // the width of the svg container
  svgHeight = 300, // the height of the svg container
  barPadding = 5, // the padding between the bars
  barWidth = svgWidth / barChartData.length; // give equal width to every bar based on the container width

/* configure the svg container */
const svg = d3
  .select('svg')
  .attr('width', svgWidth)
  .attr('height', svgHeight);

/* configure the scales */
const xScale = d3
  .scaleLinear()
  .domain([0, d3.max(barChartData)])
  .range([0, svgWidth]);

const yScale = d3
  .scaleLinear()
  .domain([0, d3.max(barChartData) * 1.1])
  .range([0, svgHeight]);

/* configure the axes */
const x_axis = d3.axisBottom().scale(xScale);
const y_axis = d3.axisLeft().scale(yScale);

svg
  .append('g') // append a group element
  .attr('transform', 'translate(50, 10)') // translate(toRight, toDown)
  .call(y_axis);

const xAxisTranslate = svgHeight - 20;

svg
  .append('g') // append a group element
  .attr('transform', `translate(50, ${xAxisTranslate})`)
  .call(x_axis);

/* configure the chart */
const barChart = svg
  .selectAll('rect') // bars are basically nothing else than rectangles (returns an empty selection here)
  .data(barChartData) // call the data method and provide it the dataset. I.e. will put the data in waiting state for further processing
  .enter() // will put the data in waiting state for further processing. It takes the data from the waiting state and performs the following operations on each data item.
  .append('rect') // appends a rectangle inside the svg container
  .attr('y', d => svgHeight - yScale(d)) // the upper left point of the bar
  .attr('height', d => yScale(d)) // the height to fill the bar
  .attr('width', barWidth - barPadding) // the width plus some padding between the bars
  .attr('transform', (d, i) => `translate(${[barWidth * i, 0]})`); // to put the bars next to each other

/* configure the labels */
const text = svg
  .selectAll('text')
  .data(barChartData)
  .enter()
  .append('text')
  .text(d => d)
  .attr('y', d => svgHeight - yScale(d) - 2)
  .attr('x', (d, i) => barWidth * i);

// Proceed on 11:16 of https://www.youtube.com/watch?v=C4t6qfHZ6Tw
