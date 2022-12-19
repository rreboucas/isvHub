global class callTrustAPI {
    @future(callout=true)
    public static void getMaintenances()
    { 
        List<Maintenance__c> lstOfNewEvents = new List<Maintenance__c>();
        List<sfLma__License__c> lstLicenses;

        lstLicenses = [SELECT id, sfLma__Instance__c FROM sfLma__License__c where sfLma__Status__c IN ('Active', 'Trial') and sfLma__Instance__c <> NULL WITH SECURITY_ENFORCED order by sfLma__Instance__c asc];
        system.debug('####### schedFetchMaintenance - lstLicenses: ' + lstLicenses);

        Map<String, List<String>> intcMap = new Map<String, List<String>>();

        for (sfLma__License__c e: lstLicenses)
        {
            if (intcMap.containsKey(e.sfLma__Instance__c))
                intcMap.get(e.sfLma__Instance__c).add(e.id);
            else
                intcMap.put(e.sfLma__Instance__c, new List<String> {e.id});
        }
        system.debug('####### intcMap: ' + intcMap);
        
        String releaseNameEncoded = EncodingUtil.urlEncode('Major Release', 'UTF-8');
        HttpRequest req = new HttpRequest();

        //String strEndPoint = 'https://api.status.salesforce.com/v1/maintenances?order=plannedStartTime&name=' + releaseNameEncoded ;
        String strEndPoint = 'https://api.status.salesforce.com/v1/maintenances/preview' ;
		system.debug('######## strEndPoint: ' + strEndPoint );
		req.setEndpoint(strEndPoint) ;
        req.setMethod('GET');

        Http http = new Http();
		HTTPResponse res = http.send(req);
		
		//get the list of header names (keys)
		string[] headerkeys = res.getHeaderKeys();

		//create an object to store your header key-value pairs
		Map<string, string> headers = new map<string, string>();

		//iterate through they keys, and populate your map
		for(string s : headerkeys){
		headers.put(s,res.getHeader(s));
		system.debug('header: ' + s + ' value: ' + res.getHeader(s));
		}

        String resBody = res.getBody();
        system.debug('####### API Response: ' + resBody);

        // 3. Parse API response with helper class
        List<Maintenance> lstMaintenances = parse(resBody);
        system.debug('####### lstMaintenances: ' + lstMaintenances);

        // 4. Loop through list of Maintenances, verify which ones affect customers and create list of statusServerController to return to LWC
        for (Maintenance m: lstMaintenances)
        {        
            // 4.1 Check to see if any of the ISV customers are affected
            system.debug('####### m.instanceKeys: ' + m.instanceKeys);
            if (m.instanceKeys != null && !m.instanceKeys.isEmpty() && intcMap.containsKey(m.instanceKeys[0]) && m.name.containsIgnoreCase('Major'))
            {
                Maintenance__c i = new Maintenance__c();
                i.Start_Date_Time__c = convertISO8601(m.plannedStartTime);
                
                i.Total_Number_of_Records__c = headers.get('X-Total-Count') ;
				System.debug('######## i.totalNumRecs: ' + i.Total_Number_of_Records__c);
				i.Maintenance_External_Id__c = String.valueOf(m.id);
				System.debug('######## i.maintenanceId: ' + i.Maintenance_External_Id__c);
				i.Event_Name__c = m.name;
                System.debug('######## i.eventName: ' + i.Event_Name__c);
                i.Name = i.Event_Name__c + ' - ' + i.Maintenance_External_Id__c;
				i.Number_of_Impacted_Customers__c = String.valueOf(intcMap.get(m.instanceKeys[0]).size());
				System.debug('######## i.numImpactedCustomers: ' + i.Number_of_Impacted_Customers__c);
                List<String> lstInstcKeys = intcMap.get(m.instanceKeys[0]);
                for (String s: lstInstcKeys){
                    if (String.isNotEmpty(i.ImpactedLicenseIds__c))
                        i.ImpactedLicenseIds__c = i.ImpactedLicenseIds__c + ',' + s;
                    else 
                        i.ImpactedLicenseIds__c = s;
                }
				System.debug('######## i.impactedLicenseIds: ' + i.ImpactedLicenseIds__c);
				i.End_Date_Time__c = convertISO8601(m.plannedEndTime);
				System.debug('######## i.endDateTime: ' + i.End_Date_Time__c);
				i.Instance_Name__c = m.instanceKeys[0];
                System.debug('######## i.instanceName: ' + i.Instance_Name__c);
                if (i.Instance_Name__c.contains('CS'))
                    i.Is_Sandbox__c = true;
                if (i.Instance_Name__c.contains('GS0'))
                    i.Is_Pre_Release__c = true;
				i.Availability__c = m.message.availability;
				System.debug('######## i.availability: ' + i.Availability__c);
                lstOfNewEvents.add(i);
            }

        }
        System.debug('######## lstOfNewEvents: ' + lstOfNewEvents);

        try {
            upsert lstOfNewEvents Maintenance_External_Id__c; 
        } catch (DmlException e) {
            System.debug(e.getMessage());
        }
    }

    public static DateTime convertISO8601( String iso8601_ts)
    {
        DateTime dt = (DateTime) JSON.deserialize('"' + iso8601_ts + '"', DateTime.class);
        return DateTime.newInstance( dt.getTime());
    }
    
    class Message {
            public String maintenanceType;
            public String availability;
            public String eventStatus;
        }
    
    class MaintenanceImpacts {
        }
    
    class MaintenanceEvents {
            public Integer id;
            public String type;
            public String message;
            public String createdAt;
            public String updatedAt;
        }

    class Maintenance {
        public Integer id;
        public Message message;
        public String externalId;
        public String name;
        public String plannedStartTime;
        public String plannedEndTime;
        public String additionalInformation;
        public Boolean isCore;
        public Boolean affectsAll;
        public String createdAt;
        public String updatedAt;
        public List<MaintenanceImpacts> MaintenanceImpacts;
        public List<MaintenanceEvents> MaintenanceEvents;
        public List<String> instanceKeys;
        public List<String> serviceKeys;
 
    }
    
    public static List<Maintenance> parse(String json) {
            return (List<Maintenance>) System.JSON.deserialize(json, List<Maintenance>.class);
        }

}