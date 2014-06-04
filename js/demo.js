(function(window) {
    function HotSpot() {
        this.init();
    }
    HotSpot.prototype = {
        init: function() {
            this.SpotHover();
        },
        //get elements by classname
        $$: function(className, ele) {
            if (document.getElementsByClassName) {
                return (ele || document).getElementsByClassName(className);
            }
            var nodes = (ele || document).getElementsByTagName('*'),
                eles = [],
                currentNode,
                nodesLength = nodes.length,
                curClassNames,
                i,
                j;
            for(i = 0; i < nodesLength; i++) {
                currentNode = nodes[i];
                curClassNames = currentNode.className.split(' ');
                for(j = 0; j < curClassNames.length; j++) {
                    if (className === curClassNames[j]) {
                        eles.push(currentNode);
                        break;
                    }
                }
            }
            return eles;
        },
        SpotHover: function() {
            var hotspots = this.$$('hotspot'),
                len = hotspots.length,
                that = this,
                i,
                currentImg;
            for(i = 0; i < len; i++) {
                currentImg = that.$$('detailimg', hotspots[i])[0];
                currentImg.alpha = 0;
                //add property
                currentImg.timer = null;
                hotspots[i].mouseover = function(e) {
                    that.doTransform(that.$$('detailImg', this)[0], 100);
                    that.$$('spotspan', this)[0].style.display = 'none';
                }
                hotspots[i].mouseout = function(e) {
                    that.doTransform(that.$$('detailImg', this)[0], 0);
                    that.$$('spotspan', this)[0].style.display = 'block';
                }
            }
        },
        doTransform: function(me, alpha) {
            var times = 0;
            if (alpha === 100) {
                times = 5;
            } else {
                times = -5;
            }
            me.style.display = 'block';
            clearInterval(me.timer);
            me.timer = setInterval(function() {
                if (me.alpha === alpha) {
                    clearInterval(me.timer);
                    if (alpha === 0) {
                        me.style.display = 'none';
                    }
                } else {
                    me.alpha += times;
                    me.style.opacity = me.alpha / 100;
                    //ie
                    me.style.filter = 'alpha(opacity=' + me.alpha + ')';
                }
            }, 30);
        }
    }

    new HotSpot();// 创建实例，调用init方法
})(window)