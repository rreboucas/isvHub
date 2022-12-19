global class schedFetchMaintenance implements Schedulable, Database.AllowsCallouts {
    public void execute(SchedulableContext SC) {
        callTrustAPI.getMaintenances();
     }


     
}