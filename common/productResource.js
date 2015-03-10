/**
 * Created by nameinan on 2/17/2015.
 */
(function () {
    "use strict";

    angular
        .module("common.services")
        .factory("productResource",
        ["$resource",
            productResource]);

    function productResource($resource) {
        return $resource("/api/products/:productId")
    }

}());
