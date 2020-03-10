// default dashboard
function init() {
  d3.json("samples.json").then((data) => {

    var names = data.names; // get names of all samples
    var initialName = names[0] // get name of first sample
    //console.log(initialName);

    var samples = data.samples; // get sample info for all samples
    var initialSamples = samples[0]; // get sample info for first sample
    //console.log(initialSamples);

    var initialSampleValues = initialSamples.sample_values; // get sample_values for first sample
    // console.log('Sample Values');
    // console.log(initialSampleValues);

    var initialOtuIds = initialSamples.otu_ids; // get otu ids for first sample
    // console.log('OTU Ids');
    // console.log(initialOtuIds);

    var initialOtuLabels = initialSamples.otu_labels; // get otu labels for first sample
    // console.log('OTU Labels')
    // console.log(initialOtuLabels);

    var metadata = data.metadata; // get metadata of all samples
    var initialMetaData = metadata[0]; // get metadata for first sample
    var initialwfreq = initialMetaData.wfreq;
    //console.log(initialMetaData);

    dropDownMenu(names); // make drop down menu

    initialBarChart(initialSampleValues, initialOtuIds, initialOtuLabels); // make bar chart for first sample
    initialBubbleChart(initialOtuIds, initialSampleValues, initialOtuLabels); // make bubble chart for first sample
    initialDemoInfo(initialMetaData); // fill in demo info with metadata for first sample
    initialGauge(initialwfreq);


  })  

};

// create dropdown menu from list of names
// shouts to heain for helping with this function
function dropDownMenu(names) {

  var dropDown = d3.select("#selDataset"); // get dropdown id

    // loop through all names and add them to the list
    for (var i = 0; i < names.length; i++) {
      dropDown.append("option").attr("value", i).text(names[i]);
    }
};

// make initial bar chart
function initialBarChart(x, y, labels) {

  y = y.map(y => "OTU " + y);

  var barData = [{
    x: x.slice(0,10).reverse(), // sample values
    y: y.slice(0,10).reverse(), // otu ids
    type: "bar",
    orientation: "h",
    text: labels.slice(0,10).reverse() // otu labels
  }];

  var layout = {
    title: "Top 10 OTUs",
    xaxis: {title: "Count"},
    yaxis: {title: "OTU ID"}
  }
  Plotly.newPlot("bar", barData, layout);

};

// update bar chart based on new information
function updateBarChart(x, y, labels) {
  
  // add "OTU" to each OUT ID
  y = y.map(y => "OTU " + y);

  // restyle all the parts of the bar chart
  Plotly.restyle("bar", "x", [x.slice(0,10).reverse()]);
  Plotly.restyle("bar", "y", [y.slice(0,10).reverse()]);
  Plotly.restyle("bar", "text", [labels.slice(0,10).reverse()]);
};

// create bubble chart for initial data
function initialBubbleChart(x, y, labels) {

  var data = [{
    x: x, // otu ids
    y: y, // sample values
    text: labels, // otu_labels
    mode: "markers",
    marker: {
      color: x, // out ids
      size: y // sample values
    }
  }];

  var layout = {
    title: "OTU Frequency",
    xaxis: {title: "OTU ID"},
    yaxis: {title: "Count"}
  };

  Plotly.newPlot("bubble",data, layout);

};

// update bubble chart with new data and info
function updateBubbleChart(x, y, labels) {

  Plotly.restyle("bubble","x",[x]);
  Plotly.restyle("bubble","y",[y]);
  Plotly.restyle("bubble","text",[labels]);
  Plotly.restyle("bubble","marker.color",[x])
  Plotly.restyle("bubble","marker.size",[y]);

};

// create demo info from initial metadata
function initialDemoInfo(initialMetaData){

  var metadataKeys = Object.keys(initialMetaData); // get all keys
  var metadataValues = Object.values(initialMetaData); // get all values
  // console.log(metadataKeys);
  // console.log(metadataValues);

  var panel = d3.select ("#sample-metadata"); // get div

  //console.log(metadataKeys.length)

  // loop through all keys and values in paragraph
  for (var i = 0; i < metadataKeys.length; i ++) {
    panel.append("p").attr("values", metadataKeys[i]).text(metadataKeys[i] + " : " + metadataValues[i]);
    console.log("test loop");
  };

};

