(function() {
    'use strict';

    /**
     * @ngdoc directive
     *
     * @name components.shared.directive:topTenPanel
     *
     * @scope
     *
     * @restrict E
     *
     * @description
     * Implementation of Top Ten Panel
     */
    angular
        .module('components.shared')
        .directive('topTenPanel', topTenPanel);

    topTenPanel.$inject = [];

    function topTenPanel() {
        var directive = {
            restrict            : 'E',
            controller          : TopTenPanelController,
            controllerAs        : 'ctrl',
            bindToController    : true,
            templateUrl         : 'components/TopTenPanel/top-ten-panel.directive.html',
            link                : linkFunc,
            scope               : {
                data        : '=',
                panelName  : '@title'
            }
        };

        return directive;

        /**
         * @ngdoc method
         *
         * @name linkFunc
         *
         * @methodOf components.shared.directive:topTenPanel
         *
         * @param {Object} scope component scope
         * @param {Object} el DOM element reference for component template
         * @param {Object} attr DOM attribute reference
         * @param {Object} ctrl component controller reference
         *
         * @description
         * Link Function declaration/implementation for topTenPanel component
         */
        function linkFunc(scope, el, attr, ctrl) {
            
        }
    }

    /**
     * @ngdoc controller
     *
     * @name components.shared.controller:TopTenPanelController
     *
     * @requires https://docs.angularjs.org/api/ng/service/$timeout
     * @requires services.service:PubSub
     *
     * @description
     *     Controller declaration/implementation for components.shared.topTenPanel directive
     */
    angular
        .module('components.shared')
        .controller('TopTenPanelController', TopTenPanelController);

    TopTenPanelController.$inject = ['$timeout'];

    function TopTenPanelController($timeout) {
        var vm = this;

        var mockTasksbyTotalCost = [
            {TaskNumber: 1.1, TaskName: 'Enviro. Impact Assessment', Acc: 33.4, Plan: 37.0, Var: 3.6},
            {TaskNumber: 1.5, TaskName: 'Concept Design Submission', Acc: 28.5, Plan: 26.0, Var: -2.5},
            {TaskNumber: 1.7, TaskName: 'abc', Acc: 27.6, Plan: 25.8, Var: -1.8},
            {TaskNumber: 1.9, TaskName: 'etro', Acc: 25.4, Plan: 27.0, Var: 1.6},
            {TaskNumber: 2.1, TaskName: 'Sanderson', Acc: 23.3, Plan: 22.0, Var: -1.3},
            {TaskNumber: 2.3, TaskName: 'Megladon', Acc: 21.9, Plan: 24.7, Var: 2.8},
            {TaskNumber: 2.5, TaskName: 'Premis', Acc: 20.0, Plan: 22.0, Var: 2.0},
            {TaskNumber: 2.7, TaskName: 'Janghan', Acc: 18.5, Plan: 12.0, Var: -6.5},
            {TaskNumber: 2.9, TaskName: 'Folio', Acc: 14.3, Plan: 11.0, Var: -3.3},
            {TaskNumber: 3.1, TaskName: 'Monarch', Acc: 12.0, Plan: 7.0, Var: -7.0},
            {TaskNumber: 3.1, TaskName: '', Acc: 10.4, Plan: 3.0, Var: -1.0},
            {TaskNumber: 3.1, TaskName: '', Acc: 1.4, Plan: 2.0, Var: 1.0},
            {TaskNumber: 3.1, TaskName: '', Acc: 4.4, Plan: 1.0, Var: 1.0},
            {TaskNumber: 3.1, TaskName: '', Acc: 2.4, Plan: 1.0, Var: 2.0}
        ];

        var mockMarginbyEmployee = [
            {FirstName: 'Billy', LastName: 'Bob', BillRate: 62.4, FBLR: 52.4, MarginCost: -8.4, Percent: -19.4},
            {FirstName: 'Tommy', LastName: 'John', BillRate: 60.5, FBLR: 50.5, MarginCost: -6.5, Percent: -15.5},
            {FirstName: 'Jeff', LastName: 'Mark', BillRate: 57.6, FBLR: 47.6, MarginCost: -5.6, Percent: -13.6},
            {FirstName: 'Billy', LastName: 'Teddy', BillRate: 50.4, FBLR: 40.4, MarginCost: -5.4, Percent: -12.4},
            {FirstName: 'Marco', LastName: 'Pollo', BillRate: 49.3, FBLR: 39.3, MarginCost: -4.3, Percent: -11.3},
            {FirstName: 'Gin', LastName: 'Sang', BillRate: 45.9, FBLR: 35.9, MarginCost: -4.9, Percent: -9.9},
            {FirstName: 'Brett', LastName: 'Jovey', BillRate: 40.0, FBLR: 20.0, MarginCost: -4.0, Percent: -7.0},
            {FirstName: 'Mady', LastName: 'Smats', BillRate: 31.5, FBLR: 21.5, MarginCost: -3.5, Percent: -6.5},
            {FirstName: 'Holly', LastName: 'Fern', BillRate: 21.3, FBLR: 11.3, MarginCost: -2.3, Percent: -5.3},
            {FirstName: 'Jane', LastName: 'Road', BillRate: 11.0, FBLR: 1.0, MarginCost: -1.0, Percent: -4.0},
            {FirstName: 'Ted', LastName: 'Teddy', BillRate: 11.4, FBLR: 1.4, MarginCost: -1.4, Percent: -3.4},
            {FirstName: 'Ven', LastName: 'Pen', BillRate: 9.4, FBLR: 9.4, MarginCost: -0.4, Percent: -2.4},
            {FirstName: 'Dave', LastName: 'Flash', BillRate: 8.4, FBLR: 8.4, MarginCost: -0.3, Percent: -1.4},
            {FirstName: 'Hope', LastName: 'So', BillRate: 5.4, FBLR: 5.4, MarginCost: -0.1, Percent: -0.4}
        ];

        var mockEmployeesbyHours = [
            {FirstName: 'Billy', LastName: 'Bob', Department: 'Bridges Dubai', ActHours: 233.4},
            {FirstName: 'Tommy', LastName: 'John', Department: 'Buildings Dubai', ActHours: 228.5},
            {FirstName: 'Jeff', LastName: 'Mark', Department: 'Homes Dubai', ActHours: 227.6},
            {FirstName: 'Billy', LastName: 'Teddy', Department: 'Bridges Longon', ActHours: 125.4},
            {FirstName: 'Marco', LastName: 'Pollo', Department: 'Buildings Longon', ActHours: 123.3},
            {FirstName: 'Gin', LastName: 'Sang', Department: 'Homes Longon', ActHours: 121.9},
            {FirstName: 'Brett', LastName: 'Jovey', Department: 'Bridges Hawaii', ActHours: 120.0},
            {FirstName: 'Mady', LastName: 'Smats', Department: 'Buildings Hawaii', ActHours: 118.5},
            {FirstName: 'Holly', LastName: 'Fern', Department: 'Homes Hawaii', ActHours: 114.3},
            {FirstName: 'Jane', LastName: 'Road', Department: 'Bridges Rome', ActHours: 112.0},
            {FirstName: 'Ted', LastName: 'Teddy', Department: 'Buildings Rome', ActHours: 110.4},
            {FirstName: 'Ven', LastName: 'Pen', Department: 'Homes Rome', ActHours: 11.4},
            {FirstName: 'Dave', LastName: 'Flash', Department: 'Bridges Dubai', ActHours: 14.4},
            {FirstName: 'Hope', LastName: 'So', Department: 'Buildings Dubai', ActHours: 12.4}
        ];

        var mockEmployeesbyLaborCost = [
            {FirstName: 'Billy', LastName: 'Bob', Department: 'Bridges Dubai', ActCost: 6233.4},
            {FirstName: 'Tommy', LastName: 'John', Department: 'Buildings Dubai', ActCost: 6028.5},
            {FirstName: 'Jeff', LastName: 'Mark', Department: 'Homes Dubai', ActCost: 5727.6},
            {FirstName: 'Billy', LastName: 'Teddy', Department: 'Bridges Longon',  ActCost: 5025.4},
            {FirstName: 'Marco', LastName: 'Pollo', Department: 'Buildings Longon', ActCost: 4923.3},
            {FirstName: 'Gin', LastName: 'Sang', Department: 'Homes Longon', ActCost: 4521.9},
            {FirstName: 'Brett', LastName: 'Jovey', Department: 'Bridges Hawaii', ActCost: 4020.0},
            {FirstName: 'Mady', LastName: 'Smats', Department: 'Buildings Hawaii', ActCost: 4000.10},
            {FirstName: 'Holly', LastName: 'Fern', Department: 'Homes Hawaii', ActCost: 3118.5},
            {FirstName: 'Jane', LastName: 'Road', Department: 'Bridges Rome', ActCost: 2114.3},
            {FirstName: 'Ted', LastName: 'Teddy', Department: 'Buildings Rome', ActCost: 1112.0},
            {FirstName: 'Ven', LastName: 'Pen', Department: 'Homes Rome', ActCost: 1110.4},
            {FirstName: 'Dave', LastName: 'Flash', Department: 'Bridges Dubai', ActCost: 814.4},
            {FirstName: 'Hope', LastName: 'So', Department: 'Buildings Dubai', ActCost: 512.4}
        ];


        /**
         * @ngdoc property
         *
         * @name panelName
         *
         * @propertyOf components.shared.controller:CompleteSnapshotFormController
         *
         * @description
         * Used in the UI to toggle views.
         */
        vm.panelName = '';

        /**
         * @ngdoc property
         *
         * @name panelTitle
         *
         * @propertyOf components.shared.controller:CompleteSnapshotFormController
         *
         * @description
         * Used as the title of the panel.
         */
        vm.panelTitle = '';

        /**
         * @ngdoc property
         *
         * @name others
         *
         * @propertyOf components.shared.controller:CompleteSnapshotFormController
         *
         * @description
         * Stores other snapshot related info as an array.
         */
        vm.others = [];

        /**
         * @ngdoc property
         *
         * @name total
         *
         * @propertyOf components.shared.controller:CompleteSnapshotFormController
         *
         * @description
         * Stores snapshot totals info as an array.
         */
        vm.total = [];

        /**
         * @ngdoc property
         *
         * @name snapshot
         *
         * @propertyOf components.shared.controller:CompleteSnapshotFormController
         *
         * @description
         * Stores snapshot related info as an array.
         */
        vm.snapshot = {};

        /**
         * @ngdoc method
         *
         * @name formatDate
         *
         * @methodOf components.shared.controller:TopTenPanelController
         *
         * @param {Date} value Date/Time
         *
         * @description
         * Formates date values with momentSet to standard MM/DD/YYYY format
         */
        var formatDate = function(value) {
            return moment(value).format('MM/DD/YYYY');
        };

        /**
         * @ngdoc method
         *
         * @name mockMarginbyEmployee
         *
         * @methodOf components.shared.controller:TopTenPanelController
         *
         * @param {Array} data Data list
         *
         * @description
         * Formates the data for use in the UI
         */
        var formatMarginbyEmployee = function(data) {
            // set vars
            var others      = [],
                total       = [],
                BillRate    = 'BillRate',
                Flbr        = 'Flbr',
                MarginCost  = 'MarginCost',
                MarginPer   = 'MarginPer',
                tempList    = [];

            // set totals
            total[BillRate] = 0;
            total[Flbr] = 0;
            total[MarginCost] = 0;
            total[MarginPer] = 0;

            // set other data
            others[BillRate] = 0;
            others[Flbr] = 0;
            others[MarginCost] = 0;
            others[MarginPer] = 0;

            // run loop and add
            for(var i = 0, tLength = data.length; i < tLength; i++) {
                // add all info
                total[BillRate] += data[i].BillRate;
                total[Flbr] += data[i].FBLR;
                total[MarginCost] += data[i].MarginCost;
                total[MarginPer] += data[i].Percent;

                // create a top 10 list
                if(i <= 9) {
                    tempList.push(data[i]);
                }
                // results over 10
                else {
                    // add other related info
                    others[BillRate] += data[i].BillRate;
                    others[Flbr] += data[i].FBLR;
                    others[MarginCost] += data[i].MarginCost;
                    others[MarginPer] += data[i].Percent;
                }
            }

            // set the title and data fields
            vm.panelTitle = 'Top 10 Tasks by Total Cost';
            vm.total = total;
            vm.others = others;
            vm.data = tempList;
        };

        /**
         * @ngdoc method
         *
         * @name formatEmployeesbyLaborCost
         *
         * @methodOf components.shared.controller:TopTenPanelController
         *
         * @param {Array} data Data list
         *
         * @description
         * Formates the data for use in the UI
         */
        var formatEmployeesbyLaborCost = function(data) {
            // set vars
            var others = [],
                total = [],
                ActCost = 'ActCost',
                tempList = [];

            // set totals
            total[ActCost] = 0;

            // set other data
            others[ActCost] = 0;

            // run loop and add
            for(var i = 0, tLength = data.length; i < tLength; i++) {
                // add all info
                total[ActCost] += data[i].ActCost;

                // create a top 10 list
                if(i <= 9) {
                    tempList.push(data[i]);
                }
                // results over 10
                else {
                    // add other related info
                    others[ActCost] += data[i].ActCost;
                }
            }

            // set the title and data fields
            vm.panelTitle = 'Top 10 Employees By Labor Cost';
            vm.total = total;
            vm.others = others;
            vm.data = tempList;
        };

        /**
         * @ngdoc method
         *
         * @name formatEmployeesbyHours
         *
         * @methodOf components.shared.controller:TopTenPanelController
         *
         * @param {Array} data Data list
         *
         * @description
         * Formates the data for use in the UI
         */
        var formatEmployeesbyHours = function(data) {
            // set vars
            var others = [],
                total = [],
                ActHours = 'ActHours',
                tempList = [];

            // set totals
            total[ActHours] = 0;

            // set other data
            others[ActHours] = 0;

            // run loop and add
            for(var i = 0, tLength = data.length; i < tLength; i++) {
                // add all info
                total[ActHours] += data[i].ActHours;

                // create a top 10 list
                if(i <= 9) {
                    tempList.push(data[i]);
                }
                // results over 10
                else {
                    // add other related info
                    others[ActHours] += data[i].ActHours;
                }
            }

            // set the title and data fields
            vm.panelTitle = 'Top 10 Employees By Hour';
            vm.total = total;
            vm.others = others;
            vm.data = tempList;
        };

        /**
         * @ngdoc method
         *
         * @name formatTasksbyTotalCost
         *
         * @methodOf components.shared.controller:TopTenPanelController
         *
         * @param {Array} data Data list
         *
         * @description
         * Formates the data for use in the UI
         */
        var formatTasksbyTotalCost = function(data) {
            // set vars
            var others = [],
                total = [],
                Acc = 'Acc',
                Plan = 'Plan',
                Var = 'Var',
                tempList = [];

            // set totals
            total[Acc] = 0;
            total[Plan] = 0;
            total[Var] = 0;

            // set other data
            others[Acc] = 0;
            others[Plan] = 0;
            others[Var] = 0;

            // run loop and add
            for(var i = 0, tLength = data.length; i < tLength; i++) {
                // add all info
                total[Acc] += data[i].Acc;
                total[Plan] += data[i].Plan;
                total[Var] += data[i].Var;

                // create a top 10 list
                if(i <= 9) {
                    tempList.push(data[i]);
                }
                // results over 10
                else {
                    // add other related info
                    others[Acc] += data[i].Acc;
                    others[Plan] += data[i].Plan;
                    others[Var] += data[i].Var;
                }
            }

            // set the title and data fields
            vm.panelTitle = 'Top 10 Tasks by Total Cost';
            vm.total = total;
            vm.others = others;
            vm.data = tempList;
        };

        /**
         * @ngdoc method
         *
         * @name activate
         *
         * @methodOf components.shared.controller:TopTenPanelController
         *
         * @description
         * Method used to Resolve start-up logic for controller:TopTenPanelController
         */
        var activate = function() {
            // format dates --> do null check
            // NOT NEEDED YET
            // vm.snapshot.projectStartDate ? vm.snapshot.projectStartDate = formatDate(vm.snapshot.projectStartDate) : vm.snapshot.projectStartDate = '';
            // vm.snapshot.projectEndDate ? vm.snapshot.projectEndDate     = formatDate(vm.snapshot.projectEndDate) : vm.snapshot.projectEndDate = '';

            $timeout(function() {
                switch(vm.panelName) {
                    case 'Cost':
                        formatTasksbyTotalCost(mockTasksbyTotalCost);
                        break;
                    case 'Hours':
                        formatEmployeesbyHours(mockEmployeesbyHours);
                        break;
                    case 'Labor':
                        formatEmployeesbyLaborCost(mockEmployeesbyLaborCost);
                        break;
                    case 'Margin':
                        formatMarginbyEmployee(mockMarginbyEmployee);
                        break;
                }
            }, 0);
        };

        // run initialization
        activate();
    }
})();
