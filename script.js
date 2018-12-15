/*
- fully understand the code
- Make it responsive
*/

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

/* Helper function to get the Quarter from a date string */
function getQuarter(date) {
  const year = date.substr(0, 4);
  const month = Number(date.substr(5, 2));
  const quarter =
    month < 4 ? 'Q1' : month < 7 ? 'Q2' : month < 10 ? 'Q3' : 'Q4';

  return `${year} ${quarter}`;
}

/********** Create the chart *********/
function updateChart(dataSet) {
  const svgWidth = 940, // the width of the svg container
    svgHeight = 600, // the height of the svg container
    barPadding = 1, // the padding between the bars
    scalePadding = 50, // the padding of the chart within the svg
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

  /* Define the div for the tooltip 
      Thank you: http://bl.ocks.org/d3noob/a22c42db65eb00d4e369  */
  const divTooltip = d3
    .select('body')
    .append('div')
    .attr('class', 'tooltip')
    .attr('id', 'tooltip')
    .style('opacity', 0);

  /* configure the chart */
  svg
    .selectAll('rect')
    .data(dataSet)
    .enter()
    .append('rect') // The origin point of (0, 0) is in the upper-left corner.
    .attr('y', d => yScale(d[1])) // Positive values for y push the shape down from the origin point
    .attr('x', (d, i) => scalePadding + barWidth * i) // Positive values for x push the shape to the right
    /* Add the transition 
       thank you: https://codepen.io/HIC/full/JaaEOa/*/
    .transition()
    .duration(0)
    .delay((d, i) => i * 10)
    .attr('width', barWidth - barPadding)
    .attr('height', d => svgHeight - yScale(d[1]) - scalePadding)
    .attr('fill', '#3949ab') //  The bar colors (Here: indigo darken-1)
    .attr('class', 'bar') // add hovering effect (managed in css)
    .attr('data-date', d => d[0])
    .attr('data-gdp', d => d[1]);

  /* Show the tooltip when hovering */
  svg
    .selectAll('rect')
    .on('mouseover', d => {
      const amount = d[1].toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
      });

      divTooltip
        .attr('data-date', d[0])
        .transition()
        .duration(200)
        .style('opacity', 0.9);

      divTooltip
        .html(`${getQuarter(d[0])} <br> ${amount} Billion`)
        .style('left', d3.event.pageX + 10 + 'px')
        .style('top', d3.event.pageY - 35 + 'px');
    })
    .on('mouseout', d => {
      /* Hide the tooltip when hovering out */
      divTooltip
        .transition()
        .duration(500)
        .style('opacity', 0);
    });

  /* Configure the axes */
  const yAxis = d3.axisLeft(yScale);
  const xAxis = d3.axisBottom(xScale).tickFormat(d3.format(''));

  /* Place the y-axis */
  svg
    .append('g')
    .attr('id', 'y-axis')
    .attr('class', 'axis')
    .attr('transform', 'translate(' + scalePadding + ',0)')
    .call(yAxis);

  /* Place the x-axis */
  svg
    .append('g')
    .attr('id', 'x-axis')
    .attr('class', 'axis')
    .attr(
      'transform',
      'translate(' + scalePadding + ', ' + (svgHeight - scalePadding) + ')'
    )
    .call(xAxis);

  /* Axis descriptions */
  svg
    .append('text')
    .attr('class', 'axis-description')
    .text('More Information: http://www.bea.gov/national/pdf/nipaguid.pdf')
    .attr('y', svgHeight - 5)
    .attr('x', svgWidth - 387);

  svg
    .append('text')
    .attr('class', 'axis-description')
    .text('Gross Domestic Product')
    .attr('transform', 'rotate(-90)')
    .attr('x', -165)
    .attr('y', 75);
}
