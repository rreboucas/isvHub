({
    handleMessage: function(cmp, message, helper) { 
        // Read the message argument to get the values in the message payload
        console.log('modalLauncher - Received Message = '+ message);
        console.log('modalLauncher - Received Message Value = '+ message.getParam("messageToSend"));
        //cmp.set("v.receivedRecordId", message.getParam("messageToSend")); 
       if (message != null && message.getParam("messageToSend") != null) {
            
        var modalBody;
        $A.createComponent("c:ISVConsoleNextBestAction",
        {
            receivedRecordId : message.getParam("messageToSend")
        },
           function(content, status) {
               if (status === "SUCCESS") {
                   modalBody = content;
                   cmp.find('overlayLib').showCustomModal({
                       header: "Application Confirmation",
                       body: modalBody,
                       showCloseButton: true,
                       cssClass: "mymodal",
                       closeCallback: function() {
                           //alert('You closed the alert!');
                       }
                   })
               }
           });


       }
       
     }
})
