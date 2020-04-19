function initOldLayer(FeatureLayer, symbolRender, map, setFeatureLayerViewFilter){
    var oldLayer = new FeatureLayer({
        url: "https://services1.arcgis.com/0Lw2m57KEotYYFaA/arcgis/rest/services/XY2202/FeatureServer",
        renderer: symbolRender
    
    })
    // add layers to map 
    map.add(oldLayer);
    
    //get unqiue values for Field2
    const query = {
        outFields: ["Field2"],
        returnGeometry: false,
        where: '1 = 1'
    };
    
    oldLayer.queryFeatures(query).then(function (result) {
        const features = result.features.map(function (feature) {
            return feature.toJSON().attributes.Field2
        })
        const unqiueFeatures = Array.from(new Set(features))
        console.log(unqiueFeatures)
    
        //generate options for NTA select
        unqiueFeatures.forEach(feature => {
            const option = document.createElement('option')
            option.value = feature
            option.text = feature
            ntaInput.appendChild(option)
        })
    });
    
    
    
    //
    const ntaInput = document.getElementById('nta-input')
    ntaInput.addEventListener("change", function (event) {
        const value = event.target.value
        if (value === '') {
            const query = '1 = 1'
            setFeatureLayerViewFilter(query, oldLayer)
        } else {
            const query = `Field2 = '${value}'`
            setFeatureLayerViewFilter(query, oldLayer)
        }
    
    })
}
