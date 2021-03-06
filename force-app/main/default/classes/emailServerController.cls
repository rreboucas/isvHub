/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

public with sharing class emailServerController {
    
    @AuraEnabled
    public Boolean SendSuccessful { get;set; }
    @AuraEnabled
    public String SendResults { get;set; }
    @AuraEnabled
    public String TaskId { get;set; }
    
    @AuraEnabled
    public static emailServerController sendEmail(String body, String subject, String email, String recordId, String activityType, String licenseId, String maintenanceId, Boolean isAccount) {

        System.debug('######## recordId: ' + recordId);
        emailServerController result = new emailServerController();

        // First, reserve email capacity for the current Apex transaction to ensure
        // that we won't exceed our daily email limits when sending email after
        // the current transaction is committed.
        Messaging.reserveSingleEmailCapacity(1);
        
        // Processes and actions involved in the Apex transaction occur next,
        // which conclude with sending a single email.
        
        // Now create a new single email message object
        // that will send out a single email to the addresses in the To, CC & BCC list.
        Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
        
        // Strings to hold the email addresses to which you are sending the email.
        String[] toAddresses = new String[] {email}; 
          
        
        // Assign the addresses for the To and CC lists to the mail object.
        mail.setToAddresses(toAddresses);
        
        // Specify the address used when the recipients reply to the email. 
        mail.setReplyTo('manager@sparkle.com');
        
        // Specify the name used as the display name.
        mail.setSenderDisplayName(UserInfo.getName());
        
        // Specify the subject line for your email address.
        mail.setSubject(subject);
        
        // Set to True if you want to BCC yourself on the email.
        mail.setBccSender(false);
        
        // Optionally append the salesforce.com email signature to the email.
        // The email address of the user executing the Apex Code will be used.
        mail.setUseSignature(false);
        
        // Specify the text content of the email. 
        mail.setPlainTextBody(body);
        
        mail.setHtmlBody(body);
        
        
        
        // Send the email you have created.
        Messaging.SendEmailResult[] lstResults = Messaging.sendEmail(new Messaging.SingleEmailMessage[] { mail }); 
        Task t = new Task();

        for (Messaging.SendEmailResult s : lstResults)
        {
            if (s.isSuccess())
            {
                result.SendResults = 'Your message was sent successfully to ' + email ;
                result.SendSuccessful = true;
                
                
                String userId = UserInfo.getUserId();

                t.OwnerId = userId;
                t.Subject = subject;
                t.Status = 'Closed';
                t.Priority = 'Normal';
                if (isAccount)
                    t.WhatId = recordId;
                else {
                    t.WhoId = recordId;
                }
                // add who id if it is a lead
                t.TaskSubtype = 'Email';
                t.Description = body;
                t.ActivityDate = Date.today();
                insert t;

                // Add Tracked Email record:
                /*Tracked_Email__c tr = new Tracked_Email__c();
                tr.Activity_Id__c = t.id;
                tr.Activity_Type__c = activityType;
                tr.Date_Time_Sent__c = t.CreatedDate;
                tr.LMA_License__c = licenseId;
                tr.Maintenance__c = maintenanceId;
                tr.Sent_by_User__c = t.CreatedById; */
                
            }
            else
            {
                result.SendResults = s.getErrors().get(0).getMessage();
                result.SendSuccessful = false;
            }
        }
        result.TaskId = t.id;
        
        return result;

    }
}
