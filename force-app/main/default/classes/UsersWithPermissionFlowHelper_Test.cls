@isTest
public with sharing class UsersWithPermissionFlowHelper_Test {
    @isTest
    static void getUsersTest() {
        User u1 = new User(
            ProfileId = [SELECT Id FROM Profile WHERE Name = 'System Administrator'].Id,
            FirstName = 'MichaelXTest001',
            LastName = 'one',
            Email = 'uuser000@example.com',
            Username = 'michael.holt.test.003@example.com' + System.currentTimeMillis(),
            CompanyName = 'TEST',
            Title = 'title',
            Alias = 'alias',
            TimeZoneSidKey = 'Europe/London',
            EmailEncodingKey = 'UTF-8',
            LanguageLocaleKey = 'en_US',
            LocaleSidKey = 'en_US');

        insert u1;

        PermissionSet ps = [SELECT Id FROM PermissionSet WHERE Name = 'ISV_Console_Admin'];

        Test.startTest();
            insert new PermissionSetAssignment(AssigneeId = u1.id, PermissionSetId = ps.Id);
            List<List<String>> results = UsersWithPermissionFlowHelper.getUsers(new List<String>{'ISV_Console_Admin'});
            System.assertEquals(1, results.size());
        Test.stopTest();

    }
}
