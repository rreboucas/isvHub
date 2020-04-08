({
	doInit : function(cmp) {
        $A.createComponent(
            "lightning:nextBestActions",
            {
                widgetTitle : "EinsteinRecommendations" ,
                singleColumn : "true", 
                strategyName : "License_Expiring_Soon",
                showEinstein : "true",
                showNbaWidget : "true",
                recordId : cmp.get("v.recordId")
            },
            function(nbaComponent, status, errorMessage){
                //Add the new button to the body array
                if (status === "SUCCESS") {
                    var body = cmp.get("v.body");
                    body.push(nbaComponent);
                    cmp.set("v.body", body);
                }
                else if (status === "INCOMPLETE") {
                    console.log("No response from server or client is offline.")
                    // Show offline error
                }
                else if (status === "ERROR") {
                    console.log("Error: " + errorMessage);
                    // Show error message
                }
            }
        );
    }
})