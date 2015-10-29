(function() {
    'use strict';

    /**
     * @ngdoc directive
     *
     * @name components.shared.directive:datePicker
     *
     * @scope
     *
     * @restrict E
     *
     * @param {Object} date prepopulate the datepicker with a date using this value
     * @param {String} fieldName label for the datepicker to help identify it better from consuming components
     *
     * @description
     * Implementation of datePicker component. Used for start/end date selection for snapshots. Uses Pikaday
     * for date selection functionality.
     */
    angular
        .module('components.shared')
        .directive('datePicker', datePicker);

    datePicker.$inject = [];

    function datePicker() {
        var directive =  {
            restrict            : 'E',
            scope               : {
                date        : '=ngModel',
                fieldName   : '@'
            },
            controller          : DatePickerController,
            controllerAs        : 'ctrl',
            bindToController    : true,
            templateUrl         : 'components/DatePicker/date-picker.directive.html',
            link                : linkFunc
        };

        return directive;

        /**
         * @ngdoc method
         *
         * @name linkFunc
         *
         * @methodOf components.shared.directive:datePicker
         *
         * @param {Object} scope component scope
         * @param {Object} el DOM element reference for component template
         * @param {Object} attr DOM attribute reference
         * @param {Object} ctrl component controller reference
         *
         * @description
         * Link Function declaration/implementation for datePicker component. Wires up datepicker
         * to open when calendar icon is clicked.
         */
        function linkFunc(scope, el, attr, ctrl) {
            el.bind('click', function(e) {
                console.log(el);
                if(!el[0].children[0].children[0].children[0]) {
                    e.target.parentElement.previousElementSibling.click();
                }
                else {
                    el[0].children[0].children[0].children[0].click();
                }
            });
        }
    }

    /**
     * @ngdoc controller
     *
     * @name components.shared.controller:DatePickerController
     *
     * @requires $log
     * @requires PubSub
     *
     * @description
     * Controller declaration/implementation for components.shared.datePicker directive
     */
    angular
        .module('components.shared')
        .controller('DatePickerController', DatePickerController);

    DatePickerController.$inject = ['$scope', '$log', 'PubSub'];

    function DatePickerController($scope, $log, PubSub) {
        var vm = this;

        /**
         * @ngdoc property
         *
         * @name minDate
         *
         * @propertyOf components.shared.controller:DatePickerController
         *
         * @description
         * set minimum date available to select from datepicker with this value
         */
        vm.minDate = null;

        /**
         * @ngdoc property
         *
         * @name maxDate
         *
         * @propertyOf components.shared.controller:DatePickerController
         *
         * @description
         * set maximum date available to select from datepicker with this value
         */
        vm.maxDate = null;

        /**
         * @ngdoc method
         *
         * @name selectADate
         *
         * @methodOf components.shared.controller:DatePickerController
         *
         * @param {Object} dateObj date config info
         * @param {Date} d date selected
         *
         * @description
         * handler for Pikaday date selection event
         */
        vm.selectADate = function(dateObj, d) {
            PubSub.publish('date-select', {
                fieldName : vm.fieldName,
                value     : moment(d).format('MM/DD/YYYY')
            });
        };

        /**
         * @ngdoc method
         *
         * @name hasDateType
         *
         * @methodOf components.shared.controller:DatePickerController
         *
         * @returns {Boolean} true/false value
         *
         * @description
         * Determines whether the browser supports input type=date or not
         */
        var hasDateType = function() {
            var elem = document.createElement('input'),
                result;

            elem.setAttribute('type', 'date');

            if(elem.type === 'text') {
                result = false;
            }
            else {
                result = true;
            }

            return result;
        };

        /**
         * @ngdoc method
         *
         * @name isTouchEnabled
         *
         * @methodOf components.shared.controller:DatePickerController
         *
         * @returns {Boolean} true/false value
         *
         * @description
         * Determines whether the browser is touch enabled or not
         */
        var isTouchEnabled = function() {
            return 'ontouchstart' in window || navigator.MaxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
        };

        /**
         * @ngdoc method
         *
         * @name activate
         *
         * @methodOf components.shared.controller:DatePickerController
         *
         * @description
         * initialization method for the component
         */
        var activate = function() {
            // set min date to one year ago today
            vm.minDate = moment().subtract(1, 'years').toDate();

            // set max date to one year from today
            vm.maxDate = moment().add(1, 'years').toDate();

            // $log.info('type=DATE::', hasDateType());
            // $log.info('isTouch::', isTouchEnabled());
        };

        activate();
    }
})();
