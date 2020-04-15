/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */


public with sharing class listContainerController {

    private static Map<String, Set<String>> mapObjectsFields = null;

    @AuraEnabled
    public String licenseID { get;set; }
    @AuraEnabled
    public Date expirationDate { get;set; }
    @AuraEnabled
    public String packageName { get;set; }
    @AuraEnabled
    public String packageVersion { get;set; }
    @AuraEnabled
    public Datetime installDateTime { get;set; }
    @AuraEnabled
    public String companyName { get;set; }
    @AuraEnabled
    public String city { get;set; }
    @AuraEnabled
    public String state { get;set; }
    @AuraEnabled
    public String country { get;set; }
    @AuraEnabled
    public String street { get;set; }
    @AuraEnabled
    public String orgID { get;set; }
    @AuraEnabled
    public String accountID { get;set; }
    @AuraEnabled
    public String leadID { get;set; }
<<<<<<< HEAD
<<<<<<< HEAD
    @AuraEnabled
    public location location { get;set; }
    @AuraEnabled
    public String email { get;set; }
=======
=======
    @AuraEnabled
    public location location { get;set; }
>>>>>>> 033b27d (added map controller apex)

    @AuraEnabled(cacheable=true)
    public static List<listContainerController> getLicenseData(String rowsLimit, String dataFilter) {

        System.debug('######## rowsLimit: ' + rowsLimit);

        // CRUD / FLS Check - Create a map with the object names and fields for CRUD\FLS check
        mapObjectsFields = new Map<String, Set<String>>(); 

        List<listContainerController> lstReturnRecords = new List<listContainerController>();
        
        Integer rLimit = integer.valueOf(rowsLimit);
        System.debug('######## rLimit: ' + rLimit);

        String soql = 'Select createddate';
        ISVConsole_Helper.AddFieldToObjectsMap('createddate', 'sfLma__License__c', mapObjectsFields);

        soql += ', id';
        ISVConsole_Helper.AddFieldToObjectsMap('id', 'sfLma__License__c', mapObjectsFields);

        soql += ', sfLma__Lead__c';
        ISVConsole_Helper.AddFieldToObjectsMap('sfLma__Lead__c', 'sfLma__License__c', mapObjectsFields);

        soql += ', sfLma__Account__c';
        ISVConsole_Helper.AddFieldToObjectsMap('sfLma__Account__c', 'sfLma__License__c', mapObjectsFields);

        soql += ', sfLma__Contact__c';
        ISVConsole_Helper.AddFieldToObjectsMap('sfLma__Contact__c', 'sfLma__License__c', mapObjectsFields);

        soql += ', sfLma__Package_Version__c';
        ISVConsole_Helper.AddFieldToObjectsMap('sfLma__Package_Version__c', 'sfLma__License__c', mapObjectsFields);

        soql += ', sfLma__Package_Version__r.sfLma__Package__r.Name';
        ISVConsole_Helper.AddFieldToObjectsMap('Name', 'sfLma__Package__c', mapObjectsFields);

        soql += ', sfLma__Lead__r.Company';
        ISVConsole_Helper.AddFieldToObjectsMap('Company', 'Lead', mapObjectsFields);

        soql += ', sfLma__Lead__r.State';
        ISVConsole_Helper.AddFieldToObjectsMap('State', 'Lead', mapObjectsFields);

        soql += ', sfLma__Lead__r.City';
        ISVConsole_Helper.AddFieldToObjectsMap('City', 'Lead', mapObjectsFields);

        soql += ', sfLma__Lead__r.FirstName';
        ISVConsole_Helper.AddFieldToObjectsMap('FirstName', 'Lead', mapObjectsFields);

        soql += ', sfLma__Lead__r.LastName';
        ISVConsole_Helper.AddFieldToObjectsMap('LastName', 'Lead', mapObjectsFields);

        soql += ', sfLma__Lead__r.Email';
        ISVConsole_Helper.AddFieldToObjectsMap('Email', 'Lead', mapObjectsFields);

        soql += ', sfLma__Lead__r.Country';
        ISVConsole_Helper.AddFieldToObjectsMap('Country', 'Lead', mapObjectsFields);

        soql += ', sfLma__Lead__r.Latitude';
        ISVConsole_Helper.AddFieldToObjectsMap('Latitude', 'Lead', mapObjectsFields);

        soql += ', sfLma__Lead__r.Longitude';
        ISVConsole_Helper.AddFieldToObjectsMap('Longitude', 'Lead', mapObjectsFields);

        soql += ', sfLma__Lead__r.PostalCode';
        ISVConsole_Helper.AddFieldToObjectsMap('PostalCode', 'Lead', mapObjectsFields);

        soql += ', sfLma__Lead__r.Street';
        ISVConsole_Helper.AddFieldToObjectsMap('Street', 'Lead', mapObjectsFields);

        soql += ', sfLma__Account__r.Name';
        ISVConsole_Helper.AddFieldToObjectsMap('Name', 'Account', mapObjectsFields);

        soql += ', sfLma__Account__r.BillingCity';
        ISVConsole_Helper.AddFieldToObjectsMap('BillingCity', 'Account', mapObjectsFields);

        soql += ', sfLma__Account__r.BillingCountry';
        ISVConsole_Helper.AddFieldToObjectsMap('BillingCountry', 'Account', mapObjectsFields);

        soql += ', sfLma__Account__r.BillingLatitude';
        ISVConsole_Helper.AddFieldToObjectsMap('BillingLatitude', 'Account', mapObjectsFields);

        soql += ', sfLma__Account__r.BillingLongitude';
        ISVConsole_Helper.AddFieldToObjectsMap('BillingLongitude', 'Account', mapObjectsFields);

        soql += ', sfLma__Account__r.BillingPostalCode';
        ISVConsole_Helper.AddFieldToObjectsMap('BillingPostalCode', 'Account', mapObjectsFields);

        soql += ', sfLma__Account__r.BillingState';
        ISVConsole_Helper.AddFieldToObjectsMap('BillingState', 'Account', mapObjectsFields);

        soql += ', sfLma__Account__r.BillingStreet';
        ISVConsole_Helper.AddFieldToObjectsMap('BillingStreet', 'Account', mapObjectsFields);

        soql += ', sfLma__Account__r.ShippingCity';
        ISVConsole_Helper.AddFieldToObjectsMap('ShippingCity', 'Account', mapObjectsFields);

        soql += ', sfLma__Account__r.ShippingCountry';
        ISVConsole_Helper.AddFieldToObjectsMap('ShippingCountry', 'Account', mapObjectsFields);

        soql += ', sfLma__Account__r.ShippingLatitude';
        ISVConsole_Helper.AddFieldToObjectsMap('ShippingLatitude', 'Account', mapObjectsFields);

        soql += ', sfLma__Account__r.ShippingLongitude';
        ISVConsole_Helper.AddFieldToObjectsMap('ShippingLongitude', 'Account', mapObjectsFields);

        soql += ', sfLma__Account__r.ShippingPostalCode';
        ISVConsole_Helper.AddFieldToObjectsMap('ShippingPostalCode', 'Account', mapObjectsFields);

        soql += ', sfLma__Account__r.ShippingState';
        ISVConsole_Helper.AddFieldToObjectsMap('ShippingState', 'Account', mapObjectsFields);

        soql += ', sfLma__Account__r.ShippingStreet ';
        ISVConsole_Helper.AddFieldToObjectsMap('ShippingStreet', 'Account', mapObjectsFields);

        soql += ', sfLma__Contact__r.FirstName';
        ISVConsole_Helper.AddFieldToObjectsMap('FirstName', 'Contact', mapObjectsFields);

        soql += ', sfLma__Contact__r.LastName';
        ISVConsole_Helper.AddFieldToObjectsMap('LastName', 'Contact', mapObjectsFields);

        soql += ', sfLma__Contact__r.Email';
        ISVConsole_Helper.AddFieldToObjectsMap('Email', 'Contact', mapObjectsFields);

        soql += ', sfLma__Expiration__c';
        ISVConsole_Helper.AddFieldToObjectsMap('sfLma__Expiration__c', 'sfLma__License__c', mapObjectsFields);

        soql += ', sfLma__Subscriber_Org_ID__c';
        ISVConsole_Helper.AddFieldToObjectsMap('sfLma__Subscriber_Org_ID__c', 'sfLma__License__c', mapObjectsFields);

        // Add object name to query string:        
        soql += ' FROM sfLma__License__c' ;

        // Add Common Filter Where clause
        soql += ' WHERE sfLma__Status__c' + ' = \'' + 'Active' +'\'' + 'and IsDeleted = false';

        switch on dataFilter {
            when 'Latest Installs per App' {
                System.debug('Requesting Latest Installs Data');
                 // Add Order By clause
                soql += ' order by sfLma__Install_Date__c desc' ;

            }
            when 'Licenses Expiring Soon' {
                System.debug('Requesting Expiring Soon Data');
                soql += ' and sfLma__Expiration__c != null and sfLma__Expiration__c > TODAY';

                 // Add Order By clause
                 soql += ' order by sfLma__Expiration__c asc' ;
            }
         }

        ISVConsole_Helper.AddFieldToObjectsMap('sfLma__Status__c', 'sfLma__License__c', mapObjectsFields);
        ISVConsole_Helper.AddFieldToObjectsMap('IsDeleted', 'sfLma__License__c', mapObjectsFields);

       

        // Add return row limit to query string:        
        soql += ' limit ' + String.escapeSingleQuotes(rowsLimit);

        System.debug('######## generated soql: ' + soql);

        // CRUD\FLS Check: Before running the SOQL query check if the user who is invoking
        // this method has access to the Object and to the fields requested
        
        if (ISVConsole_Helper.UserHasAccessToObjectsAndFields(mapObjectsFields))
        {

            List<sfLma__License__c> lstQueriedRecords = Database.query(soql); 
            
            System.debug('######## lstQueriedRecords: ' + lstQueriedRecords);  
            
            for (sfLma__License__c e: lstQueriedRecords)
            {
                System.debug('######## e: ' + e);

                Map<String, Object> fieldsToValueMap = e.getPopulatedFieldsAsMap();
                System.debug('######## fieldsToValueMap: ' + fieldsToValueMap);
                Set <String> fieldsSet = new Set<String>();
                fieldsSet = fieldsToValueMap.keySet();
                System.debug('######## fieldsSet: ' + fieldsSet);

                listContainerController i = new listContainerController();
               
                i.licenseID = String.valueOf(e.Id);
                i.expirationDate = e.sfLma__Expiration__c;
                i.packageVersion = e.sfLma__Package_Version__c;
                i.packageName = e.sfLma__Package_Version__r.sfLma__Package__r.Name;                  
                i.installDateTime = e.createddate;
                if (fieldsSet.contains('sfLma__Lead__c'))
                {
                    i.companyName = e.sfLma__Lead__r.Company;
                    i.city = e.sfLma__Lead__r.City;
                    i.state = e.sfLma__Lead__r.State;
                    i.country = e.sfLma__Lead__r.Country;
                    i.leadID = e.sfLma__Lead__c;
                }
                if (fieldsSet.contains('sfLma__Account__c'))
                {
                    i.accountID = e.sfLma__Account__c;
                    i.companyName = e.sfLma__Account__r.Name;
                }
                if (String.isEmpty(i.companyName))
                    i.companyName = ' ';
                if (String.isEmpty(i.city))
                    i.city = ' ';
                if (String.isEmpty(i.state))
                    i.state = ' ';
                if (String.isEmpty(i.country))
                    i.country = ' ';
                if (String.isEmpty(i.leadID))
                    i.leadID = ' ';
                if (String.isEmpty(i.accountID))
                    i.accountID = ' ';
                
                i.orgID = e.sfLma__Subscriber_Org_ID__c;
                

                lstReturnRecords.add(i);

    			System.debug('######## i: ' + i);               
            }
            
        }
        
        System.debug('######## lstReturnRecords: ' + lstReturnRecords);
        
        return lstReturnRecords;

    }

>>>>>>> f88ac2d (added NBA)

<<<<<<< HEAD
    @AuraEnabled(cacheable=true)
<<<<<<< HEAD
    public static List<listContainerController> getLicenseData(String rowsLimit, String dataFilter, String maintenanceId) {

        System.debug('######## rowsLimit: ' + rowsLimit);
        System.debug('######## dataFilter: ' + dataFilter);
        List<String> licenseIds;
        if (String.isNotEmpty(maintenanceId))
        {
            Maintenance__c maintenanceRec = [SELECT ImpactedLicenseIds__c FROM Maintenance__c where Maintenance_External_Id__c =: maintenanceId  WITH SECURITY_ENFORCED limit 1];
            if (String.isNotEmpty(maintenanceRec.ImpactedLicenseIds__c) )
                licenseIds = maintenanceRec.ImpactedLicenseIds__c.split(',');
                
        }
        
        System.debug('######## licenseIds: ' + licenseIds);

        // CRUD / FLS Check - Create a map with the object names and fields for CRUD\FLS check
        mapObjectsFields = new Map<String, Set<String>>(); 

        List<listContainerController> lstReturnRecords = new List<listContainerController>();
        
        Integer rLimit = integer.valueOf(rowsLimit);
        System.debug('######## rLimit: ' + rLimit);

        String soql = 'Select createddate';
        ISVConsoleHelper.AddFieldToObjectsMap('createddate', 'sfLma__License__c', mapObjectsFields);

        soql += ', id';
        ISVConsoleHelper.AddFieldToObjectsMap('id', 'sfLma__License__c', mapObjectsFields);

        soql += ', sfLma__Lead__c';
        ISVConsoleHelper.AddFieldToObjectsMap('sfLma__Lead__c', 'sfLma__License__c', mapObjectsFields);

        soql += ', sfLma__Account__c';
        ISVConsoleHelper.AddFieldToObjectsMap('sfLma__Account__c', 'sfLma__License__c', mapObjectsFields);

        soql += ', sfLma__Contact__c';
        ISVConsoleHelper.AddFieldToObjectsMap('sfLma__Contact__c', 'sfLma__License__c', mapObjectsFields);

        soql += ', sfLma__Package_Version__c';
        ISVConsoleHelper.AddFieldToObjectsMap('sfLma__Package_Version__c', 'sfLma__License__c', mapObjectsFields);

        soql += ', sfLma__Package_Version__r.sfLma__Package__r.Name';
        ISVConsoleHelper.AddFieldToObjectsMap('Name', 'sfLma__Package__c', mapObjectsFields);

        soql += ', sfLma__Lead__r.Company';
        ISVConsoleHelper.AddFieldToObjectsMap('Company', 'Lead', mapObjectsFields);

        soql += ', sfLma__Lead__r.State';
        ISVConsoleHelper.AddFieldToObjectsMap('State', 'Lead', mapObjectsFields);

        soql += ', sfLma__Lead__r.City';
        ISVConsoleHelper.AddFieldToObjectsMap('City', 'Lead', mapObjectsFields);

        soql += ', sfLma__Lead__r.FirstName';
        ISVConsoleHelper.AddFieldToObjectsMap('FirstName', 'Lead', mapObjectsFields);

        soql += ', sfLma__Lead__r.LastName';
        ISVConsoleHelper.AddFieldToObjectsMap('LastName', 'Lead', mapObjectsFields);

        soql += ', sfLma__Lead__r.Email';
        ISVConsoleHelper.AddFieldToObjectsMap('Email', 'Lead', mapObjectsFields);

        soql += ', sfLma__Lead__r.Country';
        ISVConsoleHelper.AddFieldToObjectsMap('Country', 'Lead', mapObjectsFields);

        soql += ', sfLma__Lead__r.Latitude';
        ISVConsoleHelper.AddFieldToObjectsMap('Latitude', 'Lead', mapObjectsFields);

        soql += ', sfLma__Lead__r.Longitude';
        ISVConsoleHelper.AddFieldToObjectsMap('Longitude', 'Lead', mapObjectsFields);

        soql += ', sfLma__Lead__r.PostalCode';
        ISVConsoleHelper.AddFieldToObjectsMap('PostalCode', 'Lead', mapObjectsFields);

        soql += ', sfLma__Lead__r.Street';
        ISVConsoleHelper.AddFieldToObjectsMap('Street', 'Lead', mapObjectsFields);

        soql += ', sfLma__Account__r.Name';
        ISVConsoleHelper.AddFieldToObjectsMap('Name', 'Account', mapObjectsFields);

        soql += ', sfLma__Account__r.BillingCity';
        ISVConsoleHelper.AddFieldToObjectsMap('BillingCity', 'Account', mapObjectsFields);

        soql += ', sfLma__Account__r.BillingCountry';
        ISVConsoleHelper.AddFieldToObjectsMap('BillingCountry', 'Account', mapObjectsFields);

        soql += ', sfLma__Account__r.BillingLatitude';
        ISVConsoleHelper.AddFieldToObjectsMap('BillingLatitude', 'Account', mapObjectsFields);

        soql += ', sfLma__Account__r.BillingLongitude';
        ISVConsoleHelper.AddFieldToObjectsMap('BillingLongitude', 'Account', mapObjectsFields);

        soql += ', sfLma__Account__r.BillingPostalCode';
        ISVConsoleHelper.AddFieldToObjectsMap('BillingPostalCode', 'Account', mapObjectsFields);

        soql += ', sfLma__Account__r.BillingState';
        ISVConsoleHelper.AddFieldToObjectsMap('BillingState', 'Account', mapObjectsFields);

        soql += ', sfLma__Account__r.BillingStreet';
        ISVConsoleHelper.AddFieldToObjectsMap('BillingStreet', 'Account', mapObjectsFields);

        soql += ', sfLma__Account__r.ShippingCity';
        ISVConsoleHelper.AddFieldToObjectsMap('ShippingCity', 'Account', mapObjectsFields);

        soql += ', sfLma__Account__r.ShippingCountry';
        ISVConsoleHelper.AddFieldToObjectsMap('ShippingCountry', 'Account', mapObjectsFields);

        soql += ', sfLma__Account__r.ShippingLatitude';
        ISVConsoleHelper.AddFieldToObjectsMap('ShippingLatitude', 'Account', mapObjectsFields);

        soql += ', sfLma__Account__r.ShippingLongitude';
        ISVConsoleHelper.AddFieldToObjectsMap('ShippingLongitude', 'Account', mapObjectsFields);

        soql += ', sfLma__Account__r.ShippingPostalCode';
        ISVConsoleHelper.AddFieldToObjectsMap('ShippingPostalCode', 'Account', mapObjectsFields);

        soql += ', sfLma__Account__r.ShippingState';
        ISVConsoleHelper.AddFieldToObjectsMap('ShippingState', 'Account', mapObjectsFields);

        soql += ', sfLma__Account__r.ShippingStreet ';
        ISVConsoleHelper.AddFieldToObjectsMap('ShippingStreet', 'Account', mapObjectsFields);

        soql += ', sfLma__Contact__r.FirstName';
        ISVConsoleHelper.AddFieldToObjectsMap('FirstName', 'Contact', mapObjectsFields);

        soql += ', sfLma__Contact__r.LastName';
        ISVConsoleHelper.AddFieldToObjectsMap('LastName', 'Contact', mapObjectsFields);

        soql += ', sfLma__Contact__r.Email';
        ISVConsoleHelper.AddFieldToObjectsMap('Email', 'Contact', mapObjectsFields);

        soql += ', sfLma__Expiration__c';
        ISVConsoleHelper.AddFieldToObjectsMap('sfLma__Expiration__c', 'sfLma__License__c', mapObjectsFields);

        soql += ', sfLma__Subscriber_Org_ID__c';
        ISVConsoleHelper.AddFieldToObjectsMap('sfLma__Subscriber_Org_ID__c', 'sfLma__License__c', mapObjectsFields);

        // Add object name to query string:        
        soql += ' FROM sfLma__License__c' ;

        // Add Common Filter Where clause
        soql += ' WHERE sfLma__Status__c' + ' = \'' + 'Active' +'\'' + 'and IsDeleted = false';

        switch on dataFilter {
            when 'Latest Installs per App' {
                System.debug('Requesting Latest Installs Data');
                 // Add Order By clause
                soql += ' order by sfLma__Install_Date__c desc' ;

            }
            when 'Upcoming License Expirations' {
                System.debug('Requesting Expiring Soon Data');
                soql += ' and sfLma__Expiration__c != null and sfLma__Expiration__c > TODAY';

                 // Add Order By clause
                 soql += ' order by sfLma__Expiration__c asc' ;
            }
            when 'Customers Impacted' {
                System.debug('Customers impacted switch entered');
                if (licenseIds.size() > 0)
                {
                    String strIdsSoql;
                    if (licenseIds.size() == 1)
                    {
                        strIdsSoql = ' and id = \''  + licenseIds[0] + '\'' ;
                        soql += strIdsSoql ;
                    }
                    else 
                    {
                        String strConcatIds;
                        Integer count = 1;
                        for (String l : licenseIds)
                        {
                            if (count < licenseIds.size())
                            {
                                if (count == 1)
                                    strConcatIds =  '\'' + l + '\'' + ',' ;
                                else
                                    strConcatIds = strConcatIds + '\'' + l + '\'' + ',' ;
                            }
                            else {
                                strConcatIds = strConcatIds + '\'' + l + '\'' ;
                            }
                            count ++;
                        }
                        System.debug('strConcatIds : ' + strConcatIds);
                        strIdsSoql = ' and id in (' + strConcatIds +')' ;
                        soql += strIdsSoql;
                    }
                    System.debug('license Ids soql : ' + strIdsSoql);
                }
                
            }
         }

        ISVConsoleHelper.AddFieldToObjectsMap('sfLma__Status__c', 'sfLma__License__c', mapObjectsFields);
        ISVConsoleHelper.AddFieldToObjectsMap('IsDeleted', 'sfLma__License__c', mapObjectsFields);

       

        // Add return row limit to query string:        
        soql += ' limit ' + String.escapeSingleQuotes(rowsLimit);

        System.debug('######## generated soql: ' + soql);

        // CRUD\FLS Check: Before running the SOQL query check if the user who is invoking
        // this method has access to the Object and to the fields requested
        
        if (ISVConsoleHelper.UserHasAccessToObjectsAndFields(mapObjectsFields))
        {

            List<sfLma__License__c> lstQueriedRecords = Database.query(soql); 
            
            System.debug('######## lstQueriedRecords.size(): ' + lstQueriedRecords.size()); 
            System.debug('######## lstQueriedRecords: ' + lstQueriedRecords);  
            
            for (sfLma__License__c e: lstQueriedRecords)
            {
                System.debug('######## e: ' + e);

                Map<String, Object> fieldsToValueMap = e.getPopulatedFieldsAsMap();
                System.debug('######## fieldsToValueMap: ' + fieldsToValueMap);
                Set <String> fieldsSet = new Set<String>();
                fieldsSet = fieldsToValueMap.keySet();
                System.debug('######## fieldsSet: ' + fieldsSet);

                listContainerController i = new listContainerController();
               
                i.licenseID = String.valueOf(e.Id);
                i.expirationDate = e.sfLma__Expiration__c;
                i.packageVersion = e.sfLma__Package_Version__c;
                i.packageName = e.sfLma__Package_Version__r.sfLma__Package__r.Name;                  
                i.installDateTime = e.createddate;
                if (fieldsSet.contains('sfLma__Lead__c'))
                {
                    i.companyName = e.sfLma__Lead__r.Company;
                    i.city = e.sfLma__Lead__r.City;
                    i.state = e.sfLma__Lead__r.State;
                    i.country = e.sfLma__Lead__r.Country;
                    i.leadID = e.sfLma__Lead__c;
                    i.email = e.sfLma__Lead__r.Email;
                }
                if (fieldsSet.contains('sfLma__Account__c'))
                {
                    i.accountID = e.sfLma__Account__c;
                    i.companyName = e.sfLma__Account__r.Name;
                }
                if (fieldsSet.contains('sfLma__Contact__r'))
                {
                    i.email = e.sfLma__Contact__r.Email;
                }
                if (String.isEmpty(i.companyName))
                    i.companyName = ' ';
                if (String.isEmpty(i.city))
                    i.city = ' ';
                if (String.isEmpty(i.state))
                    i.state = ' ';
                if (String.isEmpty(i.country))
                    i.country = ' ';
                if (String.isEmpty(i.leadID))
                    i.leadID = ' ';
                if (String.isEmpty(i.accountID))
                    i.accountID = ' ';
                if (String.isEmpty(i.email))
                    i.email = ' ';
                
                i.orgID = e.sfLma__Subscriber_Org_ID__c;
                

                lstReturnRecords.add(i);

    			System.debug('######## i: ' + i);               
            }
            
        }
        System.debug('######## lstReturnRecords.size(): ' + lstReturnRecords.size());
        System.debug('######## lstReturnRecords: ' + lstReturnRecords);
        
        return lstReturnRecords;

=======
    public static List<sfLma__License__c> getLastestPackageInstalls() {
        return [
            SELECT createddate, sfLma__Package_Version__r.sfLma__Package__r.Name , 
            sfLma__Install_Date__c,sfLma__Package_Version__c, sfLma__Package_License_ID__c,
            sfLma__Lead__r.Company, sfLma__Lead__r.State, sfLma__Lead__r.City, sfLma__Lead__r.FirstName,
            sfLma__Lead__r.LastName, sfLma__Lead__r.Email, sfLma__Lead__r.Country, sfLma__Account__r.Name,
            sfLma__Contact__r.FirstName, sfLma__Contact__r.LastName, sfLma__Contact__r.Email,Id,LastModifiedById,
            LastModifiedDate,Name,sfLma__Account__c,sfLma__Contact__c,sfLma__Expiration_Date__c,sfLma__Expiration__c,
            sfLma__Lead__c,sfLma__Licensed_Seats__c,sfLma__License_Status__c,sfLma__License_Type__c,sfLma__Proxy_User__c,
            sfLma__Seats__c,sfLma__Status__c,sfLma__Subscriber_Org_ID__c,sfLma__Used_Licenses__c 
            FROM sfLma__License__c 
            WHERE sfLma__Status__c  = 'Active' and IsDeleted = false order by sfLma__Install_Date__c desc    
            LIMIT 10
            ];
>>>>>>> 33dcdb1 (added)
    }
<<<<<<< HEAD


    
=======
>>>>>>> f88ac2d (added NBA)
=======
    
>>>>>>> 033b27d (added map controller apex)
}