// update demo info for new selected sample
function updateDemoInfo(newMetaData) {

  var metadataKeys = Object.keys(newMetaData); // get all keys
  var metadataValues = Object.values(newMetaData); // get all values
  // console.log(metadataKeys);
  // console.log(metadataValues);

  var panel = d3.select ("#sample-metadata"); // get div

  panel.selectAll("p").remove(); // remove all existing paragraphs from div

  // console.log(metadataKeys.length)

  // loop through all keys and values in paragraph
  for (var i = 0; i < metadataKeys.length; i ++) {
    panel.append("p").attr("values", metadataKeys[i]).text(metadataKeys[i] + " : " + metadataValues[i]);
    console.log("test loop");
  };

};

function initialGauge(wfreq) {

  var data = [
    {
      //domain: { x: [0, 1], y: [0, 1] },
      value: wfreq,
      title: { text: "Belly Button Washing Frequency" },
      //text: ["0-1","1-2","2-3","3-4","4-5","5-6","6-7","7-8","8-9","9-10"],
      labels: ["0-1","1-2","2-3","3-4","4-5","5-6","6-7","7-8","8-9","9-10"],
      type: "indicator",
      mode: "gauge+number",
      textinfo: "text",
      textposition: "inside",
      marker: {
        colors: ['','','','','','','','','','white'],
        labels: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9'],
        hoverinfo: 'label'
      },
      gauge: { 
        axis: {range: [0,9]},
        bar: {color: "green"},
        steps: [
          { range: [0, 1], color: "lightgray" },
          { range: [1, 2], color: "darkgrey" },
          { range: [2, 3], color: "lightgray" },
          { range: [3, 4], color: "darkgrey" },
          { range: [4, 5], color: "lightgray" },
          { range: [5, 6], color: "darkgrey" },
          { range: [6, 7], color: "lightgray" },
          { range: [7, 8], color: "darkgrey" },
          { range: [8, 9], color: "lightgray" },
          { range: [9, 10], color: "darkgrey" },
        ],
        shapes: [{
          type: 'line',
          x0: 0.5,
          y0: 0.5,
          x1: 0.6,
          y1: 0.6,
          line: {
            color: 'black',
            width: 3
          }
        }],
      }
    }
  ];
  
  var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
  Plotly.newPlot('gauge', data, layout);
};

function updateGauge(wfreq) {

  Plotly.restyle("gauge","value",[wfreq]);
};

// get new information based on what is selected on the dropdown menu
function optionChanged(new_option) {
  //var dropdownMenu = d3.select("#selDataset");

  // get data from samples.json
  d3.json("samples.json").then((data) => {
    //console.log(new_option);

    var names = data.names;  // get list of names
    var new_name = names[new_option];  // get specific name based on dropdown index

    var samples = data.samples; // get samples
    var newSample = samples[new_option]; // get specific sample info based on dropdown index

    var newSampleValues = newSample.sample_values; // get specific sample_values
    // console.log('Sample Values');
    // console.log(newSampleValues);

    var newOtuIds = newSample.otu_ids; // get specific otu_ids
    // console.log('OTU Ids');
    // console.log(newOtuIds);

    var newOtuLabels = newSample.otu_labels; // get specific otu_labels
    // console.log('OTU Labels')
    // console.log(initialOtuLabels);

    var metadata = data.metadata; // get all meadata
    var newMetaData = metadata[new_option]; // get specific metadata
    var newwfreq = newMetaData.wfreq;

    // update the bar chart based on new information
    updateBarChart(newSampleValues, newOtuIds, newOtuLabels);
    updateBubbleChart(newOtuIds, newSampleValues, newOtuLabels);
    updateDemoInfo(newMetaData);
    updateGauge(newwfreq);

  });

};

// initialize page!  don't forget this :)
init();