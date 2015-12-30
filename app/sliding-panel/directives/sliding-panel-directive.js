/**
 * Created by emonidi on 12/30/15.
 */
'use strict'
angular.module('slidingPanel')
    .directive('slidingPanel', ['$timeout',function ($timeout) {

        //gets the height of an element
        function getHeight(element) {
            return element.clientHeight;
        }

        //adds class to element
        function addClassTo(element,className){
            var existingClasses = element.getAttribute('class');
            element.setAttribute('class',existingClasses+" "+className);
        }

        //removes class from element
        function removeClassFrom(element,className){
            var existingClasses = element.getAttribute('class');
            element.setAttribute('class',existingClasses.replace(className,''));
        }

        function setElementMarginTop(element,margin){
            element.style.marginTop = margin+"px"
        }

        return {
            restrict: 'E',
            replace:true,
            priority:0,

            templateUrl: 'sliding-panel/directives/sliding-panel-template.html',
            link: function (scope, elem, attrs) {
                var canDrag;
                var imageWidth = parseInt(attrs.imagewidth);
                var elementPosition = 0;
                var bounds = {
                    top:0,
                    bottom:0
                }
                elem = elem[0];
                var content = elem.getElementsByClassName('content')[0];
                var button = elem.getElementsByClassName('drag-button')[0];
                 setElementMarginTop(elem,-100000)

                scope.$watch('images',function(newVal, oldVal){
                    initialize();
                })

                function initialize(){
                    canDrag = false;
                    var imagesLoaded = 0;
                    var images = content.getElementsByTagName('img');
                    for(var i = 0; i< images.length; i++){
                        (function(){
                            images[i].onload = function(){
                                imagesLoaded += 1;
                                if(imagesLoaded === images.length){
                                    calculatePosition();
                                    setElementMarginTop(elem,elementPosition)
                                };
                            }
                            images[i].width = imageWidth;
                            images[i].src = scope.images[i];
                        })(i)
                    }
                }

                function calculatePosition(){
                    elementPosition = getHeight(content)*-1;
                    bounds.top = elementPosition;
                }

                button.addEventListener('mousedown',function(){
                    canDrag = true;
                },false);

                document.addEventListener('mouseup',function(){
                    canDrag = false;
                    setElementMarginTop(elem,elementPosition)
                });

                document.addEventListener('mousemove',function(ev){
                    if(canDrag && elementPosition >= bounds.top && elementPosition <= bounds.bottom){
                        elementPosition = elementPosition + ev.movementY// +(Math.ceil(ev.movementY+(0.05*ev.movementY)));
                        setElementMarginTop(elem,elementPosition);
                    }

                    if(elementPosition < bounds.top){
                        elementPosition = bounds.top;
                    }else if(elementPosition > bounds.bottom){
                        elementPosition = bounds.bottom;
                    }


                });
            }
        }
    }]);