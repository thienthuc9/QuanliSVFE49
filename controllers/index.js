// Chứa thông tin tất cả sinh viên đc thêm từ form
var mangSinhVien = [];
var validate = new Validation();
//------------------Giao tiếp với API thông qua axios--------------------
document.getElementById('btnThem').onclick = function () {
    //lấy thông tin sinh viên
    var sinhVien = new Sinhvien();

    sinhVien.maSV = document.getElementById('maSinhVien').value;
    sinhVien.tenSV = document.getElementById('tenSinhVien').value;
    sinhVien.email = document.getElementById('email').value;
    sinhVien.loaiSV = document.getElementById('loaiSinhVien').value
    sinhVien.diemToan = document.getElementById('diemToan').value;
    sinhVien.diemHoa = document.getElementById('diemHoa').value;
    sinhVien.diemLy = document.getElementById('diemLy').value;
    sinhVien.diemRenLuyen = document.getElementById('diemRenLuyen').value;
    var valid = validate.kiemTraRong(sinhVien.maSV, '#error_maSinhVien') & validate.kiemTraRong(sinhVien.tenSV, '#error_tenSinhVien')
        & validate.kiemTraRong(sinhVien.email, '#error_Email') & validate.kiemTraRong(sinhVien.diemToan, '#error_Toan')
        & validate.kiemTraRong(sinhVien.diemLy, '#error_Ly') & validate.kiemTraRong(sinhVien.diemHoa, '#error_Hoa')
        & validate.kiemTraRong(sinhVien.diemRenLuyen, '#error_RenLuyen');
 
    //     }

    //kiểm tr tên là ký tự
    // var regexTen = /^[a-z A-Z]+$/;
    // if(!regexTen.test(sinhVien.tenSV)){
        
    //     document.getElementById('error_all_letter_tenSinhVien').innerHTML = "ten sinh vien chưa đúng"
    // }else{
    //     document.getElementById('error_all_letter_tenSinhVien').innerHTML = ""
    // }
    valid &= validate.kiemTraTatCaLaChuoi(sinhVien.tenSV,'#error_all_letter_tenSinhVien')
    // kiểm tra email
    & validate.kiemTraEmail(sinhVien.email,'#error_all_letter_EmailSinhVien')
    & validate.kiemTraNumber(sinhVien.diemHoa,'#error_all_letter_Hoa') & validate.kiemTraNumber(sinhVien.diemToan,'#error_all_letter_Toan')  & validate.kiemTraNumber(sinhVien.diemLy,'#error_all_letter_Ly')
    & validate.kiemTraNumber(sinhVien.diemRenLuyen,'#error_all_letter_RenLuyen')  & validate.kiemtraMaxMin(sinhVien.diemToan,'#error_minmax_Toan',0,10) & validate.kiemtraDoDai(sinhVien.tenSV,'#error_all_lenght_tenSinhVien',2,50)
    // kiểm tra max min
    // valid
    //  & validate.kiemtraMaxMin(sinhVien.diemLy,'#error_minmax_Ly')
    // & validate.kiemtraMaxMin(sinhVien.diemHoa,'#error_minmax_Hoa') & validate.kiemtraMaxMin(sinhVien.diemRenLuyen,'#error_minmax_RenLuyen')
    if (!valid) {
        return
    }
    
    // push thêm 1 phần tử vào mảng
    mangSinhVien.push(sinhVien)

    renderTableSV(mangSinhVien);
    luuLocalStorge();
}
var renderTableSV = function (mangSV) {
    // từ dữ liệu mảng tạo ra các thẻ tr tương ứng
    var chuoiTr = '';
    for (var index = 0; index < mangSinhVien.length; index++) {
        //Mỗi lần duyệt lấy ra dữ liệu của 1 SV trong mảng
        var sinhVien = mangSinhVien[index];
        //Tạo object mới lấy dữ liệu từ mảng SV[i] gắn qua
        var sv = new Sinhvien();
        sv.maSV = sinhVien.maSV;
        sv.tenSV = sinhVien.tenSV;
        sv.email = sinhVien.email;
        sv.diemHoa = sinhVien.diemHoa;
        sv.diemLy = sinhVien.diemLy;
        sv.diemToan = sinhVien.diemToan;
        sv.diemRenLuyen = sinhVien.diemRenLuyen;
        chuoiTr += `
        <tr>
            <td>${sv.maSV}</td>
            <td>${sv.tenSV}</td>
            <td>${sv.xepLoai()}</td>
            <td>${sv.tinhDiemTrungBinh()}</td>
            <td>${sv.diemRenLuyen}</td>
            <td><button style="transition: all 0.5s" class="btn btn-outline-primary">Chỉnh Sửa</button></td>
            <td><button style="transition: all 0.5s" class="btn btn-outline-danger" onclick="xoaSV('${sinhVien.maSV}')">Xóa</button></td>
        </tr>
        `
    }
    document.getElementById('tableSV').innerHTML = chuoiTr;
}
var xoaSV = function (maSV) {
    //Từ mã SV tìm ra tk sinh viên cần xóa
    for (var i = mangSinhVien.length - 1; i >= 0; i--) {
        // mỗi lần duyệt lấy ra 1 sinh viên 
        var sinhVien = mangSinhVien[i];
        if (sinhVien.maSV === maSV) //Nếu sinh vien trong mãng có mã = mã sinh viên được click
        {
            // Tại vị trí đó xóa phần đó đi
            mangSinhVien.splice(i, 1);

        }
    }
    // Sau khi xóa xong tạo lại table sinh vien
    renderTableSV(mangSinhVien);
    luuLocalStorge();
}
var luuLocalStorge = function(){
    // biến mảng SV thành chuôi
    var sMangSinhVien = JSON.stringify(mangSinhVien);
    // Lưu vào Localstorge
    localStorage.setItem('mangSinhVien',sMangSinhVien);

}
var layDuLieuLocalStorge = function(){
    if(localStorage.getItem('mangSinhVien')){
        var sMangSinhVien = localStorage.getItem('mangSinhVien');
        //chuyển chuỗi localstrorage về mảng ( object) và gắn cho sMangSinhVien
        mangSinhVien = JSON.parse(sMangSinhVien)
        // Gọi hàm render mangsinhvien => render lại table
        // renderTableSV(mangSinhVien);
renderTableSV(mangSinhVien);
    }
    // Lấy dư  liệu từ LocalStorge
}
layDuLieuLocalStorge()
console.log(axios);