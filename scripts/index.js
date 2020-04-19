
require([
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/FeatureLayer",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/widgets/TimeSlider"
], function (Map, MapView, FeatureLayer, SimpleMarkerSymbol, TimeSlider) {

    const map = new Map({
        basemap: "topo-vector"
    });

    const view = new MapView({
        container: "viewDiv",
        map: map,
        center: [-73.821366, 40.601273],
        zoom: 11
    });

    const symbol = {
        type: "simple-marker",
        style: "circle",
        color: "red",
        size: "8px",
        outline: {
            color: [255, 255, 0],
            width: 3
        }
    };
    
    const symbolRender = {
        type: 'simple',
        symbol: symbol,
        label: 'label'
    }
    
    function setFeatureLayerViewFilter(expression, featureLayer) {
        /*
            Filter features based on user inputs 
    
        */
        view.whenLayerView(featureLayer).then(function (featureLayerView) {
            featureLayerView.filter = {
                where: expression
            };
            console.log(expression, featureLayerView.filter)
        });
    }

    initFormLayer(FeatureLayer, symbolRender, map, setFeatureLayerViewFilter);
    initOldLayer(FeatureLayer, symbolRender, map, setFeatureLayerViewFilter);


    // var timeSlider = new TimeSlider({
    //     container: "timeSliderDiv",
    //     mode: "cumulative-from-start",
    // });
    // view.ui.add(timeSlider, "manual");

    // let timeLayerView; //blank
    // view.whenLayerView(oldLayer).then(function (layerView) {
    //     timeLayerView = layerView;

    //     var start = new Date(2019, 06, 20)
    //     var end = new Date(2020, 4, 1)

    //     timeSlider.fullTimeExtent = {
    //         start: start,
    //         end: end
    //     }

    //     timeSlider.values = end;


    // });

    // timeSlider.watch("timeExtent", function (value) {
    //     // update layer view filter to reflect current timeExtent
    //     console.log(value)
    //     timeLayerView.filter = {
    //         timeExtent: value
    //     };
    // });

});

