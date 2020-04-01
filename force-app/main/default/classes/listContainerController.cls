public with sharing class listContainerController {
    @AuraEnabled(cacheable=true)
    public static List<sfLma__License__c> getLastestPackageInstalls() {
        return [
            SELECT sfLma__Package_Version__r.sfLma__Package__r.Name , 
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
    }
}
