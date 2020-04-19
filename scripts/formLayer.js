function initFormLayer(FeatureLayer, symbolRender, map, setFeatureLayerViewFilter) {
    // Load data from REST API endpoint 
    const formLayer = new FeatureLayer({
        url: "https://services1.arcgis.com/0Lw2m57KEotYYFaA/arcgis/rest/services/NewGeoForm/FeatureServer/0",
        renderer: symbolRender
    });

    map.add(formLayer);

    // Filtering based depth input
    const depthInput = document.getElementById('depth-input')
    depthInput.addEventListener('keyup', changeDepthInput)
    depthInput.addEventListener('change', changeDepthInput)

    function changeDepthInput(event) {
        var value = event.target.value
        var query = `FloodDepth >= ${value}`
        setFeatureLayerViewFilter(query, formLayer)
    }
}
