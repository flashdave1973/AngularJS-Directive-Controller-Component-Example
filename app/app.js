(function () {
    "use strict";

    /**
     * @ngdoc module
     * @name ecopmd
     *
     * @requires components
     * @requires services
     * @requires agGrid
     * @requires ui.bootstrap
     * @requires pikaday
     *
     * @description
     * Main application module
     */
    angular
        .module('ecopmd', [
            // Angular modules
            'agGrid',

            // custom modules
            'components',
            'services',

            // 3rd Party modules
            'ui.bootstrap',
            'pikaday'
         ]);

    /**
     * @ngdoc module
     * @name components
     * @description base components module
     */
    angular
        .module('components', [
            'components.shared',
            'components.layout'
        ]);

    /**
     * @ngdoc module
     * @name components.shared
     * @description Shared components used throughout the app
     */
    angular
        .module('components.shared', []);

    /**
     * @ngdoc module
     * @name components.layout
     * @description Layout components used throughout the app
     */
    angular
        .module('components.layout', []);

    /**
     * @ngdoc overview
     *
     * @name services
     *
     * @description
     * base service module
     */
    angular
        .module('services', []);
})();

