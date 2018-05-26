/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {

        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. 
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* Test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('url of each feed is defined', function() {
            for(var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(0);
            };
        });

        /* Test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('name of each feed is defined', function() {
            for(var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
            };
        });
    });


    describe('The menu', function() {

        /* Test ensures the menu element is
         * hidden by default. 
         */
        it('menu element is hidden by default', function() {
           expect($(document.body).hasClass('menu-hidden')).toBe(true);
        });

         /* Test ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('menu changes visibility after clicking the icon', function() {
            $('.menu-icon-link').click();
            expect($(document.body).hasClass('menu-hidden')).toBe(false);

            $('.menu-icon-link').click();
            expect($(document.body).hasClass('menu-hidden')).toBe(true);
        });
    });      


    describe('Initial Entries', function() {

        /* Test ensures that when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        beforeEach(function(done) {
            loadFeed(0, done);
        }); 

        it('loads at least one feed', function() {
           expect($('.feed .entry').length).toBeGreaterThan(0);
         });
    });


    describe('New Feed Selection', function() {

        /* Test ensures that when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        let firstFeed;
        let secondFeed;
         
        beforeEach(function (done) {
            loadFeed(0, function () {
                firstFeed = $('.feed').html();

                loadFeed(1, function () {
                    secondFeed = $('.feed').html();
                    done();
                });
            });
        });
        
        it('changes the content after loading new feed', function() {
            expect(secondFeed).not.toBe(firstFeed);
        });
    }); 

}());
