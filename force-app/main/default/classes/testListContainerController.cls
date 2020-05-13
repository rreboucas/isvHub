@isTest
private class testListContainerController {
    

    @isTest static void test_emailServerController() {
        // Implement test code
        Test.startTest();
        Account a = TestFactory.insertAccount();

        emailServerController rec = emailServerController.sendEmail('body', 'subject', 'email@email.com', a.id);
        
        Test.stopTest();

    }

    @isTest static void test_isvConsoleMapController() {
        // Implement test code
        //Add 0. Lead
        //Add 1. Account
        //Add 2. Contact
        //Add 3. Package
        //Add 4. PackageVersion
        //Add 5. License

        Test.startTest();

        // Insert License with Lead:
        Lead l = TestFactory.insertLead();
        sfLma__Package__c p1 = TestFactory.insertPackage();
        sfLma__Package_Version__c pv1 = TestFactory.insertPackageVersion(p1.id);
        sfLma__License__c li1 = TestFactory.insertLicenseWithLead(pv1.id, l.id);

        // Insert License with Account and Contact:
        Account a = TestFactory.insertAccount();
        Contact c = TestFactory.insertContact(a.id);
        sfLma__Package__c p2 = TestFactory.insertPackage();
        sfLma__Package_Version__c pv2 = TestFactory.insertPackageVersion(p2.id);
        sfLma__License__c li2 = TestFactory.insertLicenseWithAccount(pv2.id, a.id, c.id);

        List<isvConsoleMapController> lstRecs = isvConsoleMapController.getLocationData();
        

        Test.stopTest();

	}


    @isTest static void test_listContainerController() {
        // Implement test code
        //Add 0. Lead
        //Add 1. Account
        //Add 2. Contact
        //Add 3. Package
        //Add 4. PackageVersion
        //Add 5. License
        Test.startTest();
        
        // Insert License with Lead:
        Lead l = TestFactory.insertLead();
        sfLma__Package__c p1 = TestFactory.insertPackage();
        sfLma__Package_Version__c pv1 = TestFactory.insertPackageVersion(p1.id);
        sfLma__License__c li1 = TestFactory.insertLicenseWithLead(pv1.id, l.id);

        // Insert License with Account and Contact:
        Account a = TestFactory.insertAccount();
        Contact c = TestFactory.insertContact(a.id);
        sfLma__Package__c p2 = TestFactory.insertPackage();
        sfLma__Package_Version__c pv2 = TestFactory.insertPackageVersion(p2.id);
        sfLma__License__c li2 = TestFactory.insertLicenseWithAccount(pv2.id, a.id, c.id);

        List<listContainerController> lstRecs1 = listContainerController.getLicenseData('3', 'Latest Installs per App');
        
        List<listContainerController> lstRecs2 = listContainerController.getLicenseData('3', 'Licenses Expiring Soon');

        Test.stopTest();

    }
    

}
