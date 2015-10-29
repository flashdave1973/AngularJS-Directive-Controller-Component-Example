(function() {
    'use strict';

    /**
     * @ngdoc service
     *
     * @name services.service:PubSub
     *
     * @requires https://docs.angularjs.org/api/ng/service/$timeout
     * @requires https://docs.angularjs.org/api/ng/service/$log
     *
     * @description
     * service that handles pub/sub event emitting/subscribing
     */
    angular
        .module('services')
        .factory('PubSub', PubSub);

    PubSub.$inject = ['$timeout', '$log'];

    function PubSub($timeout, $log) {
        /**
         * @ngdoc property
         *
         * @name service
         *
         * @propertyOf services.service:PubSub
         *
         * @description
         * public service interface
         *
         * <pre>{
         *      topics          : Object,
         *      subUid          : Number,
         *      subscribe       : PubSub.subscribe,
         *      subscribeOnce   : PubSub.subscribeOnce,
         *      publish         : PubSub.publish,
         *      unsubscribe     : PubSub.unsubscribe
         * } </pre>
         */
        var service = {
            topics          : {},                   // storage for topics that can be broadcast or listened to
            subUid          : -1,                   // a topic identifier
            subscribe       : subscribe,
            subscribeOnce   : subscribeOnce,
            publish         : publish,
            unsubscribe     : unsubscribe
        };

        return service;

        /**
         * @ngdoc method
         *
         * @name subscribe
         *
         * @methodOf services.service:PubSub
         *
         * @param {String} topic topic name.
         * @param {Function} callback callback function to execute on event.
         * @param {Boolean} once checks if event will be triggered only one time (optional).
         *
         * @description
         * subscribe to events of interest with a specific topic name and a
         * callback function, to be executed when the topic/event is observed
         *
         * @returns {number} identifier for subscription
         */
        function subscribe(topic, callback, once) {
            var token   = service.subUid += 1,
                obj     = {};

            if(!service.topics[topic]) {
                service.topics[topic] = [];
            }

            obj.token       = token;
            obj.callback    = callback;
            obj.once        = !!once;

            service.topics[topic].push(obj);

            return token;
        }

        /**
         * @ngdoc method
         *
         * @name subscribeOnce
         *
         * @methodOf services.service:PubSub
         *
         * @param {String} topic topic name
         * @param {Function} callback callback function to execute on event
         *
         * @description
         * subscribe to events of interest setting a flag indicating the event will be published only one time
         */
        function subscribeOnce(topic, callback) {
            service.subscribe(topic, callback, true);
        }

        /**
         * @ngdoc method
         *
         * @name publish
         *
         * @methodOf services.service:PubSub
         *
         * @param {String} topic topic name.
         * @param {Object || Array} args the data to be passed.
         *
         * @description
         * publish or broadcast events of interest with a specific topic name and arguments such as the data to pass along.
         *
         * @returns {Boolean} true if topic exists and event is published.
         */
        function publish(topic, args) {
            var subscribers,
                len;

            if(!service.topics[topic]) {
                return false;
            }

            $timeout(function() {
                subscribers = service.topics[topic];
                len         = subscribers ? subscribers.length : 0;

                while(len) {
                    len -= 1;

                    subscribers[len].callback(topic, args);

                    // unsubscribe from event based on tokenized reference,
                    // if subscriber's property once is set to true.
                    if(subscribers[len].once) {
                        service.unsubscribe(subscribers[len].token);
                    }
                }
            }, 0);

            return true;
        }

        /**
         * @ngdoc method
         *
         * @name unsubscribe
         *
         * @methodOf services.service:PubSub
         *
         * @param {Number} t topic name or token reference
         *
         * @description
         * unsubscribe from a specific topic based on the topic name or based on a tokenized reference to the subscription.
         */
        function unsubscribe(t) {
            var prop,
                len,
                tf = false;

            for(prop in service.topics) {
                if(service.topics.hasOwnProperty(prop)) {
                    if(service.topics[prop]) {
                        len = service.topics[prop].length;

                        while(len) {
                            len -= 1;

                            // if t is a tokenized reference to the subscription.
                            // removes one subscription from the array.
                            if(service.topics[prop][len].token === t) {
                                service.topics[prop].splice(len, 1);
                                return t;
                            }

                            // if t is the event type.
                            // removes all the subscriptions that match the event type.
                            if(prop === t) {
                                service.topics[prop].splice(len, 1);
                                tf = true;
                            }
                        }

                        if(tf) {
                            return t;
                        }
                    }
                }
            }

            return false;
        }
    }
})();
