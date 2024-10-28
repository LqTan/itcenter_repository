import React, {useEffect, useState} from 'react';
import {useParams, useNavigate} from "react-router-dom";
import axios from "axios";
import {Class} from "../../mock_data/mockClass.ts";

// Dữ liệu khóa học mới nhất (danh sách bên phải)
const latestCourses = [
    {id: 1, title: 'Khóa học 1', date: '2024-10-01', image: 'https://via.placeholder.com/300x200'},
    {id: 2, title: 'Khóa học 2', date: '2024-10-02', image: 'https://via.placeholder.com/300x200'},
    {id: 3, title: 'Khóa học 3', date: '2024-10-03', image: 'https://via.placeholder.com/300x200'},
    {id: 4, title: 'Khóa học 4', date: '2024-10-04', image: 'https://via.placeholder.com/300x200'},
    {id: 5, title: 'Khóa học 5', date: '2024-10-05', image: 'https://via.placeholder.com/300x200'},
];

const CourseDetail: React.FC = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<string>('lich-khai-giang');
    const {id_course} = useParams<{ id_course: string }>();
    const [classes, setClasses] = useState<Class[]>([]);
    const [courseOpeningDay, setCourseOpeningDay] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/classes?id_course=${id_course}`);
                setClasses(response.data);

                const courseResponse = await axios.get(`http://localhost:3001/courses/${id_course}`);
                setCourseOpeningDay(courseResponse.data.opening_day);
            } catch (error) {
                console.error('Error fetching classes:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchClasses();
    }, [id_course]);

    if (loading) {
        return <p>Loading...</p>;
    }

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };

    return (
        <div className="container mt-4">
            <div className="row">
                {/* Phần bên trái: Thông tin khóa học */}
                <div className="col-md-8">
                    <div className="card mb-4">
                        <img src="https://via.placeholder.com/800x400" className="card-img-top" alt="Course"/>
                        <div className="card-body">
                            <h2 className="card-title text-center">Tên khóa học</h2>
                            <ul className="nav nav-tabs justify-content-center mt-4">
                                <li className="nav-item">
                                    <button
                                        className={`nav-link ${activeTab === 'lich-khai-giang' ? 'bg-dark text-white' : ''}`}
                                        onClick={() => handleTabClick('lich-khai-giang')}
                                    >
                                        Lịch khai giảng
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button
                                        className={`nav-link ${activeTab === 'thong-tin' ? 'bg-dark text-white' : ''}`}
                                        onClick={() => handleTabClick('thong-tin')}
                                    >
                                        Thông tin
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button
                                        className={`nav-link ${activeTab === 'noi-dung' ? 'bg-dark text-white' : ''}`}
                                        onClick={() => handleTabClick('noi-dung')}
                                    >
                                        Nội dung
                                    </button>
                                </li>
                            </ul>

                            {/* Nội dung bảng cho tab "Lịch khai giảng" */}
                            {activeTab === 'lich-khai-giang' && (
                                <div className="mt-4">
                                    <table className="table table-bordered">
                                        <thead className="thead-dark">
                                        <tr>
                                            <th className="bg-dark text-white">Ca học</th>
                                            <th className="bg-dark text-white">Thời gian</th>
                                            <th className="bg-dark text-white">Ngày khai giảng</th>
                                            <th className="bg-dark text-white">Địa điểm</th>
                                            <th className="bg-dark text-white"></th>
                                            {/* Thêm cột "Hành động" */}
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            classes.map((classItem, index) => (
                                                <tr key={classItem.id_class}>
                                                    <td>{`Ca ${index + 1}`}</td>
                                                    <td>{classItem.start_time + '-' + classItem.end_time}</td>
                                                    <td>{new Date(courseOpeningDay).toLocaleDateString()}</td>
                                                    <td>{classItem.location}</td>
                                                    <td className="text-center">
                                                        <div className="d-flex justify-content-center">
                                                            <button className="btn btn-success btn-sm"
                                                                    onClick={() => navigate('/payment')}>
                                                                Đăng ký
                                                            </button>
                                                            {/* Nút "Đăng ký" */}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                        </tbody>
                                    </table>
                                </div>
                            )}

                            {activeTab === 'noi-dung' && (
                                <div className="mt-4">
                                    <h3 className="text-center mb-4">Khung Đề Cương Lập Trình Viên .NET</h3>
                                    <p className="text-center text-muted">Tổng thời lượng: 156 giờ - 5 Nhóm chuyên đề
                                        (Module)</p>

                                    {/* Module 1 */}
                                    <div className="card mb-4">
                                        <div className="card-header bg-dark text-white">Module 1: Kiến thức nền tảng và
                                            lập trình hướng đối tượng (OOP) với C#
                                        </div>
                                        <div className="card-body">
                                            <p><strong>Tổng thời lượng:</strong> 36 giờ</p>
                                            <ul>
                                                <li>Bài 1: Tổng quan và giới thiệu môi trường</li>
                                                <li>Bài 2: Biến (variable) và Hằng (Constant)</li>
                                                <li>Bài 3: Cấu trúc điều khiển</li>
                                                <li>Bài 4: Xây dựng phương thức (Method)</li>
                                                <li>Bài 5: Làm việc với kiểu dữ liệu Mảng (Array)</li>
                                                <li>Bài 6: Phân loại và xử lý lỗi (Exception Handling)</li>
                                                <li>Bài 7: Lập trình hướng đối tượng (OOP)</li>
                                                <li>Bài 8: Lập trình hướng đối tượng (OOP) – Nâng cao</li>
                                                <li>Bài 9: Làm việc với kiểu dữ liệu Danh sách (Collections và Generic
                                                    Collections)
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Module 2 */}
                                    <div className="card mb-4">
                                        <div className="card-header bg-dark text-white">Module 2: Xử lý dữ liệu với
                                            Entity Framework Core (EF Core) và dịch vụ khác trong ASP.NET Core
                                        </div>
                                        <div className="card-body">
                                            <p><strong>Tổng thời lượng:</strong> 30 giờ</p>
                                            <ul>
                                                <li>Bài 1: Giới thiệu về ASP.NET Core</li>
                                                <li>Bài 2: Giới thiệu về SQL Server</li>
                                                <li>Bài 3: Giới thiệu về EF Core</li>
                                                <li>Bài 4: Thao tác dữ liệu với EF Core</li>
                                                <li>Bài 5: Tổng quan về Google Remote Procedure Call (gRPC)</li>
                                                <li>Bài 6: Xây dựng và triển khai gRPC Service</li>
                                                <li>Bài 7: Xây dựng ứng dụng khai thác gRPC Service</li>
                                                <li>Bài 8: Làm việc với các lệnh Github</li>
                                                <li>Bài 9: Đồ án thực tế 1</li>
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Module 3 */}
                                    <div className="card mb-4">
                                        <div className="card-header bg-dark text-white">Module 3: Xây dựng ứng dụng web
                                            với ASP.Net Core MVC
                                        </div>
                                        <div className="card-body">
                                            <p><strong>Tổng thời lượng:</strong> 30 giờ</p>
                                            <ul>
                                                <li>Bài 1: Tổng quan về ASP.NET Core MVC</li>
                                                <li>Bài 2: Giới thiệu mô hình dữ liệu (Data Model)</li>
                                                <li>Bài 3: Giới thiệu mô hình xử lý điều khiển (Controller)</li>
                                                <li>Bài 4: Giới thiệu về điều hướng (View)</li>
                                                <li>Bài 5: Làm việc với các phương thức của HTML Helper</li>
                                                <li>Bài 6: Làm việc với Data Annotation và Validation</li>
                                                <li>Bài 7: Làm việc với ASP Membership</li>
                                                <li>Bài 8: Xử lý điều hướng (Routing)</li>
                                                <li>Bài 9: Triển khai ứng dụng Web MVC</li>
                                                <li>Bài 10: Đồ án thực tế 2</li>
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Module 4 */}
                                    <div className="card mb-4">
                                        <div className="card-header bg-dark text-white">Module 4: Xây dựng WebAPI với
                                            ASP.Net Core
                                        </div>
                                        <div className="card-body">
                                            <p><strong>Tổng thời lượng:</strong> 30 giờ</p>
                                            <ul>
                                                <li>Bài 1: Giới thiệu một số quy tắc cơ bản trong thiết kế WebAPI</li>
                                                <li>Bài 2: Làm việc với Dependency Injection và Inversion Of Control
                                                </li>
                                                <li>Bài 3: Design Patterns</li>
                                                <li>Bài 4: Tổng quan về WebAPI</li>
                                                <li>Bài 5: Sử dụng API từ Microsoft Azure</li>
                                                <li>Bài 6: Xây dựng Web Serivce dùng API RESTful Service</li>
                                                <li>Bài 7: Đồ án thực tế 3</li>
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Module 5 */}
                                    <div className="card mb-4">
                                        <div className="card-header bg-dark text-white">Module 5: Các kỹ thuật nâng cao
                                            trong ASP.Net Core
                                        </div>
                                        <div className="card-body">
                                            <p><strong>Tổng thời lượng:</strong> 30 giờ</p>
                                            <ul>
                                                <li>Bài 1: Tổng quan về các quy trình phát triển phần mềm</li>
                                                <li>Bài 2: Kiểm tra chức năng với Unit Test</li>
                                                <li>Bài 3: Trực quan hóa dữ liệu</li>
                                                <li>Bài 4: Thiết kế báo cáo</li>
                                                <li>Bài 5: Xử lý đa luồng</li>
                                                <li>Bài 6: Xử lý bất đồng bộ</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'thong-tin' && (
                                <div className="mt-4">
                                    <h3 className="text-center mb-4">Lập Trình Viên .NET</h3>

                                    {/* Thông tin khóa học */}
                                    <div className="card mb-4">
                                        <div className="card-header bg-dark text-white">Giới thiệu về khóa học</div>
                                        <div className="card-body">
                                            <p>
                                                Tham gia khoá học <strong>Lập trình viên .Net chuyên nghiệp</strong>,
                                                bạn sẽ được các giảng viên giàu kinh nghiệm chia sẻ
                                                các kiến thức lập trình .Net từ căn bản đến chuyên sâu, cũng như các
                                                kinh nghiệm xây dựng phần mềm thực tế.
                                            </p>
                                            <p>
                                                Học viên sẽ thực hành từng công đoạn để xây dựng hoàn chỉnh website dưới
                                                sự hướng dẫn nhiệt tình từ giảng viên,
                                                giúp học viên có thể từng bước hình thành các kỹ năng và tư duy lập
                                                trình mà bất kỳ lập trình viên nào cũng cần phải trải qua.
                                            </p>
                                            <p>
                                                Sau khi hoàn thành khoá học, học viên hoàn toàn tự tin xây dựng được ứng
                                                dụng website hoàn chỉnh, hiện đại và đa dạng như:
                                                trang blog cá nhân, website giới thiệu doanh nghiệp, giới thiệu dự án
                                                nhà đất, website bán hàng trực tuyến,…
                                            </p>
                                            <p>
                                                Ngoài ra, với các kiến thức được truyền đạt một cách có hệ thống và kinh
                                                nghiệm được đúc kết trong suốt khoá học sẽ là nền tảng
                                                vững chắc giúp học viên có thể tự mình nghiên cứu các công nghệ mới để
                                                bắt kịp xu hướng công nghệ cũng như đáp ứng các yêu cầu trong dự án thực
                                                tế.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Đối tượng tham gia */}
                                    <div className="card mb-4">
                                        <div className="card-header bg-dark text-white">Sẽ rất hữu ích nếu bạn là:</div>
                                        <div className="card-body">
                                            <ul>
                                                <li>
                                                    Tất cả những ai muốn tìm hiểu về kỹ thuật lập trình C# và muốn phát
                                                    triển ứng dụng Web chuyên nghiệp trên công nghệ .NET Core.
                                                </li>
                                                <li>
                                                    Sẽ thuận lợi hơn nếu bạn đã có kiến thức cơ bản về thiết kế website
                                                    với HTML5, CSS3, Jquery và Bootstrap.
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Lợi ích từ khóa học */}
                                    <div className="card mb-4">
                                        <div className="card-header bg-dark text-white">Bạn sẽ nhận được gì qua khóa
                                            học?
                                        </div>
                                        <div className="card-body">
                                            <ul>
                                                <li>Nắm vững kiến thức lập trình C# nền tảng, sử dụng thành thạo các
                                                    kiểu dữ liệu, toán tử, cấu trúc điều khiển, cấu trúc lặp để giải
                                                    quyết các bài toán thực tế.
                                                </li>
                                                <li>Hiểu rõ .NET Core Framework và lập trình hướng đối tượng.</li>
                                                <li>Lập trình ứng dụng web đúng chuẩn với .NET.</li>
                                                <li>Sử dụng gRPC, Web API để xây dựng các Web Service.</li>
                                                <li>Xây dựng và triển khai các dịch vụ, đa dịch vụ với gRPC và Web API
                                                    Service.
                                                </li>
                                                <li>Vận dụng kỹ thuật DI và IoC, Design Patterns trong xây dựng ứng dụng
                                                    web.
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Thông tin khóa học và học phí */}
                                    <div className="card mb-4">
                                        <div className="card-header bg-dark text-white">Khoản đầu tư dành cho khóa học
                                        </div>
                                        <div className="card-body">
                                            <p><strong>Tổng số giờ:</strong> 156 giờ (208 tiết) - 25 tuần (6.5 tháng)
                                            </p>
                                            <p><strong>Học phí:</strong> 8.000.000đ - <strong>Ưu
                                                đãi:</strong> 7.200.000đ (tùy theo chính sách của khóa, xem chi tiết
                                                trong Thời Khóa Biểu)</p>
                                        </div>
                                    </div>
                                </div>
                            )}


                        </div>
                    </div>
                </div>

                {/* Phần bên phải: Danh sách khóa học mới nhất */}
                <div className="col-md-4">
                    <h4 className="text-center mb-4">Khóa học mới nhất</h4>
                    <hr className='text-black'></hr>
                    {latestCourses.map(course => (
                        <div key={course.id} className="card mb-3">
                            <img src={course.image} className="card-img-top" alt={course.title}/>
                            <div className="card-body d-flex flex-column text-center">
                                <h5 className="card-title">{course.title}</h5>
                                <p className="card-text">Ngày đăng: {course.date}</p>
                                <button className="btn btn-dark text-white w-100 mt-auto">Chi tiết</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CourseDetail;
