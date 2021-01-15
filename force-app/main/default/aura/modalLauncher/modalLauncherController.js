<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> a94e476 (first committo labs)
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

<<<<<<< HEAD
=======
>>>>>>> 00546ad (first commit)
=======
>>>>>>> a94e476 (first committo labs)
({
    handleMessage: function(cmp, message, helper) { 
        // Read the message argument to get the values in the message payload
        console.log('modalLauncher - Received Message = '+ message);
        console.log('modalLauncher - Received Message Value = '+ message.getParam("messageToSend"));
<<<<<<< HEAD
<<<<<<< HEAD
        
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
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> e6a0a85 (added maintenance email capabilities)
                            isaccount: message.getParam("sourceComponent"),
                            orgtype: message.getParam("orgtype"),
                            maintenancelink: message.getParam("maintenancelink"),
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
                            title : 'Upcoming License Expirations',
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
            case 'runLeadsMatchJob':
                {
                    
                var modalBody;
                $A.createComponent("c:dataMatchJob",
                {
                   
                },
                    function(content, status) {
                        if (status === "SUCCESS") {
                            modalBody = content;
                            cmp.find('overlayLib').showCustomModal({
                            header: "Run Apex Data Match Job", 
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
            break;
            case 'openLeadUpdate':
                {
                    
                var modalBody;
                $A.createComponent("c:recordUpdateWizard",
                {
                    objectApiName : 'Lead'
                },
                    function(content, status) {
                        if (status === "SUCCESS") {
                            modalBody = content;
                            cmp.find('overlayLib').showCustomModal({
                            header: "Update Lead(s) City, State and Country values", 
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
            break;
            case 'openAccountUpdate':
                {
                    
                var modalBody;
                $A.createComponent("c:recordUpdateWizard",
                {
                    objectApiName : 'Account'
                },
                    function(content, status) {
                        if (status === "SUCCESS") {
                            modalBody = content;
                            cmp.find('overlayLib').showCustomModal({
                            header: "Update Account(s) City, State and Country values", 
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
            break;
            case 'viewImpactedCustomers':
                {
                    if (message != null && message.getParam("messageToSend") != null) {
                        let licenseIds = message.getParam("messageToSend");
                        console.log('modalLauncher - licenseIds = '+ licenseIds);
                        let title = message.getParam("title");
                        console.log('modalLauncher - title = '+ title);
                        let startdt = message.getParam("startdt");
                        console.log('modalLauncher - startdt = '+ startdt);
                        let yearFormat = message.getParam("yearFormat");
                        console.log('modalLauncher - yearFormat = '+ yearFormat);
                        let monthFormat = message.getParam("monthFormat");
                        console.log('modalLauncher - monthFormat = '+ monthFormat);
                        let dayFormat = message.getParam("dayFormat");
                        console.log('modalLauncher - dayFormat = '+ dayFormat);
                        let weekDayFormat = message.getParam("weekDayFormat");
                        console.log('modalLauncher - weekDayFormat = '+ weekDayFormat);
                        let availability = message.getParam("availability");
                        console.log('modalLauncher - availability = '+ availability);
                        let orgtype = message.getParam("orgtype");
                        console.log('modalLauncher - orgtype = '+ orgtype);
                        let maintenanceid = message.getParam("maintenanceid");
                        console.log('modalLauncher - maintenanceid = '+ maintenanceid);
                        let endtime = message.getParam("endtime");
                        console.log('modalLauncher - endtime = '+ endtime);

                        var modalBody;
                        $A.createComponent("c:listContainer",
                        {
                            title : title,
                            maxRecords : '300',
                            filter: 'Customers Impacted',
                            showMoreLinkVisible: false,
                            launchedViaModal: true,
                            startdt: startdt,
                            yearFormat: yearFormat,
                            monthFormat: monthFormat,
                            dayFormat: dayFormat,
                            weekDayFormat: weekDayFormat,
                            availability: availability,
                            orgtype: orgtype,
                            maintenanceid: maintenanceid,
                            endtime: endtime
                        },
                        function(content, status) {
                            if (status === "SUCCESS") {
                                modalBody = content;
                                cmp.find('overlayLib').showCustomModal({
                                 header: "View Impacted Customers", 
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
          }



       
     }
})
=======
        //cmp.set("v.receivedRecordId", message.getParam("messageToSend")); 
    if (message.getParam("formFactor") == 'Phone' && message.getParam("actionType") == 'displayNba') {
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
=======
        
        cmp.set("v.actionType", message.getParam("actionType")); 
        console.log('modalLauncher - Received Message Action Type = '+ cmp.get("v.actionType") );
>>>>>>> af5f42a (fixedalignment)

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
=======
                            maintenanceid: message.getParam("maintenanceid")

>>>>>>> d3c0005 (adding maintenance lwc changes)
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
                            orgtype: message.getParam("orgtype"),
                            maintenanceid: message.getParam("maintenanceid"),
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
>>>>>>> 00546ad (first commit)
