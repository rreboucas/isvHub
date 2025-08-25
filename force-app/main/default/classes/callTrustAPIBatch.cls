global class callTrustAPIBatch implements Database.Batchable<sObject>, Database.AllowsCallouts {
    global Map<String, List<String>> intcMap = new Map<String, List<String>>();
    global List<Maintenance__c> lstOfNewEvents = new List<Maintenance__c>();
    
    global Database.QueryLocator start(Database.BatchableContext BC) {
        String query = 'SELECT id, sfLma__Instance__c FROM sfLma__License__c where sfLma__Status__c IN (\'Active\', \'Trial\') and sfLma__Instance__c <> NULL WITH SECURITY_ENFORCED order by sfLma__Instance__c asc';
        return Database.getQueryLocator(query);
    }
    
    global void execute(Database.BatchableContext BC, List<sfLma__License__c> licenses) {
        for (sfLma__License__c e : licenses) {
            if (intcMap.containsKey(e.sfLma__Instance__c))
                intcMap.get(e.sfLma__Instance__c).add(e.id);
            else
                intcMap.put(e.sfLma__Instance__c, new List<String> {e.id});
        }

        system.debug('####### intcMap: ' + intcMap);
        
        String releaseNameEncoded = EncodingUtil.urlEncode('Major Release', 'UTF-8');
        HttpRequest req = new HttpRequest();
        String strEndPoint = 'https://api.status.salesforce.com/v1/maintenances/preview?startTime='+ date.today().format() +'&name=' + releaseNameEncoded + '&product=Sales_Cloud' ;

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
        
        // Don't debug the full response body to avoid heap issues
        system.debug('####### API Response length: ' + resBody.length());
        
        // Use a streaming approach to avoid heap issues
        List<Maintenance> parsedData = processMaintenanceStream(resBody);
        System.debug('#####Parsed Data count: ' + parsedData.size());
        
        // Clear the response body from memory after parsing
        resBody = null;

        
        for (Maintenance m: parsedData)
        {        
            // 4.1 Check to see if any of the ISV customers are affected
            system.debug('####### m.name: ' + m.name);
            system.debug('####### m.instanceKeys: ' + m.instanceKeys);
            if (m.instanceKeys != null && !m.instanceKeys.isEmpty() && intcMap.containsKey(m.instanceKeys[0]) && m.name.containsIgnoreCase('Major'))
            {
                Transient Maintenance__c i = new Maintenance__c();
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
				//i.Availability__c = m.message.availability;
				System.debug('######## i.availability: ' + i.Availability__c);
                lstOfNewEvents.add(i);
            }
            //lstMaintenances = null;

        }
        System.debug('######## lstOfNewEvents: ' + lstOfNewEvents);
        

        try {
            upsert lstOfNewEvents Maintenance_External_Id__c; 
        } catch (DmlException e) {
            System.debug(e.getMessage());
        }
        
    }
    
    global void finish(Database.BatchableContext BC) {
        // You can now use the licenseMap variable in your code
    }


    public static DateTime convertISO8601( String iso8601_ts)
    {
        DateTime dt = (DateTime) JSON.deserialize('"' + iso8601_ts + '"', DateTime.class);
        return DateTime.newInstance( dt.getTime());
    }
    
    // Stream process JSON without creating large string copies
    private List<Maintenance> processMaintenanceStream(String jsonBody) {
        List<Maintenance> maintenanceList = new List<Maintenance>();
        
        // Process only a limited number of maintenance events to avoid heap issues
        Integer maxEvents = 50; // Limit to first 50 events to stay within heap limit
        Integer eventsProcessed = 0;
        
        Integer braceCount = 0;
        Integer startPos = -1;
        Boolean inString = false;
        Boolean escapeNext = false;
        
        try {
            // Stream through the JSON without creating copies
            for (Integer i = 0; i < jsonBody.length() && eventsProcessed < maxEvents; i++) {
                String currentChar = jsonBody.substring(i, i + 1);
                
                // Handle string escaping
                if (escapeNext) {
                    escapeNext = false;
                    continue;
                }
                
                if (currentChar == '\\') {
                    escapeNext = true;
                    continue;
                }
                
                if (currentChar == '"' && !escapeNext) {
                    inString = !inString;
                    continue;
                }
                
                // Only count braces outside of strings
                if (!inString) {
                    if (currentChar == '{') {
                        if (braceCount == 0) {
                            startPos = i; // Mark start of JSON object
                        }
                        braceCount++;
                    } else if (currentChar == '}') {
                        braceCount--;
                        if (braceCount == 0 && startPos >= 0) {
                            // Found complete JSON object
                            try {
                                String jsonObj = jsonBody.substring(startPos, i + 1);
                                Maintenance maintenance = (Maintenance) JSON.deserialize(jsonObj, Maintenance.class);
                                maintenanceList.add(maintenance);
                                eventsProcessed++;
                                
                                // Clear variables to help with memory
                                jsonObj = null;
                                maintenance = null;
                                
                                System.debug('Processed maintenance event ' + eventsProcessed);
                            } catch (Exception e) {
                                System.debug('Error parsing maintenance object: ' + e.getMessage());
                                // Continue processing other objects
                            }
                            startPos = -1;
                        }
                    }
                }
            }
        } catch (Exception e) {
            System.debug('Error in stream processing: ' + e.getMessage());
        }
        
        System.debug('Total maintenance events processed: ' + eventsProcessed);
        return maintenanceList;
    }
    


}