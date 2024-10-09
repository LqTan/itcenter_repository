// Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-dark text-white py-4 mt-3">
            <div className="container">
                <div className="row align-items-center"> {/* Đổi từ align-items-end thành align-items-center */}
                    {/* Hàng đầu tiên: Logo và Thông tin liên hệ */}
                    <div className="col-md-4 text-center">
                        <img src="https://via.placeholder.com/150" alt="Logo Trung tâm" className="mb-3" />
                    </div>
                    <div className="col-md-4 text-center">
                        <h5 className="mb-0">Thông tin liên hệ</h5>
                    </div>
                </div>
                <div className="row">
                    {/* Hàng thứ hai: Giới thiệu và thông tin liên hệ */}
                    <div className="col-md-4">
                        <p>
                            Trung tâm của chúng tôi chuyên cung cấp các khóa học chất lượng cao và
                            chương trình đào tạo tiên tiến, giúp bạn phát triển kỹ năng và kiến thức
                            trong thời đại công nghệ 4.0.
                        </p>
                    </div>
                    <div className="col-md-4">
                        <ul className="list-unstyled">
                            <li><strong>Số điện thoại:</strong> 0123-456-789</li>
                            <li><strong>Email:</strong> contact@trungtam.edu.vn</li>
                            <li>
                                <strong>Mạng xã hội:</strong>
                                <ul className="list-inline">
                                    <li className="list-inline-item">
                                        <a href="#" className="text-white">Facebook</a>
                                    </li>
                                    <li className="list-inline-item">
                                        <a href="#" className="text-white">Instagram</a>
                                    </li>
                                    <li className="list-inline-item">
                                        <a href="#" className="text-white">LinkedIn</a>
                                    </li>
                                </ul>
                            </li>
                            <li><strong>Địa chỉ:</strong> 123 Đường ABC, Quận XYZ, Thành phố HCM</li>
                        </ul>
                    </div>
                </div>
                <div className="text-center mt-4">
                    <p className="mb-0">© {new Date().getFullYear()} Trung tâm. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;