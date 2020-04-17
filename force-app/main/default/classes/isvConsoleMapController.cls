<<<<<<< HEAD
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

=======
>>>>>>> 033b27d (added map controller apex)
public with sharing class isvConsoleMapController {
    
    private static Map<String, Set<String>> mapObjectsFields = null;

    @AuraEnabled
    public String value { get;set; }
    @AuraEnabled
    public String icon { get;set; }
    @AuraEnabled
    public String title { get;set; }
    @AuraEnabled
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 6d71a0f (markers working)
    public Object location { get;set; }
    
    /*@AuraEnabled
    public location location { get;set; } */
<<<<<<< HEAD
=======
    public location location { get;set; }
>>>>>>> 033b27d (added map controller apex)
=======
>>>>>>> 6d71a0f (markers working)


    @AuraEnabled(cacheable=true)
    public static List<isvConsoleMapController> getLocationData() {
        // CRUD / FLS Check - Create a map with the object names and fields for CRUD\FLS check
        mapObjectsFields = new Map<String, Set<String>>(); 

        List<isvConsoleMapController> lstReturnRecords = new List<isvConsoleMapController>();

        String soql = 'Select id';
<<<<<<< HEAD
        ISVConsoleHelper.AddFieldToObjectsMap('id', 'sfLma__License__c', mapObjectsFields);

        soql += ', sfLma__Lead__c';
        ISVConsoleHelper.AddFieldToObjectsMap('sfLma__Lead__c', 'sfLma__License__c', mapObjectsFields);

        soql += ', sfLma__Account__c';
        ISVConsoleHelper.AddFieldToObjectsMap('sfLma__Account__c', 'sfLma__License__c', mapObjectsFields);

        soql += ', sfLma__Lead__r.Company';
        ISVConsoleHelper.AddFieldToObjectsMap('Company', 'Lead', mapObjectsFields);

        soql += ', sfLma__Lead__r.State';
        ISVConsoleHelper.AddFieldToObjectsMap('State', 'Lead', mapObjectsFields);

        soql += ', sfLma__Lead__r.City';
        ISVConsoleHelper.AddFieldToObjectsMap('City', 'Lead', mapObjectsFields);

        soql += ', sfLma__Lead__r.Latitude';
        ISVConsoleHelper.AddFieldToObjectsMap('Latitude', 'Lead', mapObjectsFields);

        soql += ', sfLma__Lead__r.Longitude';
        ISVConsoleHelper.AddFieldToObjectsMap('Longitude', 'Lead', mapObjectsFields);

        soql += ', sfLma__Lead__r.PostalCode';
        ISVConsoleHelper.AddFieldToObjectsMap('PostalCode', 'Lead', mapObjectsFields);

        soql += ', sfLma__Lead__r.Street';
        ISVConsoleHelper.AddFieldToObjectsMap('Street', 'Lead', mapObjectsFields);

        soql += ', sfLma__Lead__r.Country';
        ISVConsoleHelper.AddFieldToObjectsMap('Country', 'Lead', mapObjectsFields);

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
=======
        ISVConsole_Helper.AddFieldToObjectsMap('id', 'sfLma__License__c', mapObjectsFields);

        soql += ', sfLma__Lead__c';
        ISVConsole_Helper.AddFieldToObjectsMap('sfLma__Lead__c', 'sfLma__License__c', mapObjectsFields);

        soql += ', sfLma__Account__c';
        ISVConsole_Helper.AddFieldToObjectsMap('sfLma__Account__c', 'sfLma__License__c', mapObjectsFields);

        soql += ', sfLma__Lead__r.Company';
        ISVConsole_Helper.AddFieldToObjectsMap('Company', 'Lead', mapObjectsFields);

        soql += ', sfLma__Lead__r.State';
        ISVConsole_Helper.AddFieldToObjectsMap('State', 'Lead', mapObjectsFields);

        soql += ', sfLma__Lead__r.City';
        ISVConsole_Helper.AddFieldToObjectsMap('City', 'Lead', mapObjectsFields);

        soql += ', sfLma__Lead__r.Latitude';
        ISVConsole_Helper.AddFieldToObjectsMap('Latitude', 'Lead', mapObjectsFields);

        soql += ', sfLma__Lead__r.Longitude';
        ISVConsole_Helper.AddFieldToObjectsMap('Longitude', 'Lead', mapObjectsFields);

        soql += ', sfLma__Lead__r.PostalCode';
        ISVConsole_Helper.AddFieldToObjectsMap('PostalCode', 'Lead', mapObjectsFields);

        soql += ', sfLma__Lead__r.Street';
        ISVConsole_Helper.AddFieldToObjectsMap('Street', 'Lead', mapObjectsFields);

        soql += ', sfLma__Lead__r.Country';
        ISVConsole_Helper.AddFieldToObjectsMap('Country', 'Lead', mapObjectsFields);

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
>>>>>>> 033b27d (added map controller apex)

        // Add object name to query string:        
        soql += ' FROM sfLma__License__c' ;

        // Add Common Filter Where clause
<<<<<<< HEAD
<<<<<<< HEAD
        soql += ' WHERE sfLma__Status__c' + ' = \'' + 'Active' +'\'' + 'and IsDeleted = false and (sfLma__Lead__r.State <> NULL OR sfLma__Lead__r.Country <> NULL OR sfLma__Lead__r.City <> NULL OR sfLma__Lead__r.Company <> NULL OR sfLma__Lead__r.Latitude <> NULL OR sfLma__Lead__r.Longitude <> NULL OR sfLma__Lead__r.PostalCode <> NULL OR sfLma__Lead__r.Street <> NULL OR sfLma__Account__r.ShippingStreet <> NULL OR sfLma__Account__r.ShippingState <> NULL OR sfLma__Account__r.ShippingPostalCode <> NULL OR sfLma__Account__r.ShippingLongitude <> NULL OR sfLma__Account__r.ShippingLatitude <> NULL OR sfLma__Account__r.ShippingCountry <> NULL OR sfLma__Account__r.ShippingCity <> NULL OR sfLma__Account__r.BillingStreet <> NULL OR sfLma__Account__r.BillingState <> NULL OR sfLma__Account__r.BillingPostalCode <> NULL OR sfLma__Account__r.BillingLongitude <> NULL OR sfLma__Account__r.BillingLatitude <> NULL OR sfLma__Account__r.BillingCountry <> NULL OR sfLma__Account__r.BillingCity <> NULL OR sfLma__Account__r.Name <> NULL )';

        ISVConsoleHelper.AddFieldToObjectsMap('sfLma__Status__c', 'sfLma__License__c', mapObjectsFields);
        ISVConsoleHelper.AddFieldToObjectsMap('IsDeleted', 'sfLma__License__c', mapObjectsFields);
=======
        soql += ' WHERE sfLma__Status__c' + ' = \'' + 'Active' +'\'' + 'and IsDeleted = false and (sfLma__Lead__r.State <> NULL OR sfLma__Lead__r.Country <> NULL OR sfLma__Lead__r.City <> NULL OR sfLma__Lead__r.Company <> NULL OR sfLma__Lead__r.Latitude <> NULL OR sfLma__Lead__r.Longitude <> NULL OR sfLma__Lead__r.PostalCode <> NULL OR sfLma__Lead__r.Street <> NULL OR sfLma__Account__r.ShippingStreet <> NULL OR sfLma__Account__r.ShippingState <> NULL OR sfLma__Account__r.ShippingPostalCode <> NULL OR sfLma__Account__r.ShippingLongitude <> NULL OR sfLma__Account__r.ShippingLatitude <> NULL OR sfLma__Account__r.ShippingCountry <> NULL OR sfLma__Account__r.ShippingCity <> NULL OR sfLma__Account__r.BillingStreet <> NULL OR sfLma__Account__r.BillingState <> NULL OR sfLma__Account__r.BillingPostalCode <> NULL OR sfLma__Account__r.BillingLongitude <> NULL OR sfLma__Account__r.BillingLatitude <> NULL OR sfLma__Account__r.BillingCountry <> NULL OR sfLma__Account__r.BillingCity <> NULL OR sfLma__Account__r.Name <> NULL ) limit 20 ';
=======
        soql += ' WHERE sfLma__Status__c' + ' = \'' + 'Active' +'\'' + 'and IsDeleted = false and (sfLma__Lead__r.State <> NULL OR sfLma__Lead__r.Country <> NULL OR sfLma__Lead__r.City <> NULL OR sfLma__Lead__r.Company <> NULL OR sfLma__Lead__r.Latitude <> NULL OR sfLma__Lead__r.Longitude <> NULL OR sfLma__Lead__r.PostalCode <> NULL OR sfLma__Lead__r.Street <> NULL OR sfLma__Account__r.ShippingStreet <> NULL OR sfLma__Account__r.ShippingState <> NULL OR sfLma__Account__r.ShippingPostalCode <> NULL OR sfLma__Account__r.ShippingLongitude <> NULL OR sfLma__Account__r.ShippingLatitude <> NULL OR sfLma__Account__r.ShippingCountry <> NULL OR sfLma__Account__r.ShippingCity <> NULL OR sfLma__Account__r.BillingStreet <> NULL OR sfLma__Account__r.BillingState <> NULL OR sfLma__Account__r.BillingPostalCode <> NULL OR sfLma__Account__r.BillingLongitude <> NULL OR sfLma__Account__r.BillingLatitude <> NULL OR sfLma__Account__r.BillingCountry <> NULL OR sfLma__Account__r.BillingCity <> NULL OR sfLma__Account__r.Name <> NULL )';
>>>>>>> 6d71a0f (markers working)

        ISVConsole_Helper.AddFieldToObjectsMap('sfLma__Status__c', 'sfLma__License__c', mapObjectsFields);
        ISVConsole_Helper.AddFieldToObjectsMap('IsDeleted', 'sfLma__License__c', mapObjectsFields);
>>>>>>> 033b27d (added map controller apex)

        System.debug('######## generated soql: ' + soql);

        // CRUD\FLS Check: Before running the SOQL query check if the user who is invoking
        // this method has access to the Object and to the fields requested
        
<<<<<<< HEAD
        if (ISVConsoleHelper.UserHasAccessToObjectsAndFields(mapObjectsFields))
=======
        if (ISVConsole_Helper.UserHasAccessToObjectsAndFields(mapObjectsFields))
>>>>>>> 033b27d (added map controller apex)
        {

            List<sfLma__License__c> lstQueriedRecords = Database.query(soql); 
            
<<<<<<< HEAD
<<<<<<< HEAD
            System.debug('######## lstQueriedRecords: ' + lstQueriedRecords);
            
            Map<String, isvConsoleMapController> mapUniqueRecs = new Map<String, isvConsoleMapController> ();
=======
            System.debug('######## lstQueriedRecords: ' + lstQueriedRecords);  
>>>>>>> 033b27d (added map controller apex)
=======
            System.debug('######## lstQueriedRecords: ' + lstQueriedRecords);
            
            Map<String, isvConsoleMapController> mapUniqueRecs = new Map<String, isvConsoleMapController> ();
>>>>>>> ed6f09d (added badge)
            
            for (sfLma__License__c e: lstQueriedRecords)
            {
                System.debug('######## e: ' + e);

                Map<String, Object> fieldsToValueMap = e.getPopulatedFieldsAsMap();
                System.debug('######## fieldsToValueMap: ' + fieldsToValueMap);
                Set <String> fieldsSet = new Set<String>();
                fieldsSet = fieldsToValueMap.keySet();
                System.debug('######## fieldsSet: ' + fieldsSet);

                isvConsoleMapController i = new isvConsoleMapController();
                i.icon = 'custom:custom26';
               
                location locObj = new location();
<<<<<<< HEAD
<<<<<<< HEAD
                Map<String, String> obj = new Map<String, String>();
=======
>>>>>>> 033b27d (added map controller apex)
=======
                Map<String, String> obj = new Map<String, String>();
>>>>>>> 6d71a0f (markers working)
                
                if (fieldsSet.contains('sfLma__Lead__c'))
                {
                    i.title = e.sfLma__Lead__r.Company;
                    i.value = e.sfLma__Lead__c;
                   
                    locObj.City = e.sfLma__Lead__r.City;
                    locObj.State = e.sfLma__Lead__r.State;
                    locObj.Street = e.sfLma__Lead__r.Street;
                    locObj.Country = e.sfLma__Lead__r.Country;
                    locObj.PostalCode = e.sfLma__Lead__r.PostalCode;
                    locObj.Latitude = e.sfLma__Lead__r.Latitude;
<<<<<<< HEAD
<<<<<<< HEAD
                    System.debug('######## e.sfLma__Lead__r.Latitude: ' + locObj.Latitude);
                    locObj.Longitude = e.sfLma__Lead__r.Longitude;
                    System.debug('######## e.sfLma__Lead__r.Longitude: ' + locObj.Longitude);
=======
                    locObj.Longitude = e.sfLma__Lead__r.Longitude;
>>>>>>> 033b27d (added map controller apex)
=======
                    System.debug('######## e.sfLma__Lead__r.Latitude: ' + locObj.Latitude);
                    locObj.Longitude = e.sfLma__Lead__r.Longitude;
                    System.debug('######## e.sfLma__Lead__r.Longitude: ' + locObj.Longitude);
>>>>>>> ed6f09d (added badge)

                }
                if (fieldsSet.contains('sfLma__Account__c'))
                {
                    i.title = e.sfLma__Account__r.Name;
                    i.value = e.sfLma__Account__c;

                    if (String.isEmpty(locObj.City))
                        locObj.City = e.sfLma__Account__r.BillingCity;
                    else if (String.isEmpty(locObj.City))
                        locObj.City = e.sfLma__Account__r.ShippingCity;

                    if (String.isEmpty(locObj.State))
                        locObj.State = e.sfLma__Account__r.BillingState;
                    else if (String.isEmpty(locObj.State))
                        locObj.State = e.sfLma__Account__r.ShippingState;

                    if (String.isEmpty(locObj.Street))
                        locObj.Street = e.sfLma__Account__r.BillingStreet;
                    else if (String.isEmpty(locObj.Street))
                        locObj.Street = e.sfLma__Account__r.ShippingStreet;
                    
                    if (String.isEmpty(locObj.Country))
                        locObj.Country = e.sfLma__Account__r.BillingCountry;
                    else if (String.isEmpty(locObj.Street))
                        locObj.Country = e.sfLma__Account__r.ShippingCountry;

                    if (String.isEmpty(locObj.PostalCode))
                        locObj.PostalCode = e.sfLma__Account__r.BillingPostalCode;
                    else if (String.isEmpty(locObj.PostalCode))
                        locObj.PostalCode = e.sfLma__Account__r.ShippingPostalCode;

                    if (locObj.Latitude == null)
                        locObj.Latitude = e.sfLma__Account__r.BillingLatitude;
                    else if (locObj.Latitude == null)
                        locObj.Latitude = e.sfLma__Account__r.ShippingLatitude;

                    if (locObj.Longitude == null)
                        locObj.Longitude = e.sfLma__Account__r.BillingLongitude;
                    else if (locObj.Longitude == null)
                        locObj.Longitude = e.sfLma__Account__r.ShippingLongitude;
<<<<<<< HEAD

                    System.debug('######## e.sfLma__Account__r.Latitude: ' + locObj.Latitude);
                    System.debug('######## e.sfLma__Account__r.Longitude: ' + locObj.Longitude);
                }
                // i.location = locObj;

                // Only add to the Json Map - location attribute the attributes that have values
                
                if (locObj.Latitude != null && locObj.Longitude != null)
                {
                    System.debug('######## Has Latitude and Long: ' + locObj.Latitude.toPlainString());
                    obj.put('Latitude', locObj.Latitude.toPlainString());
                    obj.put('Longitude', locObj.Longitude.toPlainString());

                }
                /*
                else 
                {
                    if (String.isNotEmpty(locObj.City))
                    obj.put('City', locObj.City);
                    if (String.isNotEmpty(locObj.Country))
                        obj.put('Country', locObj.Country);
                    if (String.isNotEmpty(locObj.State))
                        obj.put('State', locObj.State);
                }
                */
                System.debug('######## Map obj: ' + obj);
                //String serlzObj = JSON.Serialize(obj);
                //System.debug('######## serlzObj: ' + serlzObj);
                i.location =  obj;
                if (String.isNotEmpty(i.title) && (obj.containsKey('Latitude') || obj.containsKey('Longitude')))
                    mapUniqueRecs.put(i.title, i);

=======
                }
                // i.location = locObj;

                // Only add to the Json Map - location attribute the attributes that have values
                
                if (locObj.Latitude != null && locObj.Longitude != null)
                {
                    System.debug('######## Has Latitude and Long: ' + locObj.Latitude.toPlainString());
                    obj.put('Latitude', locObj.Latitude.toPlainString());
                    obj.put('Longitude', locObj.Longitude.toPlainString());

                }
                /*
                else 
                {
                    if (String.isNotEmpty(locObj.City))
                    obj.put('City', locObj.City);
                    if (String.isNotEmpty(locObj.Country))
                        obj.put('Country', locObj.Country);
                    if (String.isNotEmpty(locObj.State))
                        obj.put('State', locObj.State);
                }
                */
                System.debug('######## Map obj: ' + obj);
                //String serlzObj = JSON.Serialize(obj);
                //System.debug('######## serlzObj: ' + serlzObj);
                i.location =  obj;
<<<<<<< HEAD
                if (String.isNotEmpty(i.title) && obj.containsKey('Country'))
                    lstReturnRecords.add(i);
                /*System.debug('######## i.location: ' + i.location);
                System.debug('######## i.location.Country: ' + i.location.Country);
                if (String.isNotEmpty(i.title) && String.isNotEmpty(i.location.Country))
                    {
                        System.debug('######## entered check for i.location.Country: ' + i.location.Country);
                        System.debug('######## entered check for i.location.State: ' + i.location.State);
                        System.debug('######## entered check for i.Title: ' + i.title);
                        System.debug('######## entered check for i.Value: ' + i.value);
                        lstReturnRecords.add(i);
                    }
<<<<<<< HEAD
>>>>>>> 033b27d (added map controller apex)
=======
                */
>>>>>>> 6d71a0f (markers working)
=======
                if (String.isNotEmpty(i.title) && (obj.containsKey('Latitude') || obj.containsKey('Longitude')))
                    mapUniqueRecs.put(i.title, i);

>>>>>>> ed6f09d (added badge)
                System.debug('######## i: ' + i);               

                // ---- For Loop Ends ----
            }
<<<<<<< HEAD
<<<<<<< HEAD

                lstReturnRecords = mapUniqueRecs.values();
=======
>>>>>>> 033b27d (added map controller apex)
=======

                lstReturnRecords = mapUniqueRecs.values();
>>>>>>> ed6f09d (added badge)
            
        }
        
        System.debug('######## lstReturnRecords: ' + lstReturnRecords);
        
        return lstReturnRecords;

    }


    class location {
        // Location inner class to capture location attributes for each install

        public String City { get;set; }
        public String Country { get;set; }
        public String PostalCode { get;set; }
        public String State { get;set; }
        public String Street { get;set; }
        public Decimal Latitude { get;set; }
        public Decimal Longitude { get;set; }

    }

