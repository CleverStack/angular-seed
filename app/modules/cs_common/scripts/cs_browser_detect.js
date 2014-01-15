define(['angular', '../module'], function (ng) {
  'use strict';
  /**
   * @ngdoc service
   * @name ngSeed.services:$browserDetect
   * @description
   * Easy check for Browser, version and OS with this service.
   *
   * ### Example
   * ```js
   * myApp.controller('Test', ['$scope', '$browserDetect', function ($scope, $browserDetect) {
   *   if( $browserDetect.browser !== 'Chrome' ) {
   *     // do something with non chrome browsers
   *   }
   *
   *  if( $browserDetect.browser === 'Explorer' && $browserDetect.version < 10 ) {
   *    // please upgrade your browser
   *  }
   * }]);
   * ```
   */
  ng.module('cs_common.services')
  .factory('CSBrowserDetect', function () {
    var browserDetect = {

      /**
       * @ngdoc function
       * @name init
       * @methodOf ngSeed.services:$browserDetect
       * @description
       * Initializes the properties and error messages.
       *
       * @return {Boolean} True if no errors. False if errors.
       */
      init: function () {
        // Errors array
        this.errors = [];
        // Copy of the navigator access
        this.navigator = navigator;

        this.browser = this.searchString(this.dataBrowser) || undefined;
        // this.browser = 'Explorer';

        if(!this.browser) {
          this.errors.push('Unknown browser');
        }

        this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || undefined;
        // this.version = 9;

        if(!this.version) {
          this.errors.push('Unknown version');
        }

        this.OS = this.searchString(this.dataOS) || undefined;

        if(!this.OS) {
          this.errors.push('Unkown OS');
        }

        return !this.errors.length;
      },

      searchString: function (data) {
        for (var i = 0; i < data.length; i++) {
          var dataString = data[i].string;
          var dataProp = data[i].prop;
          this.versionSearchString = data[i].versionSearch || data[i].identity;
          if (dataString) {
            if (dataString.indexOf(data[i].subString) !== -1){
              return data[i].identity;
            }
          }
          else if (dataProp){
            return data[i].identity;
          }
        }
      },

      searchVersion: function (dataString) {
        var index = dataString.indexOf(this.versionSearchString);
        if (index === -1) {
          return;
        }
        return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
      },


      /**
       * @ngdoc property
       * @name dataBrowser
       * @propertyOf ngSeed.services:$browserDetect
       *
       * @description
       * Array of known Browsers.
       *
       * @type {Array}
       */
      dataBrowser: [
        {
          string: navigator.userAgent,
          subString: 'Chrome',
          identity: 'Chrome'
        },
        {
          string: navigator.userAgent,
          subString: 'OmniWeb',
          versionSearch: 'OmniWeb/',
          identity: 'OmniWeb'
        },
        {
          string: navigator.vendor,
          subString: 'Apple',
          identity: 'Safari',
          versionSearch: 'Version'
        },
        {
          prop: window.opera,
          identity: 'Opera',
          versionSearch: 'Version'
        },
        {
          string: navigator.vendor,
          subString: 'iCab',
          identity: 'iCab'
        },
        {
          string: navigator.vendor,
          subString: 'KDE',
          identity: 'Konqueror'
        },
        {
          string: navigator.userAgent,
          subString: 'Firefox',
          identity: 'Firefox'
        },
        {
          string: navigator.vendor,
          subString: 'Camino',
          identity: 'Camino'
        },
        {   // for newer Netscapes (6+)
          string: navigator.userAgent,
          subString: 'Netscape',
          identity: 'Netscape'
        },
        {
          string: navigator.userAgent,
          subString: 'MSIE',
          identity: 'Explorer',
          versionSearch: 'MSIE'
        },
        {
          string: navigator.userAgent,
          subString: 'Gecko',
          identity: 'Mozilla',
          versionSearch: 'rv'
        },
        {     // for older Netscapes (4-)
          string: navigator.userAgent,
          subString: 'Mozilla',
          identity: 'Netscape',
          versionSearch: 'Mozilla'
        }
      ],
      dataOS: [
        {
          string: navigator.platform,
          subString: 'Win',
          identity: 'Windows'
        },
        {
          string: navigator.platform,
          subString: 'Mac',
          identity: 'Mac'
        },
        {
          string: navigator.userAgent,
          subString: 'iPhone',
          identity: 'iPhone/iPod'
        },
        {
          string: navigator.platform,
          subString: 'Linux',
          identity: 'Linux'
        }
      ]
    };

    browserDetect.init();
    return browserDetect;
  });
});
