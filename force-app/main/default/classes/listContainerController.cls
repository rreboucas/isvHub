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
    @AuraEnabled
    public location location { get;set; }
    @AuraEnabled
    public String email { get;set; }

    @AuraEnabled(cacheable=true)
    public static List<listContainerController> getLicenseData(String rowsLimit, String dataFilter, List<String> licenseIds) {

        System.debug('######## rowsLimit: ' + rowsLimit);
        System.debug('######## licenseIds: ' + licenseIds);
        System.debug('######## dataFilter: ' + dataFilter);

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
            when 'Licenses Expiring Soon' {
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

    }


    
}