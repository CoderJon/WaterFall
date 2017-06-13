/**
 * Created by coderjon on 2017/6/8.
 */



function $(id) {
    return typeof id === 'string' ? document.getElementById(id) : id;
}

window.onload = function () {
    //实现瀑布流
    waterFall('main', 'box');
    var dataImg = {"data": [{"src":"0.jpg"}, {"src":"1.jpg"}, {"src":"2.jpg"}, {"src":"3.jpg"}, {"src":"4.jpg"}]};
    //监听页面的滚动
    window.onscroll = function () {

        //判断是否具备加载图片的条件
        if (checkWillLoadImg()){

            for (var  i = 0; i < dataImg.data.length; i ++){
                //创建最外面的盒子
                var  newBox = document.createElement('div');
                newBox.className = 'box';
                $('main').appendChild(newBox);

                //创建里面的盒子
                var newPic = document.createElement('div');
                newPic.className = 'pic';
                newBox.appendChild(newPic);

                //图片
                var newImg = document.createElement('img');
                newImg.src = 'images/' + dataImg.data[i].src;
                newPic.appendChild(newImg);
                console.log(newImg.src);
            }

            waterFall('main', 'box');
        }
    }
}

//实现瀑布流
function waterFall(parent, box) {
    //让所有盒子的父标签居中

    //1.拿到所有的盒子
    var allBox = $(parent).getElementsByClassName(box);
    // alert(allBox.length);
    //2.拿到其中一个盒子的宽度
    var boxWidth = allBox[0].offsetWidth;
    //3.求出页面的宽度
    var screenWidth = document.body.clientWidth;
    //求出列数
    var cols = Math.floor(screenWidth/boxWidth);
    //让父标签居中
    $(parent).style.cssText = 'width:' + boxWidth *cols + 'px; margin:0 auto;';

    //定位
    //定义一个高度数组
    var heightArr = [];
    //遍历
    for (var i = 0;i < allBox.length; i ++){
        //求出所有盒子的高度

        var boxHeight = allBox[i].offsetHeight;
        if (i < cols){

            heightArr.push(boxHeight);
            console.log('前面' + i);
        }else {
            console.log('后面' + i);
            //取出最矮盒子
            var minBoxHeight = Math.min.apply(null, heightArr);
            //取出最矮盒子对应的索引
            var minBoxIndex = getMinIndex(minBoxHeight,heightArr);
            //对剩余盒子进行定位
            allBox[i].style.position = 'absolute';
            allBox[i].style.top = minBoxHeight + 'px';
            allBox[i].style.left = minBoxIndex * boxWidth + 'px';
            //更新高度
            heightArr[minBoxIndex] += boxHeight;
        }
    }
}

//求出最矮盒子在数组中的索引
function getMinIndex(val, arr) {
    for (var i = 0; i < arr.length; i ++){
        if (arr[i] == val){
            return i;
        }
    }
}

//判断是否具备加载图片的条件
function checkWillLoadImg() {
    // // 求最后一个盒子的offsettop + 自身的一半
    // var allBoxs = $('main').getElementsByClassName('box');
    // var lastBox =  allBoxs[allBoxs.length - 1];
    // var lastBoxDis = lastBox.offsetTop + Math.floor(lastBox.offsetHeight/2);
    // // 求出页面偏离的高度(标准模式和混杂模式)
    // var scrollTopH = document.body.scrollTop || document.documentElement.scrollTop;
    // // 求出浏览器的高度
    // var screenH = document.body.clientHeight || document.documentElement.clientHeight;
    // return lastBoxDis < (scrollTopH + screenH) ? true : false;

    //拿到所有盒子
    var allBox = $('main').getElementsByClassName('box');

    //取出最后一个盒子
    var lastBox =allBox[allBox.length - 1];

    //取出盒子头部偏离的高度
    var offsetTop = lastBox.offsetTop;

    //自身高度的一半
    var lastBoxDis = Math.floor(lastBox.offsetHeight/2);

    //求出浏览器高度
    var screenH = document.body.clientHeight || document.documentElement.clientHeight;

    ///取出页面偏离浏览器的高度，标准模式和混杂模式
    var offsetTopH = document.body.scrollTop || document.documentElement.scrollTop;

    console.log(offsetTop, lastBoxDis, offsetTopH);

    return (offsetTop + lastBoxDis) < (offsetTopH + screenH) ? true : false;

}