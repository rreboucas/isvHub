public without sharing class schedDeleteMaintenanceEvents implements Schedulable {
    public void execute(SchedulableContext SC) {
        manageData.deleteMaintenanceEvents();
     }
}
