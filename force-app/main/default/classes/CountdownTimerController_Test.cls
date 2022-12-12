@isTest
public with sharing class CountdownTimerController_Test {
    
    @isTest
    static void getExpirationDateTest(){
        Organization org = [SELECT TrialExpirationDate FROM Organization];
        String timeAsString = String.valueOf(org.TrialExpirationDate);
        Test.startTest();
            System.assertEquals(timeAsString, CountdownTimerController.getExpirationDate());
        Test.stopTest();
    }


    @isTest
    static void getScheduledNotificationsTest(){

        List<CronTrigger> crons = [SELECT Id, CronJobDetail.Id, CronJobDetail.Name, CronJobDetail.JobType, CronExpression
        FROM CronTrigger 
        WHERE CronJobDetail.Name Like 'ISVHub-OrgExpiryNotification%' 
        Order By  CronJobDetail.Name Asc];

        Test.startTest();
            List<String> strs = CountdownTimerController.getScheduledNotifications();
            System.assertEquals(strs.size(), crons.size());
            
            CountdownTimerController.setNotificationDates(null);
            strs = CountdownTimerController.getScheduledNotifications();
            System.assertEquals(strs.size(), 0);
        Test.stopTest();
    }

    @isTest
    static void getCronsForOrgExpiryTest(){
        List<CronTrigger> crons = [SELECT Id, CronJobDetail.Id, CronJobDetail.Name, CronJobDetail.JobType, CronExpression
        FROM CronTrigger 
        WHERE CronJobDetail.Name Like 'ISVHub-OrgExpiryNotification%' 
        Order By  CronJobDetail.Name Asc];

        Test.startTest();
            List<CronTrigger> theseCrons = CountdownTimerController.getCronsForOrgExpiry();
            System.assertEquals(theseCrons.size(), crons.size());
            
            CountdownTimerController.setNotificationDates(null);
            theseCrons = CountdownTimerController.getCronsForOrgExpiry();
            System.assertEquals(theseCrons.size(), 0);
            CountdownTimerController.setNotificationDates(new List<Date>{System.today().addDays(1)});
        Test.stopTest();
    }

    @isTest
    static void scheduleNewJobTest(){
        Test.startTest();
            System.assertEquals(15, CountdownTimerController.scheduleNewJob(System.today().addDays(1), 10).length());
        Test.stopTest();
    }

    @isTest
    static void abortCurrentJobsTest(){

        List<CronTrigger> crons = [SELECT Id, CronJobDetail.Id, CronJobDetail.Name, CronJobDetail.JobType, CronExpression
        FROM CronTrigger 
        WHERE CronJobDetail.Name Like 'ISVHub-OrgExpiryNotification%' 
        Order By  CronJobDetail.Name Asc];

        Test.startTest();
            CountdownTimerController.abortCurrentJobs(crons);
            List<CronTrigger> theseCrons = CountdownTimerController.getCronsForOrgExpiry();
            System.assertEquals(theseCrons.size(), 0);
        Test.stopTest();
    }
}