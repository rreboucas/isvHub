global without sharing class postInstallClass implements InstallHandler{

    global void onInstall(InstallContext context) {

<<<<<<< HEAD
        // Check if there are any ISV Hub apex jobs already scheduled in the org and abot them if there are:

        List<CronTrigger> lstFetchJobs = [SELECT Id FROM CronTrigger where (CronJobDetail.name like 'schedFetchMaintenance%' OR CronJobDetail.name like 'schedDeleteMaintenanceEvents%') AND State = 'Waiting'];
        if (!lstFetchJobs.isEmpty())
        {
            for (CronTrigger job: lstFetchJobs)
            {
                System.abortJob(job.Id);
            }
        }

        // Now schedule new batch jobs:
        
=======
>>>>>>> a624ccf (changes to post install)
        String hour = String.valueOf(Datetime.now().hour());
        String min = String.valueOf(Datetime.now().minute() + 1); 
        String ss = String.valueOf(Datetime.now().second());

        //parse to cron expression
        String nextFireTime = ss + ' ' + min + ' ' + hour + ' * * ?';
<<<<<<< HEAD
       
        schedFetchMaintenance s = new schedFetchMaintenance(); 
        System.schedule('schedFetchMaintenance Job ' + getUUID() + String.valueOf(Datetime.now()), nextFireTime, s);

        schedDeleteMaintenanceEvents sd = new schedDeleteMaintenanceEvents(); 
        System.schedule('schedDeleteMaintenanceEvents Job ' + getUUID() + String.valueOf(Datetime.now()), nextFireTime, sd);

         //
        Organization org = [SELECT TrialExpirationDate FROM Organization];

        if(string.valueOf(org.TrialExpirationDate) != null)
        {
            String expiryDate = string.valueOf(org.TrialExpirationDate);
            Date expiry = Date.valueOf(expiryDate);
            Date today = date.today();
            Date notification1 = expiry.addDays(-1);
            Date notification2 = expiry.addDays(-7);
            
            List<Date> dates = new List<Date>();
            if(notification1 > today){
                dates.add(notification1);
                if(notification2 > today){
                    dates.add(notification2);
                }
            }
            CountdownTimerController.setNotificationDates(dates);
        }
        // Add users to ISV Console Permission set

        // 1. check which users are already assigned to Perm Set
        List<PermissionSetAssignment> lstCurrentAssignees  =  [SELECT AssigneeId, PermissionSetId FROM PermissionSetAssignment where PermissionSet.Name = 'ISV_Console_Admin'and PermissionSet.NamespacePrefix = 'isvconsole'];
        System.debug('### lstCurrentAssignees'+ lstCurrentAssignees);
        Id permSetId;
        List<PermissionSet> lstPermSets = [SELECT Id FROM PermissionSet where Name = 'ISV_Console_Admin'and NamespacePrefix = 'isvconsole' limit 1];
        System.debug('### lstPermSets'+ lstPermSets);
        if (!lstPermSets.isEmpty())
            permSetId = lstPermSets[0].Id;
        System.debug('### permSetId'+ permSetId);
        Set<Id> setOfIdsToNotAdd = new Set<Id>();
        if (!lstCurrentAssignees.isEmpty())
        {
            for (PermissionSetAssignment psa : lstCurrentAssignees)
            {
                setOfIdsToNotAdd.add(psa.AssigneeId);
            }
            System.debug('### setOfIdsToNotAdd'+ setOfIdsToNotAdd);
        }

        // 2. Fetch the list of all the users in the org and add them to the perm set if they are not assigned already
        List<PermissionSetAssignment> lstPermAssignmentsToAdd = new List<PermissionSetAssignment>();
        
        Map<Id,Profile> profileIds = new Map<id,profile>([SELECT Id,UserLicenseId FROM Profile where UserLicenseId  in (SELECT Id FROM UserLicense where name ='Salesforce')]);
        List<User> lstCurrentActiveUsers = [SELECT id FROM User where IsActive = true and UserType = 'Standard' and IsExtIndicatorVisible = false and profileId in:profileIds.Keyset()];
        System.debug('### lstCurrentActiveUsers'+ lstCurrentActiveUsers);
        if (!lstCurrentActiveUsers.isEmpty())
        {
            for (User u : lstCurrentActiveUsers)
            {
                if (setOfIdsToNotAdd.isEmpty() || !setOfIdsToNotAdd.contains(u.id))
                {
                    PermissionSetAssignment psa = new PermissionSetAssignment(PermissionSetId = permSetId, AssigneeId = u.id);
                    lstPermAssignmentsToAdd.add(psa);
                }
            }
            System.debug('### lstPermAssignmentsToAdd'+ lstPermAssignmentsToAdd);

            if (!lstPermAssignmentsToAdd.isEmpty())
            {
                insert lstPermAssignmentsToAdd;
            }

        }


        
    }

    private static String getUUID()
    {
        Blob b = Crypto.GenerateAESKey(128);
        String h = EncodingUtil.ConvertTohex(b);
        String guid = h.SubString(0,8)+ '-' + h.SubString(8,12) + '-' + h.SubString(12,16) + '-' + h.SubString(16,20) + '-' + h.substring(20);
        system.debug(guid);
        return guid;
    }


}
=======

        schedFetchMaintenance s = new schedFetchMaintenance(); 
        System.schedule('schedFetchMaintenance Job ' + TestFactory.getUUID() + String.valueOf(Datetime.now()), nextFireTime, s);

        schedDeleteMaintenanceEvents sd = new schedDeleteMaintenanceEvents(); 
        System.schedule('schedDeleteMaintenanceEvents Job ' + TestFactory.getUUID() + String.valueOf(Datetime.now()), nextFireTime, sd);

    }


}
>>>>>>> a624ccf (changes to post install)
