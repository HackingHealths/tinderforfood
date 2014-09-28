angular.module('starter.directives', [])

.directive('noScroll', function($document) {

  return {
    restrict: 'A',
    link: function($scope, $element, $attr) {
      $document.on('touchmove', function(e) {
        console.log($attr.noScroll)
        if ($attr.noScroll === 'true') {
          e.preventDefault();
        }
      });
    }
  }
})

.directive('imageonload', function() {
  return {
    restrict: 'A',
    link: function($scope, $element, $attrs) {
      $element.bind('load', function() {
        $scope.$apply($attrs.imageonload);
      });
    }
  };
});
