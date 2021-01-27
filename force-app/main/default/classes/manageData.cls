<<<<<<< HEAD
global class manageData {
=======
public with sharing class manageData {
>>>>>>> a624ccf (changes to post install)
    @future
    public static void deleteMaintenanceEvents() {
        List<Maintenance__c> lstOfOldEvents = [SELECT Id, Start_Date_Time__c FROM Maintenance__c where Start_Date_Time__c < TODAY WITH SECURITY_ENFORCED];

        try {
            delete lstOfOldEvents;
        } catch (DmlException e) {
            // Process exception here
        }

    }
<<<<<<< HEAD

    @AuraEnabled(cacheable=true)
    public static List<sfLma__License__c> getLicenceLeadIdsWithoutAddress() {

        List<sfLma__License__c> lstOfLeads = [SELECT sfLma__Lead__c FROM sfLma__License__c where sfLma__Status__c  = 'Active'  and IsDeleted = false  and (sfLma__Lead__r.Latitude = null OR sfLma__Lead__r.Longitude= null) and sfLma__Lead__c != null  WITH SECURITY_ENFORCED];
        System.debug('######## lstOfLeads: ' + lstOfLeads);
        return lstOfLeads;
    }

    @AuraEnabled(cacheable=true)
    public static List<sfLma__License__c> getLicenceAccountIdsWithoutAddress() {

        List<sfLma__License__c> lstOfAccts = [SELECT sfLma__Account__c FROM sfLma__License__c where sfLma__Status__c  = 'Active' and IsDeleted = false and (sfLma__Account__r.BillingLatitude = null AND sfLma__Account__r.ShippingLatitude = null) and sfLma__Account__c != null  WITH SECURITY_ENFORCED];
        System.debug('######## lstOfAccts: ' + lstOfAccts);
        return lstOfAccts;
    }
}
=======
}
>>>>>>> a624ccf (changes to post install)
