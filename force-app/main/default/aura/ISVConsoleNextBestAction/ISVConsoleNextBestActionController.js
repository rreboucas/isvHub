/* eslint-disable no-unused-expressions */
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
    },

    handleChanged: function(cmp, message, helper) { 
        // Read the message argument to get the values in the message payload
        console.log('handleChanged - Received Message = '+ message);
        console.log('handleChanged - Received Message Value = '+ message.getParam("messageToSend"));
        cmp.set("v.receivedRecordId", message.getParam("messageToSend"));
       if (message != null && message.getParam("messageToSend") != null) {
           cmp.set("v.recordId", message.getParam("messageToSend"));
       }
       console.log('handleChanged - v.recordId = '+ component.get("v.recordId"));
     }

})