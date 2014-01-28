define(['angular', '../module'], function (ng) {
  'use strict';

  ng.module('cs_account.services')
  .constant('config', {
          filepickerKey: 'AyhhQTTJYTEmWwKCv5pNAz',
          mimetypes: [ 'application/msword', 'application/pdf', 'text/*', 'image/*' ],
          servicesForPick: [
              'BOX',
              'COMPUTER',
              'EVERNOTE',
              'DROPBOX',
              'FLICKR',
              'FTP',
              'GITHUB',
              'GOOGLE_DRIVE',
              'SKYDRIVE',
              'GMAIL',
              'URL',
              'WEBCAM'
          ],
          servicesForMultiplePick: [
              'BOX',
              'COMPUTER',
              'EVERNOTE',
              'DROPBOX',
              'FLICKR',
              'FTP',
              'GITHUB',
              'GOOGLE_DRIVE',
              'SKYDRIVE'
          ],
          openTo: 'COMPUTER',
          maxSize: 1024 * 1024 * 10
      });

});
