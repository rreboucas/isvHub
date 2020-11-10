<<<<<<< HEAD
global class schedFetchMaintenance implements Schedulable, Database.AllowsCallouts {
=======
public with sharing class schedFetchMaintenance implements Schedulable, Database.AllowsCallouts {
>>>>>>> d3c0005 (adding maintenance lwc changes)
    public void execute(SchedulableContext SC) {
        callTrustAPI.getMaintenances();
     }


     
<<<<<<< HEAD
}
=======
}
>>>>>>> d3c0005 (adding maintenance lwc changes)
