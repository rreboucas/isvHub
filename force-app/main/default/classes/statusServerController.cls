/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

public with sharing class statusServerController {
    
    @AuraEnabled
    public String eventName { get;set; }
    @AuraEnabled
    public Datetime startDateTime { get;set; }
    @AuraEnabled
    public Datetime endDateTime { get;set; }
    @AuraEnabled
    public String numImpactedCustomers { get;set; }
    @AuraEnabled
    public List<String> impactedLicenseIds { get;set; }

    @AuraEnabled(cacheable=true)
    public static List<statusServerController> getUpcomingMaintenances(String rowsLimit, String instanceName, String releaseName) {

        System.debug('######## rowsLimit: ' + rowsLimit);

        List<statusServerController> lstReturnRecords = new List<statusServerController>();

        // 1. Fetch the customers instance names from active and Trial License records and the number of customers per instance:
        List<sfLma__License__c> lstLicenses = [SELECT id, sfLma__Instance__c FROM sfLma__License__c where sfLma__Status__c IN ('Active', 'Trial') WITH SECURITY_ENFORCED order by sfLma__Instance__c asc];
        system.debug('####### lstLicenses: ' + lstLicenses);

        Map<String, List<String>> intcMap = new Map<String, List<String>>();

        for (sfLma__License__c e: lstLicenses)
        {
            if (intcMap.containsKey(e.sfLma__Instance__c))
                intcMap.get(e.sfLma__Instance__c).add(e.id);
            else
                intcMap.put(e.sfLma__Instance__c, new List<String> {e.id});
        }
        system.debug('####### intcMap: ' + intcMap);

        // 2. Call the Status API maintenance endpoint and fetch upcoming major release maintenances
        String releaseNameEncoded = EncodingUtil.urlEncode(releaseName, 'UTF-8');

        HttpRequest req = new HttpRequest();
        req.setEndpoint('https://api.status.salesforce.com/v1/maintenances?order=plannedStartTime&name=' + releaseNameEncoded);
        req.setMethod('GET');

        Http http = new Http();
        HTTPResponse res = http.send(req);
        String resBody = res.getBody();
        system.debug('####### API Response: ' + resBody);

        // 3. Parse API response with helper class
        List<Maintenance> lstMaintenances = parse(resBody);
        system.debug('####### lstMaintenances: ' + lstMaintenances);

        // 4. Loop through list of Maintenances, verify which ones affect customers and create list of statusServerController to return to LWC
        for (Maintenance m: lstMaintenances)
        {        
            // 4.1 Check to see if any of the ISV customers are affected
            if (m.instanceKeys != null && intcMap.containsKey(m.instanceKeys[0]))
            {

                statusServerController i = new statusServerController();
                i.eventName = m.name;
                System.debug('######## i.eventName: ' + i.eventName);
                i.numImpactedCustomers = String.valueOf(intcMap.get(m.instanceKeys[0]).size());
                System.debug('######## i.numImpactedCustomers: ' + i.numImpactedCustomers);
                i.impactedLicenseIds = intcMap.get(m.instanceKeys[0]);
                System.debug('######## i.impactedLicenseIds: ' + i.impactedLicenseIds);
                i.startDateTime = convertISO8601(m.plannedStartTime);
                System.debug('######## i.startDateTime: ' + i.startDateTime);
                i.endDateTime = convertISO8601(m.plannedEndTime);
                System.debug('######## i.endDateTime: ' + i.endDateTime);

                lstReturnRecords.add(i);
            }
        }
        System.debug('######## lstReturnRecords: ' + lstReturnRecords);
        return lstReturnRecords;
    }

    public static DateTime convertISO8601( String iso8601_ts)
    {
        DateTime dt = (DateTime) JSON.deserialize('"' + iso8601_ts + '"', DateTime.class);
        return DateTime.newInstance( dt.getTime());
    }

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
