<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> a94e476 (first committo labs)
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */


<<<<<<< HEAD
@isTest
public without sharing class TestFactory {
=======
=======
>>>>>>> a94e476 (first committo labs)
@isTest
public class TestFactory {
>>>>>>> 6894227 (custom metadata)
    // define default constants that can be accessible to assert against.

    public static final String DEFAULT_ACCOUNT_NAME = 'ACME Inc.';
    public static final String DEFAULT_FIRSTNAME = 'John';
    public static final String DEFAULT_LASTNAME = 'Appleseed';
    public static final String DEFAULT_EMAIL = 'r@r.com';
    public static final String DEFAULT_STREET = '123 Street';
    public static final String DEFAULT_CITY = 'San Francisco';
    public static final String DEFAULT_STATE = 'CA';
    public static final String DEFAULT_POSTALCODE = '33325';
    public static final String DEFAULT_COUNTRY = 'US';
    public static final Double DEFAULT_LATITUDE = 26.1206;
    public static final Double DEFAULT_LONGITUDE = -78.839589;
    public static final String DEFAULT_LICENSE_NAME = 'L-0000';
    public static final String DEFAULT_ORG_ID = '00DB0000000He80';
    public static final String DEFAULT_PACKAGE_NAME = 'MyPackage';
    public static final String DEFAULT_PACKAGE_VERSION = '1.0';

    /* The “create” methods are used to instantiate the sobjects without inserting them. 
       This is tremendously helpful when you need to create a particular record and then tweak it before 
       it’s inserted from the calling code. */  
 

    /* The create methods are commonly overloaded to allow different properties to be set. */

    public static Account createAccount(){

           return new Account(
               Name = DEFAULT_ACCOUNT_NAME,
               BillingCity = DEFAULT_CITY,
               BillingCountry = DEFAULT_COUNTRY,
               BillingLatitude = DEFAULT_LATITUDE,
               BillingLongitude = DEFAULT_LONGITUDE,
               BillingPostalCode = DEFAULT_POSTALCODE,
               BillingState = DEFAULT_STATE,
               BillingStreet = DEFAULT_STREET,
               ShippingCity = DEFAULT_CITY,
               ShippingCountry = DEFAULT_COUNTRY,
               ShippingLatitude = DEFAULT_LATITUDE,
               ShippingLongitude = DEFAULT_LONGITUDE,
               ShippingPostalCode = DEFAULT_POSTALCODE,
               ShippingState = DEFAULT_STATE,
               ShippingStreet = DEFAULT_STREET
           );

    }
<<<<<<< HEAD

    public static String getUUID()
{
        Blob b = Crypto.GenerateAESKey(128);
        String h = EncodingUtil.ConvertTohex(b);
        String guid = h.SubString(0,8)+ '-' + h.SubString(8,12) + '-' + h.SubString(12,16) + '-' + h.SubString(16,20) + '-' + h.substring(20);
        system.debug(guid);
        return guid;
    }
=======
>>>>>>> 6894227 (custom metadata)
    

    public static Contact createContact(String accountID){

           return new Contact(
                FirstName = DEFAULT_FIRSTNAME,
                LastName = DEFAULT_LASTNAME,
                Accountid = accountID,
                Email = DEFAULT_EMAIL
           );

    }

    public static Lead createLead(){

        return new Lead(
            FirstName = DEFAULT_FIRSTNAME,
            LastName = DEFAULT_LASTNAME,
            Company = DEFAULT_ACCOUNT_NAME,
            Email = DEFAULT_EMAIL,
            Latitude = DEFAULT_LATITUDE,
            Longitude = DEFAULT_LONGITUDE,
            Street = DEFAULT_STREET,
            City = DEFAULT_CITY,
            State = DEFAULT_STATE,
            PostalCode = DEFAULT_POSTALCODE,
            Country = DEFAULT_COUNTRY,
            LeadSource = 'Package Installation'
        );

 }



    public static sfLma__Package__c createPackage(){

        Date todaysDt = Date.today();
    	Date fDate = todaysDt.addMonths(6);

           return new sfLma__Package__c(
           	    Name = DEFAULT_PACKAGE_NAME,
                sfLma__Developer_Name__c = DEFAULT_PACKAGE_NAME,
                sfLma__Developer_Org_ID__c = DEFAULT_ORG_ID,
                sfLma__Latest_Version__c = DEFAULT_PACKAGE_VERSION,
                sfLma__Release_Date__c = fDate
           );

    }
    

    public static sfLma__Package_Version__c createPackageVersion(String packageId){

    	Date todaysDt = Date.today();
    	Date fDate = todaysDt.addMonths(6);

           return new sfLma__Package_Version__c(
                Name = DEFAULT_PACKAGE_VERSION,
                sfLma__Package__c = packageId,
                sfLma__Is_Beta__c = false,
                sfLma__Release_Date__c = fDate,
                sfLma__Version_Number__c = DEFAULT_PACKAGE_VERSION,
                sfLma__Version__c = DEFAULT_PACKAGE_VERSION
           );

    }

    public static sfLma__License__c createLicenseWithLead(String packageVersionId, String leadId){

    	Date todaysDt = Date.today();
    	Date fDate = todaysDt.addMonths(6);

           return new sfLma__License__c(
                sfLma__Package_Version__c = packageVersionId,
                sfLma__Lead__c = leadId,
                sfLma__Expiration__c = fDate,
                sfLma__Install_Date__c = todaysDt,
                sfLma__License_Type__c = 'Editable',
                sfLma__Org_Type__c = 'Developer Edition',
                sfLma__Status__c = 'Active',
<<<<<<< HEAD
<<<<<<< HEAD
                sfLma__Subscriber_Org_ID__c = DEFAULT_ORG_ID
=======
                sfLma__Subscriber_Org_ID__c = DEFAULT_ORG_ID,
<<<<<<< HEAD
                sfLma__Version_Number__c = 'isvconsoletestrunning'
>>>>>>> 6894227 (custom metadata)
=======
                isvconsole__isTestRunning__c = true
>>>>>>> 6aab12d (comit july 2020)
=======
                sfLma__Subscriber_Org_ID__c = DEFAULT_ORG_ID
>>>>>>> c258fe6 (fix dependencies for team dev)
           );
    }

	public static sfLma__License__c createLicenseWithAccount(String packageVersionId, String accountId, String contactId){

    	Date todaysDt = Date.today();
    	Date fDate = todaysDt.addMonths(6);

           return new sfLma__License__c(
                sfLma__Package_Version__c = packageVersionId,
                sfLma__Account__c = accountId,
                sfLma__Contact__c = contactId,
                sfLma__Expiration__c = fDate,
                sfLma__Install_Date__c = todaysDt,
                sfLma__License_Type__c = 'Editable',
                sfLma__Org_Type__c = 'Developer Edition',
                sfLma__Status__c = 'Active',
                sfLma__Subscriber_Org_ID__c = '00DB0000000He80',
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
                sfLma__Org_Instance__c = 'CS122'
=======
                sfLma__Version_Number__c = 'isvconsoletestrunning'
>>>>>>> 6894227 (custom metadata)
=======
                sfLma__Org_Instance__c = 'CS122',
                isvconsole__isTestRunning__c = true
>>>>>>> 6aab12d (comit july 2020)
=======
                sfLma__Org_Instance__c = 'CS122'
>>>>>>> c258fe6 (fix dependencies for team dev)
           );
    }
    


    /* The “Insert” methods are used to create the sobjects and then insert them. They delegate 
       the creation to the create methods and then insert the records. Like the create methods,
       the insert methods are overloaded to allow different properties to be set as necessary.
       Another best practice is to bulk insert or bulk create data, but to keep the sample short, that’s omitted. */

    public static Account insertAccount(){

          Account accountToInsert = createAccount();
          insert accountToInsert;
          return accountToInsert;

    }

    public static Contact insertContact(String accountID){

          Contact contactToInsert = createContact(accountID);
          insert contactToInsert;
          return contactToInsert;

    }
    
    public static Lead insertLead(){

          Lead recToInsert = createLead();
          insert recToInsert;
          return recToInsert;

    }

    public static sfLma__Package__c insertPackage(){

        sfLma__Package__c recToInsert = createPackage();
        insert recToInsert;
        return recToInsert;

  }
    
    public static sfLma__Package_Version__c insertPackageVersion(String packageId){

        sfLma__Package_Version__c recToInsert = createPackageVersion(packageId);
        insert recToInsert;
        return recToInsert;

    }

    public static sfLma__License__c insertLicenseWithLead(String packageVersionId, String leadId){

        sfLma__License__c recToInsert = createLicenseWithLead(packageVersionId, leadId);
        insert recToInsert;
        return recToInsert;

    }

    public static sfLma__License__c insertLicenseWithAccount(String packageVersionId, String accountId, String contactId){

        sfLma__License__c recToInsert = createLicenseWithAccount(packageVersionId, accountId, contactId);
        insert recToInsert;
        return recToInsert;

    }

    

}