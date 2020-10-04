<<<<<<< HEAD
=======

>>>>>>> c4e1348 (Countdown Timer LWC and Apex Class for basic countdown functionality)
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 * 
 * Author: Michael Holt
 * Created Date: 04-Oct-2020
 * 
 */

<<<<<<< HEAD
global class CountdownTimerController { 
    public static final String JOBS_CANCELLED = 'Scheduled jobs cancelled, you will not receive an org expiry notification';
    public static final String JOBS_SCHEDULED = 'Successfully scheduled! Job Ids: ';
    private static Map<Integer, String> monthNamesByInteger = new Map<Integer, String>
    {1 => 'Jan', 2 => 'Feb', 3 => 'Mar', 4 => 'Apr', 5 => 'May', 6 => 'June', 7 => 'July', 8 => 'Aug', 9 => 'Sep', 10 => 'Oct', 11 => 'Nov', 12 => 'Dec'};


=======
public with sharing class CountdownTimerController { 
>>>>>>> c4e1348 (Countdown Timer LWC and Apex Class for basic countdown functionality)
    @AuraEnabled
    public Static String getExpirationDate(){
        Organization org = [SELECT TrialExpirationDate FROM Organization];
        return string.valueOf(org.TrialExpirationDate);
    }
<<<<<<< HEAD

    @AuraEnabled
    public static List<String> getScheduledNotifications(){
        try {
            List<CronTrigger> crons = getCronsForOrgExpiry();
            List<String> dates = new List<String>();
            for(CronTrigger ct : crons){
                List<String> exprs = ct.CronExpression.split(' ');
                String dateStr = exprs[3] +  ' ' + monthNamesByInteger.get(Integer.valueOf(exprs[4])) + ' ' + exprs[6];
                dates.add(dateStr);
            }
            
            return dates;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    public static List<CronTrigger> getCronsForOrgExpiry(){
        return [SELECT Id, CronJobDetail.Id, CronJobDetail.Name, CronJobDetail.JobType, CronExpression
                FROM CronTrigger 
                WHERE CronJobDetail.Name Like 'ISVHub-OrgExpiryNotification%' 
                Order By  CronJobDetail.Name Asc];
    }

    @AuraEnabled
    public static string setNotificationDates(List<Date> dates){
        try {
            String jobId = '';
            //Get all jobs scheduled by ISVHub
            List<CronTrigger> crons = getCronsForOrgExpiry();
            //Cancel all jobs scheduled by ISVHub
            abortCurrentJobs(crons);
            Integer nameSuffix = 1;
            if(dates != null){
                //Don't schedule the same job on the same day. 
                if(dates.size() > 1 && dates[0] == dates[1]){
                    dates[1] = null;
                }
                for(Date d : dates){
                    if(d != null){
                        jobId += scheduleNewJob(d, nameSuffix) + ' ';
                        nameSuffix++;
                    }
                }
            }

            if(jobId == ''){
                return JOBS_CANCELLED;
            }else{
                return JOBS_SCHEDULED + jobId;
            }
        } catch (Exception e) {
            System.debug(e.getMessage());
            throw new AuraHandledException(e.getMessage());
        }
    }

    public static String scheduleNewJob(Date dt, Integer nameSuffix){
        PublishExpiryEvent scheduleEmail = new PublishExpiryEvent();
        String cronDate = '0 0 0 ' + dt.day() + ' ' + dt.month() +  ' ? ' + dt.year();
        return System.schedule('ISVHub-OrgExpiryNotification' + nameSuffix, cronDate, scheduleEmail);
    }
    
    public static void abortCurrentJobs(List<CronTrigger> jobs){
        for(CronTrigger job : jobs){
            System.abortJob(job.id);
        }
    }
}
=======
}
>>>>>>> c4e1348 (Countdown Timer LWC and Apex Class for basic countdown functionality)
