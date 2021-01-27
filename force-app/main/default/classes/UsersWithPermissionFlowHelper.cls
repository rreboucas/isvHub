
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 * 
 * Author: Michael Holt
 * Created Date: 17-Jan-2020
 * 
 */

public with sharing class UsersWithPermissionFlowHelper{
    
    /*
        getUsers
        Takes a list of Permission Set names and returns all users with that permission set
        Needs to return List of List of String, because that's what Lightning Flow requires...
    */
    @InvocableMethod
    public static List<List<String>> getUsers(List<String> permissionSetNames){
        List<PermissionSet> sets = [SELECT id, Name FROM PermissionSet WHERE Name In: permissionSetNames];
        List<PermissionSetAssignment> assignments = [SELECT id, PermissionSetId, AssigneeId FROM PermissionSetAssignment WHERE PermissionSetId In: sets];
        List<Id> usersWithPermission = new List<Id>();
        for(PermissionSetAssignment psa : assignments){
            usersWithPermission.add(psa.AssigneeId);
        }
        List<User> users = [SELECT id, firstName, lastName, email, profileId FROM User WHERE id In: usersWithPermission];
        List<String> emails = new List<String>();
        List<List<String>> listOfListOfEmails = new List<List<String>>();
        
        for(User u : users){
            emails.add(u.email);
        }

        listOfListOfEmails.add(emails);
        return listOfListOfEmails;
    }
}