define( [ 'angular', '../module' ], function( ng ) {
  'use strict';

  /**
   * @ngdoc filter
   * @name ngSeed.filters:startsWith
   * @description
   *
   * Filters a collection with a simple regex.
   *
   * @example
    <doc:example>
      <doc:source>
       <script>
         function Ctrl($scope) {
           $scope.friends =
               [{name:'John'},
                {name:'Mary'},
                {name:'Mike'},
                {name:'Adam'},
                {name:'Julie'}]
         }
       </script>
       <div ng-controller="Ctrl">
         <hr/>
         <input type="text" model="letter">
         <table class="friend">
           <tr>
             <th>Name</th>
           </tr>
           <tr ng-repeat="friend in friends | startsWith:'name':letter">
             <td>{{friend.name}}</td>
           </tr>
         </table>
       </div>
      </doc:source>
      <doc:scenario>
        it('should be reverse ordered by aged', function() {
          expect(binding('predicate')).toBe('-age');
          expect(repeater('table.friend', 'friend in friends').column('friend.age')).
            toEqual(['35', '29', '21', '19', '10']);
          expect(repeater('table.friend', 'friend in friends').column('friend.name')).
            toEqual(['Adam', 'Julie', 'Mike', 'Mary', 'John']);
        });

        it('should reorder the table when user selects different predicate', function() {
          element('.doc-example-live a:contains("Name")').click();
          expect(repeater('table.friend', 'friend in friends').column('friend.name')).
            toEqual(['Adam', 'John', 'Julie', 'Mary', 'Mike']);
          expect(repeater('table.friend', 'friend in friends').column('friend.age')).
            toEqual(['35', '10', '29', '19', '21']);

          element('.doc-example-live a:contains("Phone")').click();
          expect(repeater('table.friend', 'friend in friends').column('friend.phone')).
            toEqual(['555-9876', '555-8765', '555-5678', '555-4321', '555-1212']);
          expect(repeater('table.friend', 'friend in friends').column('friend.name')).
            toEqual(['Mary', 'Julie', 'Adam', 'Mike', 'John']);
        });
      </doc:scenario>
    </doc:example>
   */
  ng
  .module( 'cs_common.filters' )
  .filter( 'startsWith', function() {

    return function( str, letter, prop ) {
      letter = letter || undefined;
      if ( !letter ) {
        return str;
      }
      var filtered = [];
      str.forEach( function( i ) {
        if ( ( new RegExp( '^[' + letter.toLowerCase() + letter.toUpperCase() + ']' ) ).test( i[ prop ] ) ) {
          filtered.push( i );
        }
      });
      return filtered;
    };
  });

});
