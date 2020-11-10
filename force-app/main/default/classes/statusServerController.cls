/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

<<<<<<< HEAD
<<<<<<< HEAD
public with sharing class statusServerController {
<<<<<<< HEAD
	
	


    @AuraEnabled(cacheable=true)
    public static List<Maintenance__c> getEvents(String dataFilter, String orgType) {

		System.debug('######## dataFilter: ' + dataFilter);
		System.debug('######## orgType: ' + orgType);

        List<Maintenance__c> lstReturnRecords = new List<Maintenance__c>();

        // 1. Fetch the customers instance names from active and Trial License records and the number of customers per instance:
		switch on orgType{
			when 'Production' {
				System.debug('######## Production switch: ' + orgType);
				lstReturnRecords = [SELECT Availability__c,End_Date_Time__c,Event_Name__c,Id,ImpactedLicenseIds__c,Instance_Name__c,Is_Pre_Release__c,Is_Sandbox__c,Maintenance_External_Id__c,Number_of_Impacted_Customers__c,Start_Date_Time__c,Total_Number_of_Records__c FROM Maintenance__c where Start_Date_Time__c >= TODAY AND Is_Sandbox__c = false AND Is_Pre_Release__c = false WITH SECURITY_ENFORCED order by Start_Date_Time__c ASC];
			}
			when 'Sandbox' {
				System.debug('######## Sandbox switch: ' + orgType);
				lstReturnRecords = [SELECT Availability__c,End_Date_Time__c,Event_Name__c,Id,ImpactedLicenseIds__c,Instance_Name__c,Is_Pre_Release__c,Is_Sandbox__c,Maintenance_External_Id__c,Number_of_Impacted_Customers__c,Start_Date_Time__c,Total_Number_of_Records__c FROM Maintenance__c where Is_Sandbox__c = true and Start_Date_Time__c >= TODAY WITH SECURITY_ENFORCED order by Start_Date_Time__c ASC];
			}
			when 'PreRelease' {
				lstReturnRecords = [SELECT Availability__c,End_Date_Time__c,Event_Name__c,Id,ImpactedLicenseIds__c,Instance_Name__c,Is_Pre_Release__c,Is_Sandbox__c,Maintenance_External_Id__c,Number_of_Impacted_Customers__c,Start_Date_Time__c,Total_Number_of_Records__c FROM Maintenance__c where Is_Pre_Release__c = true and Start_Date_Time__c >= TODAY WITH SECURITY_ENFORCED order by Start_Date_Time__c ASC];
			}
		}
		
        system.debug('####### lstReturnRecords: ' + lstReturnRecords);

        return lstReturnRecords;
    }

    
}
=======
    
=======
public with sharing class statusServerController implements Comparable {
	
	@AuraEnabled
	public String maintenanceId { get;set; }
>>>>>>> 6aab12d (comit july 2020)
    @AuraEnabled
	public String eventName { get;set; }
	@AuraEnabled
	public String availability { get;set; }
    @AuraEnabled
    public Datetime startDateTime { get;set; }
    @AuraEnabled
	public Datetime endDateTime { get;set; }
	@AuraEnabled
    public String strStartTime { get;set; }
	@AuraEnabled
    public String strEndTime { get;set; }
    @AuraEnabled
    public String numImpactedCustomers { get;set; }
    @AuraEnabled
	public List<String> impactedLicenseIds { get;set; }
	@AuraEnabled
	public String instanceName { get;set; }
	@AuraEnabled
	public String totalNumRecs { get;set; }
=======
public with sharing class statusServerController {
	
	
>>>>>>> d3c0005 (adding maintenance lwc changes)


    @AuraEnabled(cacheable=true)
    public static List<Maintenance__c> getEvents(String dataFilter, String orgType) {

		System.debug('######## dataFilter: ' + dataFilter);
		System.debug('######## orgType: ' + orgType);

        List<Maintenance__c> lstReturnRecords = new List<Maintenance__c>();

        // 1. Fetch the customers instance names from active and Trial License records and the number of customers per instance:
		switch on orgType{
			when 'Production' {
				lstReturnRecords = [SELECT Availability__c,End_Date_Time__c,Event_Name__c,Id,ImpactedLicenseIds__c,Instance_Name__c,Is_Pre_Release__c,Is_Sandbox__c,Maintenance_External_Id__c,Number_of_Impacted_Customers__c,Start_Date_Time__c,Total_Number_of_Records__c FROM Maintenance__c where Start_Date_Time__c >= TODAY WITH SECURITY_ENFORCED order by Start_Date_Time__c ASC];
			}
			when 'Sandbox' {
				lstReturnRecords = [SELECT Availability__c,End_Date_Time__c,Event_Name__c,Id,ImpactedLicenseIds__c,Instance_Name__c,Is_Pre_Release__c,Is_Sandbox__c,Maintenance_External_Id__c,Number_of_Impacted_Customers__c,Start_Date_Time__c,Total_Number_of_Records__c FROM Maintenance__c where Is_Sandbox__c = true and Start_Date_Time__c >= TODAY WITH SECURITY_ENFORCED order by Start_Date_Time__c ASC];
			}
			when 'PreRelease' {
				lstReturnRecords = [SELECT Availability__c,End_Date_Time__c,Event_Name__c,Id,ImpactedLicenseIds__c,Instance_Name__c,Is_Pre_Release__c,Is_Sandbox__c,Maintenance_External_Id__c,Number_of_Impacted_Customers__c,Start_Date_Time__c,Total_Number_of_Records__c FROM Maintenance__c where Is_Pre_Release__c = true and Start_Date_Time__c >= TODAY WITH SECURITY_ENFORCED order by Start_Date_Time__c ASC];
			}
		}
		
        system.debug('####### lstReturnRecords: ' + lstReturnRecords);

        return lstReturnRecords;
    }

    
}
>>>>>>> 84b8eb1 (added account viewer to map)