<<<<<<< HEAD
    @AuraEnabled(cacheable=true)
    public static String getOrgURL() {
        string urler = URL.getSalesforceBaseUrl().toString();
        
        System.debug('######## urler: ' + urler);
        
        return urler;
    }
    
    @AuraEnabled(cacheable=false)
    public static String getMatchLeadsCountryAndStateJob() {
        String strUpdateResult;

        Map<String, String> countryMap = new Map<String, String>(); 
        for(Lead rec : [SELECT Name,Email, Country FROM Lead where Country <> NULL WITH SECURITY_ENFORCED  order by Email, lastModifiedDate asc ])
                countryMap.put(rec.Email, rec.Country);

        Map<String, String> stateMap = new Map<String, String>(); 
        for(Lead rec : [SELECT Name, State, Email FROM Lead where State <> NULL WITH SECURITY_ENFORCED  order by Email, lastModifiedDate asc])
                stateMap.put(rec.Email, rec.State);

        System.debug('### stateMap'+ stateMap);

        List<Lead> lstLeadsToUpdate = [SELECT Id, Email, Country, State from Lead where (Country = NULL OR State = NULL) and LeadSource LIKE 'Package Installation%' and isConverted = false WITH SECURITY_ENFORCED  ];

        System.debug('### lstLeadsToUpdate - before'+ lstLeadsToUpdate);
        if (lstLeadsToUpdate.size() == 0 || lstLeadsToUpdate.isEmpty())
            strUpdateResult = 'There are no records to update. ';

        for (Lead l : lstLeadsToUpdate) {

            l.Country = countryMap.get(l.Email);
            l.State = stateMap.get(l.Email);

        }

        System.debug('### lstLeadsToUpdate- after'+ lstLeadsToUpdate);

        Database.SaveResult[] srList = Database.update(lstLeadsToUpdate, false);

        // Database method to insert the records in List
        // Iterate through each returned result by the method
        Integer successCount = 0;
        Integer errorCount = 0;

        for (Database.SaveResult sr : srList) {
        if (sr.isSuccess()) {
            successCount++;
        } else {
            // This condition will be executed for failed records
            for(Database.Error objErr : sr.getErrors()) {
                errorCount++;
            }
        }
        }
        if (successCount > 0)
            strUpdateResult = 'Successfully updated ' + String.valueOf(successCount) + ' Leads' ;
        
        return strUpdateResult;
    }

}
=======
}
>>>>>>> 033b27d (added map controller apex)
