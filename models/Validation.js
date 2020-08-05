var Validation = function () {
    this.kiemTraRong = function (value, selectorError) {
        if (value.trim() === "") {
            document.querySelector(selectorError).innerHTML = 'Không được bỏ trống';
            document.querySelector(selectorError).style.display = 'block';
            return false;
        }
        document.querySelector(selectorError).innerHTML = '';
        document.querySelector(selectorError).style.display = 'none';
        return true
    }
    this.kiemTraTatCaLaChuoi = function (value, selectorError) {
        var regexAlletter = /^[a-z A-Z]+$/;
        if (regexAlletter.test(value.trim())|| value.trim() ==="") {
            document.querySelector(selectorError).innerHTML = '';
            document.querySelector(selectorError).style.display = 'none';
            return true
        }
        document.querySelector(selectorError).innerHTML = 'Không đúng định dạng';
        document.querySelector(selectorError).style.display = 'block';
        return false;
    }
    this.kiemTraEmail = function (value, selectorError) {
        var regexAlletter = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (regexAlletter.test(value.trim())|| value.trim() ==="") {
            document.querySelector(selectorError).innerHTML = '';
            document.querySelector(selectorError).style.display = 'none';
            return true
        }
        document.querySelector(selectorError).innerHTML = 'Email Không đúng định dạng';
        document.querySelector(selectorError).style.display = 'block';
        return false;
    }
    this.kiemTraNumber = function (value, selectorError) {
        var regexAlletter = /^[+-]?\d+(\.\d+)?$/;
        if (regexAlletter.test(value.trim())|| value.trim() ==="") {
            document.querySelector(selectorError).innerHTML = '';
            document.querySelector(selectorError).style.display = 'none';
            return true
        }
        document.querySelector(selectorError).innerHTML = 'Điểm Không đúng định dạng';
        document.querySelector(selectorError).style.display = 'block';
        return false;
    }
    
    this.kiemtraMaxMin = function(value,selectorError,minValue,maxValue){
        if(Number(value.trim() < minValue) || Number(value.trim()> maxValue)){
            document.querySelector(selectorError).innerHTML = `Giá trị từ ${minValue} - ${maxValue}` ;
            document.querySelector(selectorError).style.display = 'block';  
            return false;
        }
        document.querySelector(selectorError).innerHTML = '';
        document.querySelector(selectorError).style.display = 'none';
        return true;

    }
    this.kiemtraDoDai = function(value,selectorError,minLenght,maxLenght){
        if(value.length < minLenght || value.length > maxLenght){
            document.querySelector(selectorError).innerHTML = `Độ dài từ ${minLenght} - ${maxLenght}` ;
            document.querySelector(selectorError).style.display = 'block';  
            return false;
        }
        document.querySelector(selectorError).innerHTML = '';
        document.querySelector(selectorError).style.display = 'none';
        return true;
    }
}