var Sinhvien = function(){
    this.maSV='';
    this.tenSV='';
    this.diemToan='';
    this.diemLy= '';
    this.diemHoa= '';
    this.diemRenLuyen ='';
    this.loaiSV ='';
    this.email='';
    this.tinhDiemTrungBinh = function(){
        //this đại diện cho đối tượng sinh viên (chứa 7 thược tính maSV,tenSV,...)
        return (Number(this.diemHoa) + Number(this.diemLy) + Number(this.diemToan))/3;
    },
    
     this.xepLoai = function () {
         var diemTB = this.tinhDiemTrungBinh();
        if (this.diemRenLuyen < 5) {
           
          
            return 'Yếu'
        } else if (this.diemRenLuyen >= 5) {
            if (diemTB < 5) {
                return 'Yếu'
            } else if (diemTB >= 5 && diemTB  <= 6.5) {
                return 'TB Khá'
            } else if (diemTB  >= 6.5 && diemTB  < 8) {
                return 'Khá'
            } else if (diemTB  >= 8 && diemTB  < 9) {
                return 'Giỏi'
            } else if (diemTB  >= 9 && diemTB  <= 10) {
                return 'Xuất Săc'
            } else {
                return 'Điểm TB ko hợp lệ'
            }
    
        } 
    }
    
}