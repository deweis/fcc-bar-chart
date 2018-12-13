/********** Fetch the data to be visualized **********/
fetch(
  'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json'
)
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    updateChart(myJson.data);
  });

/********** Create the chart *********/
function updateChart(dataSet) {
  const svgWidth = 940, // the width of the svg container
    svgHeight = 600, // the height of the svg container
    barPadding = 1, // the padding between the bars
    scalePadding = 50,
    barWidth = (svgWidth - 1.2 * scalePadding) / dataSet.length; // give equal width to every bar based on the container width;

  /* configure the scales */
  const xScale = d3
    .scaleLinear()
    .domain([
      d3.min(dataSet, d => d[0].substr(0, 4)),
      d3.max(dataSet, d => d[0].substr(0, 4))
    ])
    .range([0, svgWidth - 1.4 * scalePadding]);

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

  /* Configure the axis */
  const yAxis = d3.axisLeft(yScale);
  const xAxis = d3.axisBottom(xScale).tickFormat(d3.format(''));

  /* Place the y-axis */
  svg
    .append('g')
    .attr('id', 'y-axis')
    .attr('transform', 'translate(' + scalePadding + ',0)')
    .call(yAxis);

  /* Place the x-axis */
  svg
    .append('g')
    .attr('id', 'x-axis')
    .attr(
      'transform',
      'translate(' + scalePadding + ', ' + (svgHeight - scalePadding) + ')'
    )
    .call(xAxis);
}
