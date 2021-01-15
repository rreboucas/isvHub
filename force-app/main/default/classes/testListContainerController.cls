/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */


@isTest
private class testListContainerController {
    
    @testSetup static void setup() {
        // Create common test accounts
        List<Account> testAccts = new List<Account>();
        for(Integer i=0;i<2;i++) {
            testAccts.add(new Account(Name = 'TestAcct'+i));
        }
        insert testAccts;  
        
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
        
    }

    @isTest static void test_emailServerController() {
        Account acct = [SELECT Id FROM Account WHERE Name='TestAcct0' LIMIT 1];
        sfLma__License__c lr = [SELECT Id FROM sfLma__License__c];
        emailServerController rec = emailServerController.sendEmail('body', 'subject', 'email@email.com', acct.id, 'sendEmail', lr.id, '46522');
    }

    @isTest static void test_isvConsoleMapController() {
        List<isvConsoleMapController> lstRecs = isvConsoleMapController.getLocationData();
	}


    @isTest static void test_listContainerController() {
        List<listContainerController> lstRecs1 = listContainerController.getLicenseData('3', 'Latest Installs per App', null);
        List<listContainerController> lstRecs2 = listContainerController.getLicenseData('3', 'Licenses Expiring Soon', null);
    }

    @isTest static void test_statusServerController() {
        // Set mock callout class 
        
        
        Test.startTest();
        Test.setMock(HttpCalloutMock.class, new WebServiceMockImpl());
        
        List<Maintenance__c> lstRecs1 = statusServerController.getEvents('Upcoming Releases', 'Production');
        Test.stopTest();
    }
    

}
