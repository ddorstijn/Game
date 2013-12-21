jsPlumb.ready(function() {
  
    firstInstance.importDefaults({
    Connector : [ "Bezier", { curviness: 150 } ],
    Anchors : [ "TopCenter", "BottomCenter" ]
  });

    firstInstance.connect({
    source:"element1", 
    target:"element2", 
    scope:"someScope" 
  });  

});
