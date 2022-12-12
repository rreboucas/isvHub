public with sharing class ProductVideoControllerTestUtils {

    public static Id createProduct2(String name, String sku, String description) {
        Product2 product = new Product2(
            IsActive = true
            , Name = name
            , StockKeepingUnit = sku
            , Description = description
        );

        insert product;

        return product.Id;

    }

    public static Id createProductVideo(Id productId, String language) {
        Product_Video__c pv = new Product_Video__c(
            Active__c = true
            , Description__c = 'A video you need to see to believe'
            , End_Date__c = Date.today().addYears(1)
            , Language__c = language
            , Product__c = productId
            , Sequence__c = 100
            , Start_Date__c = Date.today().addDays(-1)
            , Title__c = 'Show me how'
            , Type__c = 'YouTube'
            , Video_URI__c = null
            , YouTube_Video_Id__c = 'XXXXXXXX'
        );

        insert pv;

        return pv.Id;
    }

    public static Id createProductVideoI18N(Id productVideoId, String language) {

        Product_Video_I18N__c pvI18N = new Product_Video_I18N__c(
            Description__c = 'A video you need to see to believe'
            , Language__c = language
            , Product_Video__c = productVideoId
            , Title__c = 'Show me how'
        );

        insert pvI18N;

        return pvI18N.Id;

    }

    public static User createAdminUser() {

        System.debug('inside createAdminUser()');

        User u = new User();

        u.Username = 'testb2buser1@test.com';
        u.LastName = 'TestLastName';
        u.Email = 'testb2buser1@test.com';
        u.Alias = 'test1';
        u.TimeZoneSidKey = 'America/New_York';
        u.EmailEncodingKey = 'ISO-8859-1';
        u.ProfileId = [select id from Profile where Name = 'System Administrator'].Id;
        u.LanguageLocaleKey = 'en_US';
        u.LocaleSidKey = 'en_US';
        u.EmployeeNumber = '655321';

        // Do not assign a role to the user.  If you do, this can cause issues with the scratch org you are creating the package in.

        insert u;

        return u;
    }
    
    public static Id createUser(Id contactId) {

        System.debug('inside createUser()');

        User u = new User();

        u.Username = 'testb2buser2@test.com';
        u.LastName = 'TestLastName';
        u.Email = 'testb2buser2@test.com';
        u.Alias = 'test2';
        u.TimeZoneSidKey = 'America/New_York';
        u.EmailEncodingKey = 'ISO-8859-1';

        u.ProfileId = [select id from Profile where Name = 'Standard User'].Id;
        
        u.LanguageLocaleKey = 'en_US';
        u.LocaleSidKey = 'en_US';
        u.EmployeeNumber = '24601';

        // Do not assign a role to the user.  If you do, this can cause issues with the scratch org you are creating the package in.

        insert u;

        return u.Id;
    }

    public static void assignPermissionSetToUser(Id userId, String permissionSetName) {

        System.debug('inside assignPermissionSetToUser()');

        PermissionSet perm = [Select Id, Name from PermissionSet where Name = :permissionSetName];

        PermissionSetAssignment psa = new PermissionSetAssignment (
            PermissionSetId = perm.Id, AssigneeId = userId
        );

        insert psa;
    }

    public static User getUser(Id userId) {
        User user = [Select Id, UserName, LastName, Email, Alias, timeZoneSidKey, EmailEncodingKey, ProfileId, LanguageLocaleKey, EmployeeNumber, ContactId from User where Id = :userId];
        
        return user;
    }

}