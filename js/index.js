function Select() {
    this.mark = document.querySelector(".slider-mark");
    this.init();
}
Select.prototype = {
    init: function () {
        if (!document.querySelector(".sliderSelector")) {
            var div = document.createElement("div");
            div.className = 'sliderSelector';
            document.querySelector(".container").appendChild(div);
            this.slider = div;
        } else {
            this.slider = document.querySelector(".sliderSelector");
        }
    },
    temp: '<div class="sliderHead">\
                  <label>title</label>\
                  <span class="cancel">取消</span>\
               </div>\
               <div class="sliderCont">content</div>',
    bindEvent: function () {
        var that = this;
        this.slider.addEventListener('click', function (e) {
            var eve = e || window.event;
            var target = eve.target || eve.srcElement;
            if (target.tagName.toUpperCase() == "P") {
                var info = target.getAttribute("data-type");
                var information = target.innerHTML;
                that.data.callback({
                    selected: info,
                    text: information
                })
                that.hide();
                return;
            }
            if (target.className == 'cancel') {
                that.hide()
            }
        }, false)
    },
    show: function (data) {
        this.mark.className = this.mark.className + ' show';
        this.slider.className = this.slider.className + ' sliderActive';
        this.data = data;
        this.render();
        this.bindEvent();
    },
    hide: function () {
        this.mark.className = this.mark.className.replace("show", "");
        this.slider.className = this.slider.className.replace("sliderActive", "");
    },
    render: function () {
        var tmdata = this.data.data;
        var str = "";
        for (var i in tmdata) {
            str += '<p class="selectOption" data-type=' + i + '>' + tmdata[i] + '</p>'
        }
        this.temp = this.temp.replace('title', this.data.title).replace("content", str);
        this.slider.innerHTML = this.temp;
    }
}
var sliderselect = new Select();
var btn = document.querySelector(".btn");
btn.addEventListener("click", function () {
    sliderselect.show({
        title: "选项",
        data: ['11', '22', '33'],
        init: 1,
        callback: function (selectedData) {
            document.querySelector(".btn").innerHTML = selectedData.text;
        }
    });
}, false)