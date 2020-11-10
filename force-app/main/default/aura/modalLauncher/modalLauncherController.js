/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

({
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
                            attachtoentityid: message.getParam("messageToSend"),
                            orgid: message.getParam("orgid"),
                            maintenancename: message.getParam("maintenancename"),
                            startdt: message.getParam("starttime"),
                            endtime: message.getParam("endtime"),
                            availability: message.getParam("availavility"),
                            licenseid: message.getParam("licenseid"),
                            maintenanceid: message.getParam("maintenanceid")

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
            case 'latestInstalls':
                {
                    if (message != null && message.getParam("messageToSend") != null) {
             
                        var modalBody;
                        $A.createComponent("c:listContainer",
                        {
                            title : 'Latest Installs per App',
                            maxRecords : '300',
                            showMoreLinkVisible: false,
                            launchedViaModal: true
                        },
                           function(content, status) {
                               if (status === "SUCCESS") {
                                   modalBody = content;
                                   cmp.find('overlayLib').showCustomModal({
                                        header: "View More - Latest Installs",   
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
            case 'licensesExpiring':
                {
                    if (message != null && message.getParam("messageToSend") != null) {
             
                        var modalBody;
                        $A.createComponent("c:listContainer",
                        {
                            title : 'Licenses Expiring Soon',
                            maxRecords : '300',
                            showMoreLinkVisible: false,
                            launchedViaModal: true
                        },
                           function(content, status) {
                               if (status === "SUCCESS") {
                                   modalBody = content;
                                   cmp.find('overlayLib').showCustomModal({
                                    header: "View More - Expiring Licenses", 
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
            case 'viewImpactedCustomers':
                {
                    if (message != null && message.getParam("messageToSend") != null) {
             
                        var modalBody;
                        $A.createComponent("c:listContainer",
                        {
                            title : message.getParam("title"),
                            maxRecords : '300',
                            filter: 'Customers Impacted',
                            showMoreLinkVisible: false,
                            launchedViaModal: true,
                            licenseIds: message.getParam("messageToSend"),
                            startdt: message.getParam("startdt"),
                            yearFormat: message.getParam("yearFormat"),
                            monthFormat: message.getParam("monthFormat"),
                            dayFormat: message.getParam("dayFormat"),
                            weekDayFormat: message.getParam("weekDayFormat"),
                            availability: message.getParam("availability"),
                            endtime: message.getParam("endtime")
                        },
                           function(content, status) {
                               if (status === "SUCCESS") {
                                   modalBody = content;
                                   cmp.find('overlayLib').showCustomModal({
                                    header: "Customers Impacted", 
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
            default:
          }



       
     }
})
