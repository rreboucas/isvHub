@IsTest
public with sharing class ProductVideoControllerTest {

    private static Id productId = null;
    private static Id userId = null;

    private static void setupData() {

        userId = ProductVideoControllerTestUtils.createUser(null);

        ProductVideoControllerTestUtils.assignPermissionSetToUser(userId, 'B2B_LE_Video_Player_Admin');

        ProductVideoControllerTestUtils.createProduct2('Sample product', '24601', 'An excellent product');

    }

    @IsTest
    /*
        Parent record is an exact match for requested language 
    */
    public static void testCode1() {

        User adminUser = ProductVideoControllerTestUtils.createAdminUser();

        System.runAs(adminUser) {

            setupData();

        }

        Id recordId = productId;

        User normalUser = ProductVideoControllerTestUtils.getUser(userId);

        Test.startTest();

            System.runAs(normalUser) {

            Id productVideoId = ProductVideoControllerTestUtils.createProductVideo(productId, 'en_US');

            ProductVideoControllerTestUtils.createProductVideoI18N(productVideoId, 'es');

            String results = ProductVideoController.getVideos(recordId, '5', 'en_US');

            System.debug('results: ' + results);

            List<Object> resultsList = (List<Object>)JSON.deserializeUntyped(results);

            Map<String, Object> pvMap = (Map<String, Object>)resultsList.get(0);

            String id = (String)pvMap.get('id');

            System.assertEquals(id, productVideoId);

        }

        Test.stopTest();

    }

    @IsTest
    /*
        Child record contains a matching locale prefix.
    */
    public static void testCode2() {

        User adminUser = ProductVideoControllerTestUtils.createAdminUser();

        System.runAs(adminUser) {

            setupData();

        }

        User normalUser = ProductVideoControllerTestUtils.getUser(userId);

        Test.startTest();

            System.runAs(normalUser) {

                Id recordId = productId;

                Id productVideoId = ProductVideoControllerTestUtils.createProductVideo(productId, 'en_US');

                ProductVideoControllerTestUtils.createProductVideoI18N(productVideoId, 'es');

                String results = ProductVideoController.getVideos(recordId, '5', 'es_MX');

                System.debug('results: ' + results);

                List<Object> resultsList = (List<Object>)JSON.deserializeUntyped(results);

                Map<String, Object> pvMap = (Map<String, Object>)resultsList.get(0);

                String id = (String)pvMap.get('id');

                System.assertEquals(id, productVideoId);

            }

        Test.stopTest();

    }

    @IsTest
    /*
        Child record contains an exact match locale.
    */
    public static void testCode3() {

        User adminUser = ProductVideoControllerTestUtils.createAdminUser();

        System.runAs(adminUser) {

            setupData();

        }

        User normalUser = ProductVideoControllerTestUtils.getUser(userId);

        Test.startTest();

            System.runAs(normalUser) {

                Id recordId = productId;

                Id productVideoId = ProductVideoControllerTestUtils.createProductVideo(productId, 'en_US');

                ProductVideoControllerTestUtils.createProductVideoI18N(productVideoId, 'es');

                String results = ProductVideoController.getVideos(recordId, '5', 'es');

                System.debug('results: ' + results);

                List<Object> resultsList = (List<Object>)JSON.deserializeUntyped(results);

                Map<String, Object> pvMap = (Map<String, Object>)resultsList.get(0);

                String id = (String)pvMap.get('id');

                System.assertEquals(id, productVideoId);

            }

        Test.stopTest();

    }
    
}