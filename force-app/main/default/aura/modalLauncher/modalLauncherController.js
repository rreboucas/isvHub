({
    // Implement switch instead of if


    handleMessage: function(cmp, message, helper) { 
        // Read the message argument to get the values in the message payload
        console.log('modalLauncher - Received Message = '+ message);
        console.log('modalLauncher - Received Message Value = '+ message.getParam("messageToSend"));
        
        cmp.set("v.actionType", message.getParam("actionType")); 
        console.log('modalLauncher - Received Message Action Type = '+ cmp.get("v.actionType") );

        switch(cmp.get("v.actionType")) {
            case 'licenseExpirationUpdate':
                {
                    if (message != null && message.getParam("messageToSend") != null) {
             
                        var modalBody;
                        $A.createComponent("c:modifyLicenseExpiration",
                        {
                           recordid : message.getParam("messageToSend")
                        },
                           function(content, status) {
                               if (status === "SUCCESS") {
                                   modalBody = content;
                                   cmp.find('overlayLib').showCustomModal({
                                       header: "Modify License",
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
              break;
              case 'sendEmail':
                {
                    if (message != null && message.getParam("messageToSend") != null) {
             
                        var modalBody;
                        $A.createComponent("c:emailSender",
                        {
                            email : message.getParam("email"),
                            emailType : message.getParam("emailType"),
                            attachtoentityid: message.getParam("messageToSend")
                        },
                           function(content, status) {
                               if (status === "SUCCESS") {
                                   modalBody = content;
                                   cmp.find('overlayLib').showCustomModal({
                                       header: "Send E-mail",
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
              break;
            case 'displayNba':
                {
                    /*if (message.getParam("formFactor") == 'Phone' && message.getParam("actionType") == 'displayNba') {
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
                     } */
                }
            break;
            default:
          }



       
     }
})
