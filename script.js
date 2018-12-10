/**************************************************************************************************
  Simple Example on creating p elements based on a dataset
**************************************************************************************************/
const dataset = [1, 2, 3, 4, 5];

/* Create a p tag for each item in dataset */
d3.select('body') // select the body element
  .selectAll('p') // select all p tags -> will return an empty selection as no p elements available
  .data(dataset) // will put the data in waiting state for further processing
  .enter() // will take the data items one by one and perform further operations on them
  .append('p') // appends a p item for each data item
  .text(d => d); // binds respective text inside each p item (in this case the dataitem itself)
