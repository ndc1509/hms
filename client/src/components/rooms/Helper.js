import React from "react";

const Helper = () => {
    return (
        <div className="float-end">
            <div className="d-inline-block" style={{ backgroundColor: "green", width: "80px",textAlign:'center',color:'white' }}>
            Trống
            </div>
            
            &nbsp;
            <div className="d-inline-block" style={{ backgroundColor: "red", width: "80px",textAlign:'center',color:'white' }}>
                Có khách
            </div>
            &nbsp;
            <div className="d-inline-block" style={{ backgroundColor: "black", width: "80px",textAlign:'center',color:'white' }}>
                Hết hạn
            </div>
            &nbsp;
            <div className="d-inline-block" style={{ backgroundColor: "yellow", width: "80px",textAlign:'center',color:'black' }}>
                Chưa dọn
            </div>
        </div>
    );
};

export default Helper;
