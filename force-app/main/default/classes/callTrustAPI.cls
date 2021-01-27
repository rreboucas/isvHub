<<<<<<< HEAD
<<<<<<< HEAD
global class callTrustAPI {
=======
public with sharing class callTrustAPI {
>>>>>>> d3c0005 (adding maintenance lwc changes)
=======
public without sharing class callTrustAPI {
>>>>>>> a624ccf (changes to post install)
    @future(callout=true)
    public static void getMaintenances()
    { 
        List<Maintenance__c> lstOfNewEvents = new List<Maintenance__c>();
        List<sfLma__License__c> lstLicenses;

<<<<<<< HEAD
        lstLicenses = [SELECT id, sfLma__Instance__c FROM sfLma__License__c where sfLma__Status__c IN ('Active', 'Trial') and sfLma__Instance__c <> NULL WITH SECURITY_ENFORCED order by sfLma__Instance__c asc];
=======
        lstLicenses = [SELECT id, sfLma__Instance__c FROM sfLma__License__c where sfLma__Status__c IN ('Active', 'Trial') WITH SECURITY_ENFORCED order by sfLma__Instance__c asc];
>>>>>>> d3c0005 (adding maintenance lwc changes)
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

<<<<<<< HEAD
        //String strEndPoint = 'https://api.status.salesforce.com/v1/maintenances?order=plannedStartTime&name=' + releaseNameEncoded ;
        String strEndPoint = 'https://api.status.salesforce.com/v1/maintenances/preview' ;
=======
        String strEndPoint = 'https://api.status.salesforce.com/v1/maintenances?order=plannedStartTime&name=' + releaseNameEncoded ;
>>>>>>> d3c0005 (adding maintenance lwc changes)
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
<<<<<<< HEAD
            system.debug('####### m.instanceKeys: ' + m.instanceKeys);
            if (m.instanceKeys != null && !m.instanceKeys.isEmpty() && intcMap.containsKey(m.instanceKeys[0]) && m.name.containsIgnoreCase('Major'))
=======
            if (m.instanceKeys != null && intcMap.containsKey(m.instanceKeys[0]))
>>>>>>> d3c0005 (adding maintenance lwc changes)
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
<<<<<<< HEAD
    
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
=======

    class Maintenance {
		public Integer id {get;set;} 
		public Message message {get;set;} 
		public String externalId {get;set;} 
		public String name {get;set;} 
		public String plannedStartTime {get;set;} 
		public String plannedEndTime {get;set;} 
		public String additionalInformation {get;set;} 
		public Boolean isCore {get;set;} 
		public Boolean affectsAll {get;set;} 
		public String createdAt {get;set;} 
		public String updatedAt {get;set;} 
		public List<MaintenanceImpacts> MaintenanceImpacts {get;set;} 
		public List<MaintenanceEvents> MaintenanceEvents {get;set;} 
		public List<String> instanceKeys {get;set;} 
		public List<String> serviceKeys {get;set;} 

		public Maintenance(JSONParser parser) {
			while (parser.nextToken() != System.JSONToken.END_OBJECT) {
				if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
					String text = parser.getText();
					if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
						if (text == 'id') {
							id = parser.getIntegerValue();
						} else if (text == 'message') {
							message = new Message(parser);
						} else if (text == 'externalId') {
							externalId = parser.getText();
						} else if (text == 'name') {
							name = parser.getText();
						} else if (text == 'plannedStartTime') {
							plannedStartTime = parser.getText();
						} else if (text == 'plannedEndTime') {
							plannedEndTime = parser.getText();
						} else if (text == 'additionalInformation') {
							additionalInformation = parser.getText();
						} else if (text == 'isCore') {
							isCore = parser.getBooleanValue();
						} else if (text == 'affectsAll') {
							affectsAll = parser.getBooleanValue();
						} else if (text == 'createdAt') {
							createdAt = parser.getText();
						} else if (text == 'updatedAt') {
							updatedAt = parser.getText();
						} else if (text == 'MaintenanceImpacts') {
							MaintenanceImpacts = arrayOfMaintenanceImpacts(parser);
						} else if (text == 'MaintenanceEvents') {
							MaintenanceEvents = arrayOfMaintenanceEvents(parser);
						} else if (text == 'instanceKeys') {
							instanceKeys = arrayOfString(parser);
						} else if (text == 'serviceKeys') {
							serviceKeys = arrayOfString(parser);
						} else {
							System.debug(LoggingLevel.WARN, 'Maintenance consuming unrecognized property: '+text);
							consumeObject(parser);
						}
					}
				}
			}
		}
	}
    

    public static List<Maintenance> parse(String json) {
		System.JSONParser parser = System.JSON.createParser(json);
		return arrayOfMaintenance(parser);
	}

    private static List<Maintenance> arrayOfMaintenance(System.JSONParser p) {
        List<Maintenance> res = new List<Maintenance>();
        if (p.getCurrentToken() == null) p.nextToken();
        while (p.nextToken() != System.JSONToken.END_ARRAY) {
            res.add(new Maintenance(p));
        }
        return res;
    }

    public static void consumeObject(System.JSONParser parser) {
		Integer depth = 0;
		do {
			System.JSONToken curr = parser.getCurrentToken();
			if (curr == System.JSONToken.START_OBJECT || 
				curr == System.JSONToken.START_ARRAY) {
				depth++;
			} else if (curr == System.JSONToken.END_OBJECT ||
				curr == System.JSONToken.END_ARRAY) {
				depth--;
			}
		} while (depth > 0 && parser.nextToken() != null);
    }

    private static List<MaintenanceEvents> arrayOfMaintenanceEvents(System.JSONParser p) {
        List<MaintenanceEvents> res = new List<MaintenanceEvents>();
        if (p.getCurrentToken() == null) p.nextToken();
        while (p.nextToken() != System.JSONToken.END_ARRAY) {
            res.add(new MaintenanceEvents(p));
        }
        return res;
    }
    
    private static List<String> arrayOfString(System.JSONParser p) {
        List<String> res = new List<String>();
        if (p.getCurrentToken() == null) p.nextToken();
        while (p.nextToken() != System.JSONToken.END_ARRAY) {
            res.add(p.getText());
        }
        return res;
    }

    private static List<MaintenanceImpacts> arrayOfMaintenanceImpacts(System.JSONParser p) {
        List<MaintenanceImpacts> res = new List<MaintenanceImpacts>();
        if (p.getCurrentToken() == null) p.nextToken();
        while (p.nextToken() != System.JSONToken.END_ARRAY) {
            res.add(new MaintenanceImpacts(p));
        }
        return res;
    }





    private static List<MaintenanceImpacts_Z> arrayOfMaintenanceImpacts_Z(System.JSONParser p) {
        List<MaintenanceImpacts_Z> res = new List<MaintenanceImpacts_Z>();
        if (p.getCurrentToken() == null) p.nextToken();
        while (p.nextToken() != System.JSONToken.END_ARRAY) {
            res.add(new MaintenanceImpacts_Z(p));
        }
        return res;
    }




    public class Message {
		public String maintenanceType {get;set;} 
		public String availability {get;set;} 
		public String eventStatus {get;set;} 

		public Message(JSONParser parser) {
			while (parser.nextToken() != System.JSONToken.END_OBJECT) {
				if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
					String text = parser.getText();
					if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
						if (text == 'maintenanceType') {
							maintenanceType = parser.getText();
						} else if (text == 'availability') {
							availability = parser.getText();
						} else if (text == 'eventStatus') {
							eventStatus = parser.getText();
						} else {
							System.debug(LoggingLevel.WARN, 'Message consuming unrecognized property: '+text);
							consumeObject(parser);
						}
					}
				}
			}
		}
	}
	
	public class MaintenanceImpacts {

		public MaintenanceImpacts(JSONParser parser) {
			while (parser.nextToken() != System.JSONToken.END_OBJECT) {
				if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
					String text = parser.getText();
					if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
						{
							System.debug(LoggingLevel.WARN, 'MaintenanceImpacts consuming unrecognized property: '+text);
							consumeObject(parser);
						}
					}
				}
			}
		}
    }
    
    public class MaintenanceImpacts_Z {
		public Integer id {get;set;} 
		public String startTime {get;set;} 
		public String endTime {get;set;} 
		public String type_Z {get;set;} // in json: type
		public String severity {get;set;} 
		public String createdAt {get;set;} 
		public String updatedAt {get;set;} 
		public String startTimeCreatedAt {get;set;} 
		public Object startTimeModifiedAt {get;set;} 
		public String endTimeCreatedAt {get;set;} 
		public Object endTimeModifiedAt {get;set;} 

		public MaintenanceImpacts_Z(JSONParser parser) {
			while (parser.nextToken() != System.JSONToken.END_OBJECT) {
				if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
					String text = parser.getText();
					if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
						if (text == 'id') {
							id = parser.getIntegerValue();
						} else if (text == 'startTime') {
							startTime = parser.getText();
						} else if (text == 'endTime') {
							endTime = parser.getText();
						} else if (text == 'type') {
							type_Z = parser.getText();
						} else if (text == 'severity') {
							severity = parser.getText();
						} else if (text == 'createdAt') {
							createdAt = parser.getText();
						} else if (text == 'updatedAt') {
							updatedAt = parser.getText();
						} else if (text == 'startTimeCreatedAt') {
							startTimeCreatedAt = parser.getText();
						} else if (text == 'startTimeModifiedAt') {
							startTimeModifiedAt = parser.readValueAs(Object.class);
						} else if (text == 'endTimeCreatedAt') {
							endTimeCreatedAt = parser.getText();
						} else if (text == 'endTimeModifiedAt') {
							endTimeModifiedAt = parser.readValueAs(Object.class);
						} else {
							System.debug(LoggingLevel.WARN, 'MaintenanceImpacts_Z consuming unrecognized property: '+text);
							consumeObject(parser);
						}
					}
				}
			}
		}
	}
	
	public class MaintenanceEvents {
		public Integer id {get;set;} 
		public String type_Z {get;set;} // in json: type
		public String message {get;set;} 
		public String createdAt {get;set;} 
		public String updatedAt {get;set;} 

		public MaintenanceEvents(JSONParser parser) {
			while (parser.nextToken() != System.JSONToken.END_OBJECT) {
				if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
					String text = parser.getText();
					if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
						if (text == 'id') {
							id = parser.getIntegerValue();
						} else if (text == 'type') {
							type_Z = parser.getText();
						} else if (text == 'message') {
							message = parser.getText();
						} else if (text == 'createdAt') {
							createdAt = parser.getText();
						} else if (text == 'updatedAt') {
							updatedAt = parser.getText();
						} else {
							System.debug(LoggingLevel.WARN, 'MaintenanceEvents consuming unrecognized property: '+text);
							consumeObject(parser);
						}
					}
				}
			}
		}
	}
}
>>>>>>> d3c0005 (adding maintenance lwc changes)
