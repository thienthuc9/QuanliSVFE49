//Khai bóa svService tương tác API
var svService = new SinhVienService();

// Giao tiếp với Backend qua Axios 


var getAPIGet = function () {
    var objectAPI = {
        url: 'http://svcy.myclass.vn/api/SinhVien/LayDanhSachSinhVien', // đường dẫn đến file backend cung cấp
        method: 'GET' //Phương thức backend cung cấp
    }
    //Gửi yêu cầu dữ liệu đến backend
    var promise = axios(objectAPI);

    // xử lý thành công 
    var funcSuccess = function (result) {
        // gọi thành công thì render table
        renderTableSV(result.data)
    }
    //Xử lí thất bại
    var fucnFail = function (error) {
        console.log(error);
    }
    //then(): Hàm nhận vào giá trị là 1 hàm xử lý thành công
    //catch(): Hầm nhận vào giá trị là 1 hàm xử lý thất bịa
    // Lưu ý ajax là kỹ thuật xử lý Bất ĐỒNG BỘ
    promise.then(funcSuccess).catch(fucnFail);

    var renderTableSV = function (mangsinhvien) {
        var contentTable = '';
        //Sau khi ;ấy được từ back end=> tạo ra bảng giao diện
        for (var i = 0; i < mangsinhvien.length; i++) {
            // Lấy từng SV trong dữ liệu backend trả về /
            var sinhvien = mangsinhvien[i];
            // Tạo ra 1 sv object từ pro sinh vien
            var sv = new Sinhvien();

            sv.maSV = sinhvien.MaSV;
            sv.tenSV = sinhvien.HoTen;
            sv.email = sinhvien.Email;
            sv.diemHoa = sinhvien.DiemHoa;
            sv.diemLy = sinhvien.DiemLy;
            sv.diemToan = sinhvien.DiemToan;
            sv.diemRenLuyen = 5;
            contentTable += `
            <tr>
                <td>${sv.maSV}</td>
                <td>${sv.tenSV}</td>
                <td>${sv.xepLoai()}</td>
                <td>${sv.tinhDiemTrungBinh()}</td>
                <td>${sv.diemRenLuyen}</td>
                <td><button style="transition: all 0.5s" class="btn btn-outline-warning" onclick="chinhSuaSV('${sv.maSV}')">Chỉnh Sửa</button></td>

                <td><button style="transition: all 0.5s" class="btn btn-outline-danger" onclick="xoaSV('${sv.maSV}')">Xóa</button></td>
            </tr>
            `
        }
        //Dom đến giao diện ghi thông tin dữ liệu vào
        document.getElementById('tableSV').innerHTML = contentTable;
    }
}


getAPIGet()
// ............................THÊM DỮ LIÊU LÊN SERVER QUA API 
document.getElementById('btnThem').onclick = function () {
    // Lấy thông tin từ ngươi dùng gắn vào data backend => Data phải chuẩn định dạng backend yêu cầu
    var sinhvien = {

        MaSV: document.getElementById('maSinhVien').value
        ,
        HoTen: document.getElementById('tenSinhVien').value,
        Email: document.getElementById('email').value,
        SoDT: 054654654,
        CMND: 564654654,
        DiemToan: document.getElementById('diemToan').value,
        DiemLy: document.getElementById('diemLy').value,
        DiemHoa: document.getElementById('diemHoa').value,


    }
    console.log(sinhvien);

    //Dùng axios đưa dữ liệu lên backend xú lý
    axios({
        url: 'http://svcy.myclass.vn/api/SinhVien/ThemSinhVien',
        method: 'POST',
        data: sinhvien
    }).then(function (result) {
        
        getAPIGet();

    }).catch(function (error) {
        console.log(error);
    })

    // axios(objectAxios)



    // //Gửi yêu cầu dữ liệu đến backend
    // var promise = axios(objectAxios);
    // // xử lý thành công 
    // var funcSuccess = function (result) {

    //     getAPIGet()
    // }
    // //Xử lí thất bại
    // var fucnFail = function (error) {
    //     console.log(error);
    // }
    // promise.then(funcSuccess).catch(fucnFail);


}
/// Lưu thông tin sinh vien///
document.getElementById('btnLuu').onclick = function(){
    //lấy thông tin sv gán vào data gưi lên API
    var sinhVienCapNhat ={
        MaSV: document.getElementById('maSinhVien').value,
        HoTen: document.getElementById('tenSinhVien').value,
        Email: document.getElementById('email').value,
        SoDT: 054654654,
        CMND: 564654654,
        DiemToan: document.getElementById('diemToan').value,
        DiemLy: document.getElementById('diemLy').value,
        DiemHoa: document.getElementById('diemHoa').value,
    }
    var promise = svService.capNhatSinhVien(sinhVienCapNhat);
    promise.then(function(result){
        console.log(result.data);
        // Load lại database
        getAPIGet();
        //Mở khóa nút thêm SV
        document.getElementById('btnThem').disabled = false;
        document.getElementById('maSinhVien').disabled = false;

        document.getElementById('btnLuu').disabled = true;

    })
}

//.........................Xóa SINH VIEN qan API

var xoaSV = function (maSV) {
    var promise = svService.xoaSinhVien(maSV);
    promise.then(function (result) {
        // Xóa thành công thì load Danh sach SV
        getAPIGet();

    }).catch(function (error) {
        console.log(error);
    })
}
var chinhSuaSV = function(maSV){
    var promise = svService.layThongTinSinhVien(maSV);
    promise.then(function(result){
       var SVedit = result.data;
       document.getElementById('maSinhVien').value = SVedit.MaSV;
       document.getElementById('tenSinhVien').value = SVedit.HoTen;
       document.getElementById('diemToan').value = SVedit.DiemToan;
       document.getElementById('diemLy').value = SVedit.DiemLy;
       document.getElementById('diemHoa').value = SVedit.DiemHoa;

        //Khóa Mã
        document.getElementById('maSinhVien').disabled = true;
        document.getElementById('btnThem').disabled = true;
        document.getElementById('btnLuu').disabled = false;



    }).catch(function(error){
        console.log(error);
    })
}