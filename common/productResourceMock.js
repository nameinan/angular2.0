/**
 * Created by nameinan on 2/17/2015.
 */


(function(){
    'use strict';
   var app= angular
        .module("productResourceMock",
        ["ngMockE2E"] );

    app.run(function($httpBackend){
        var   products= [
            {
                "productId":1,
                "name":"shoes",
                "price":20,
                "imageUrl":"image/shoes.jpg",
                "releasedDate":"21/03/1981",
                "brand":"arrow",
                "tags":["clothes","apparel"]
            },

            {
                "productId":2,
                "name":"shirt",
                "price":100,
                "imageUrl":"image/shirt.jpg",
                "releasedDate":"21/03/1981",
                "brand":"woodland",
                "tags":["clothes","apparel"]
            },

            {
                "productId":3,
                "name":"shocks",
                "price":120,
                "imageUrl":"image/shock.jpg",
                "releasedDate":"21/03/1981",
                "brand":"Jockey",
                "tags":["clothes","apparel"]
            }
        ];

        var productUrl="/api/products";
        $httpBackend.whenGET(productUrl).respond(products);

        var editingRegex = new RegExp(productUrl + "/[0-9][0-9]*", '');
        $httpBackend.whenGET(editingRegex).respond(function (method, url, data) {
            var product = {"productId": 0};
            var parameters = url.split('/');
            var length = parameters.length;
            var id = parameters[length - 1];

            if (id > 0) {
                for (var i = 0; i < products.length; i++) {
                    if (products[i].productId == id) {
                        product = products[i];
                        break;
                    }
                };
            }
            return [200, product, {}];
        });

        $httpBackend.whenPOST(productUrl).respond(function (method, url, data) {
            var product = angular.fromJson(data);

            if (!product.productId) {
                // new product Id
                product.productId = products[products.length - 1].productId + 1;
                products.push(product);
            }
            else {
                // Updated product
                for (var i = 0; i < products.length; i++) {
                    if (products[i].productId == product.productId) {
                        products[i] = product;
                        break;
                    }
                };
            }
            return [200, product, {}];
        });





        // Pass through any requests for application files
        $httpBackend.whenGET(/app/).passThrough();
    })
}());

