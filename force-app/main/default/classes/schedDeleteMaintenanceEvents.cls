global class schedDeleteMaintenanceEvents implements Schedulable {
    public void execute(SchedulableContext SC) {
        manageData.deleteMaintenanceEvents();
     }
}