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
    //console.log(initialMetaData);

    dropDownMenu(names); // make drop down menu

    initialBarChart(initialSampleValues, initialOtuIds, initialOtuLabels); // make bar chart for first sample
    initialBubbleChart(initialOtuIds, initialSampleValues, initialOtuLabels); // make bubble chart for first sample
    initialDemoInfo(initialMetaData);

    

  })  

};

// create dropdown menu from list of names
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

  Plotly.newPlot("bar", barData);

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

  Plotly.newPlot("bubble",data);

};

function updateBubbleChart(x, y, labels) {

  Plotly.restyle("bubble","x",[x]);
  Plotly.restyle("bubble","y",[y]);
  Plotly.restyle("bubble","text",[labels]);
  Plotly.restyle("bubble","marker.color",[x])
  Plotly.restyle("bubble","marker.size",[y]);

};

function initialDemoInfo(initialMetaData){

  var metadataKeys = Object.keys(initialMetaData);
  var metadataValues = Object.values(initialMetaData);
  console.log(metadataKeys);
  console.log(metadataValues);

  var panel = d3.select ("#sample-metadata");

  console.log(metadataKeys.length)

  for (var i = 0; i < metadataKeys.length; i ++) {
    panel.append("p").attr("values", metadataKeys[i]).text(metadataKeys[i] + " : " + metadataValues[i]);
    console.log("test loop");
  };

};

function updateDemoInfo() {

};

// // The new student and grade to add to the table
// var newGrade = ["Wash", 79];

// // Use D3 to select the table
// var table = d3.select("table");

// // Use d3 to create a bootstrap striped table
// // http://getbootstrap.com/docs/3.3/css/#tables-striped
// table.attr("class", "table table-striped");

// // Use D3 to select the table body
// var tbody = d3.select("tbody");

// // Append one table row `tr` to the table body
// var row = tbody.append("tr");

// // Append one cell for the student name
// row.append("td").text(newGrade[0]);

// // Append one cell for the student grade
// row.append("td").text(newGrade[1]);



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

    // update the bar chart based on new information
    updateBarChart(newSampleValues, newOtuIds, newOtuLabels);
    updateBubbleChart(newOtuIds, newSampleValues, newOtuLabels);


  });

};


// initialize page!  don't forget this :)
init();