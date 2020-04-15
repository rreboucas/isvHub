public with sharing class isvConsoleMapController {
    
    private static Map<String, Set<String>> mapObjectsFields = null;

    @AuraEnabled
    public String value { get;set; }
    @AuraEnabled
    public String icon { get;set; }
    @AuraEnabled
    public String title { get;set; }
    @AuraEnabled
    public Object location { get;set; }
    
    /*@AuraEnabled
    public location location { get;set; } */


    @AuraEnabled(cacheable=true)
    public static List<isvConsoleMapController> getLocationData() {
        // CRUD / FLS Check - Create a map with the object names and fields for CRUD\FLS check
        mapObjectsFields = new Map<String, Set<String>>(); 

        List<isvConsoleMapController> lstReturnRecords = new List<isvConsoleMapController>();

        String soql = 'Select id';
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

        // Add object name to query string:        
        soql += ' FROM sfLma__License__c' ;

        // Add Common Filter Where clause
        soql += ' WHERE sfLma__Status__c' + ' = \'' + 'Active' +'\'' + 'and IsDeleted = false and (sfLma__Lead__r.State <> NULL OR sfLma__Lead__r.Country <> NULL OR sfLma__Lead__r.City <> NULL OR sfLma__Lead__r.Company <> NULL OR sfLma__Lead__r.Latitude <> NULL OR sfLma__Lead__r.Longitude <> NULL OR sfLma__Lead__r.PostalCode <> NULL OR sfLma__Lead__r.Street <> NULL OR sfLma__Account__r.ShippingStreet <> NULL OR sfLma__Account__r.ShippingState <> NULL OR sfLma__Account__r.ShippingPostalCode <> NULL OR sfLma__Account__r.ShippingLongitude <> NULL OR sfLma__Account__r.ShippingLatitude <> NULL OR sfLma__Account__r.ShippingCountry <> NULL OR sfLma__Account__r.ShippingCity <> NULL OR sfLma__Account__r.BillingStreet <> NULL OR sfLma__Account__r.BillingState <> NULL OR sfLma__Account__r.BillingPostalCode <> NULL OR sfLma__Account__r.BillingLongitude <> NULL OR sfLma__Account__r.BillingLatitude <> NULL OR sfLma__Account__r.BillingCountry <> NULL OR sfLma__Account__r.BillingCity <> NULL OR sfLma__Account__r.Name <> NULL )';

        ISVConsole_Helper.AddFieldToObjectsMap('sfLma__Status__c', 'sfLma__License__c', mapObjectsFields);
        ISVConsole_Helper.AddFieldToObjectsMap('IsDeleted', 'sfLma__License__c', mapObjectsFields);

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

                isvConsoleMapController i = new isvConsoleMapController();
                i.icon = 'custom:custom26';
               
                location locObj = new location();
                Map<String, String> obj = new Map<String, String>();
                
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
                    locObj.Longitude = e.sfLma__Lead__r.Longitude;

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
                }
                // i.location = locObj;

                // Only add to the Json Map - location attribute the attributes that have values

                if (String.isNotEmpty(locObj.City))
                    obj.put('City', locObj.City);
                if (String.isNotEmpty(locObj.Country))
                    obj.put('Country', locObj.Country);
                if (String.isNotEmpty(locObj.State))
                    obj.put('State', locObj.State);

                System.debug('######## Map obj: ' + obj);
                //String serlzObj = JSON.Serialize(obj);
                //System.debug('######## serlzObj: ' + serlzObj);
                i.location =  obj;
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
                */
                System.debug('######## i: ' + i);               

                // ---- For Loop Ends ----
            }
            
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

}
