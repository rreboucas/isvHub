public with sharing class manageData {
    @future
    public static void deleteMaintenanceEvents() {
        List<Maintenance__c> lstOfOldEvents = [SELECT Id, Start_Date_Time__c FROM Maintenance__c where Start_Date_Time__c < TODAY WITH SECURITY_ENFORCED];

        try {
            delete lstOfOldEvents;
        } catch (DmlException e) {
            // Process exception here
        }

    }
}
