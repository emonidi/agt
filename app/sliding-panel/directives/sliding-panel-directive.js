/**
 * Created by emonidi on 12/30/15.
 */
'use strict'
angular.module('slidingPanel')
    .directive('slidingPanel', ['$timeout', function ($timeout) {

        function setBottom(element, margin) {
            element.style.bottom = margin + "px"
        }



        return {
            restrict: 'E',
            replace: true,
            scope:{
                images:"=imageUrls",
                imageWidth:"=imageWidth"
            },
            templateUrl: 'sliding-panel/directives/sliding-panel-template.html',
            link: function (scope, elem, attrs) {
                var canDrag = false;
                var elementPosition = 0;
                var moveDirection = 0;
                var bounds = {
                    top: -1,
                    bottom: -1
                };
                elem = elem[0];
                var content = elem.getElementsByClassName('content')[0];
                var button = elem.getElementsByClassName('drag-button')[0];
                var footer = elem.getElementsByClassName('footer')[0];
                var footerHeight = footer.clientHeight;

                scope.$watch('images', function (newVal, oldVal) {
                        initialize();
                })

                function initialize() {
                    bounds.top = window.innerHeight - footerHeight
                    elementPosition = bounds.top;
                    setBottom(elem,bounds.top);

                }

                function getBoundsBottom(){
                    bounds.bottom = elem.clientHeight > window.innerHeight ? 0 : window.innerHeight - elem.clientHeight;
                }

                function isCollapsed(){
                    return elementPosition === bounds.bottom;
                }

                function animate(direction) {
                    var start = null;
                    var reqId;

                    function step(timestamp) {
                        if (!start) start = timestamp;
                        var progress = timestamp - start;
                        elementPosition = parseInt(elementPosition + (progress) * direction);
                        setBottom(elem, elementPosition);
                        if(direction !== 0 && elementPosition > bounds.bottom && elementPosition < bounds.top){
                            reqId = window.requestAnimationFrame(step);
                        }else{
                            window.cancelAnimationFrame(reqId);
                            setInBounds();
                        }
                    }

                    reqId = window.requestAnimationFrame(step);
                }

                function setInBounds() {
                    if (elementPosition > bounds.top) {
                        elementPosition = bounds.top;
                    }else if(elementPosition < bounds.bottom){
                        elementPosition = bounds.bottom
                    }
                    setBottom(elem, elementPosition);
                }

                button.addEventListener('mousedown', function () {
                    canDrag = true;
                }, false);

                document.addEventListener('mouseup', function () {
                    canDrag = false;
                    animate(moveDirection);
                });

                document.addEventListener('mousemove', function (ev) {
                    ev.preventDefault();
                    getBoundsBottom()
                    if (canDrag) {
                        if(elementPosition <= bounds.top && elementPosition >= bounds.bottom){
                            elementPosition = elementPosition - ev.movementY;
                            setBottom(elem, elementPosition);
                            moveDirection = ev.movementY > 0 ? -1 : 1;
                        }else{
                            setInBounds();
                            canDrag = false;
                        }
                    }
                });

                window.addEventListener('resize',function(){
                    getBoundsBottom();
                    setInBounds();
                    animate(-1)
                })
            }
        }
    }]);