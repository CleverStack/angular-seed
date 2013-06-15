'use strict';

var services = angular.module('app.services');

/**
 * BrowserDetect Service
 * Detects the type of browser, the version and the OS.
 * Easily usable in conjuction with ng-hide/ng-show.
 *
 * Example (jade):
 *   section(ng-show="browserDetect.browser == 'Explorer' && browserDetect.version < 10")
 *     span.warn This page is not supported in IE below 10
 *     
 * @return {String} .browser for the browser name
 * @return {String} .version for the browser version
 * @return {String} .OS for the OS in which the browser is running
 */
services.factory('browserDetect', function () {

  var browserDetect = {

    /**
     * Initializes the properties and error messages.
     * @return {Boolean} True if no errors. False if errors.
     */
    init: function () {
      // Errors array
      this.errors = [];
      // Copy of the navigator access
      this.navigator = navigator;

      this.browser = this.searchString(this.dataBrowser) || undefined;
      // this.browser = "Explorer";
      
      if(!this.browser) {
        this.errors.push("Unknown browser");
      }

      this.version = this.searchVersion(navigator.userAgent)
        || this.searchVersion(navigator.appVersion)
        || undefined;
      // this.version = 9;
      
      if(!this.version) {
        this.errors.push("Unknown version");
      }
      
      this.OS = this.searchString(this.dataOS) || undefined;
      
      if(!this.OS) {
        this.errors.push("Unkown OS");
      }

      if(this.errors.length) {
        return false;
      } else {
        return true;
      }
    },

    searchString: function (data) {
      for (var i=0;i<data.length;i++) {
        var dataString = data[i].string;
        var dataProp = data[i].prop;
        this.versionSearchString = data[i].versionSearch || data[i].identity;
        if (dataString) {
          if (dataString.indexOf(data[i].subString) != -1)
            return data[i].identity;
        }
        else if (dataProp)
          return data[i].identity;
      }
    },

    searchVersion: function (dataString) {
      var index = dataString.indexOf(this.versionSearchString);
      if (index == -1) return;
      return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
    },
    /**
     * Array of known Browsers
     * @type {Array}
     */
    dataBrowser: [
      {
        string: navigator.userAgent,
        subString: "Chrome",
        identity: "Chrome"
      },
      { 
        string: navigator.userAgent,
        subString: "OmniWeb",
        versionSearch: "OmniWeb/",
        identity: "OmniWeb"
      },
      {
        string: navigator.vendor,
        subString: "Apple",
        identity: "Safari",
        versionSearch: "Version"
      },
      {
        prop: window.opera,
        identity: "Opera",
        versionSearch: "Version"
      },
      {
        string: navigator.vendor,
        subString: "iCab",
        identity: "iCab"
      },
      {
        string: navigator.vendor,
        subString: "KDE",
        identity: "Konqueror"
      },
      {
        string: navigator.userAgent,
        subString: "Firefox",
        identity: "Firefox"
      },
      {
        string: navigator.vendor,
        subString: "Camino",
        identity: "Camino"
      },
      {   // for newer Netscapes (6+)
        string: navigator.userAgent,
        subString: "Netscape",
        identity: "Netscape"
      },
      {
        string: navigator.userAgent,
        subString: "MSIE",
        identity: "Explorer",
        versionSearch: "MSIE"
      },
      {
        string: navigator.userAgent,
        subString: "Gecko",
        identity: "Mozilla",
        versionSearch: "rv"
      },
      {     // for older Netscapes (4-)
        string: navigator.userAgent,
        subString: "Mozilla",
        identity: "Netscape",
        versionSearch: "Mozilla"
      }
    ],
    dataOS: [
      {
        string: navigator.platform,
        subString: "Win",
        identity: "Windows"
      },
      {
        string: navigator.platform,
        subString: "Mac",
        identity: "Mac"
      },
      {
        string: navigator.userAgent,
        subString: "iPhone",
        identity: "iPhone/iPod"
      },
      {
        string: navigator.platform,
        subString: "Linux",
        identity: "Linux"
      }
    ]
  };

  browserDetect.init();

  return browserDetect;
})