global without sharing class postInstallClass implements InstallHandler{

    global void onInstall(InstallContext context) {

        String hour = String.valueOf(Datetime.now().hour());
        String min = String.valueOf(Datetime.now().minute() + 1); 
        String ss = String.valueOf(Datetime.now().second());

        //parse to cron expression
        String nextFireTime = ss + ' ' + min + ' ' + hour + ' * * ?';

        schedFetchMaintenance s = new schedFetchMaintenance(); 
        System.schedule('schedFetchMaintenance Job ' + TestFactory.getUUID() + String.valueOf(Datetime.now()), nextFireTime, s);

        schedDeleteMaintenanceEvents sd = new schedDeleteMaintenanceEvents(); 
        System.schedule('schedDeleteMaintenanceEvents Job ' + TestFactory.getUUID() + String.valueOf(Datetime.now()), nextFireTime, sd);

    }


}
