import React, { useState } from 'react';
import axios from 'axios';

function CreateMultipleSchedules() {
    const [numberOfSchedules, setNumberOfSchedules] = useState(1); // Số lịch học mặc định là 1
    const [schedules, setSchedules] = useState([]);
    const [scheduleData, setScheduleData] = useState({
        startTime: '',
        endTime: '',
        day: '',
        class_id: '',
        // Thêm các trường thông tin lịch học khác ở đây
    });

    const handleCreateSchedules = async () => {
        try {
            const response = await axios.post('/api/schedules/create-multiple', {
                numberOfSchedules: numberOfSchedules,
            });

            setSchedules(response.data);

            // Xử lý thông báo hoặc điều hướng sau khi tạo lịch học thành công
        } catch (error) {
            console.error('Lỗi khi tạo lịch học:', error);
            // Xử lý lỗi và hiển thị thông báo cho người dùng nếu cần
        }
    };

    const handleSaveSchedule = async () => {
        try {
            const response = await axios.post('http://localhost:8080/schedule/create', scheduleData);

            setSchedules((prevSchedules) => [...prevSchedules, response.data]);
            setScheduleData({
                startTime: '',
                endTime: '',
                day: '',
                class_id: '',
                // Đặt lại giá trị các trường thông tin lịch học khác
            });
        let tmp = numberOfSchedules;
        tmp -= 1;
        setNumberOfSchedules(tmp);
            console.log(tmp);
            // Xử lý thông báo hoặc điều hướng sau khi tạo lịch học thành công
        } catch (error) {
            console.error('Lỗi khi tạo lịch học:', error);
            // Xử lý lỗi và hiển thị thông báo cho người dùng nếu cần
        }
        
        
    };

    const renderScheduleForms = () => {
        const scheduleForms = [];

        for (let i = 0; i < numberOfSchedules; i++) {
            scheduleForms.push(
                <div key={i}>
                    <h3>Lịch học #{i + 1}</h3>
                    <div>
                        <label>StartTime:</label>
                        <input
                            type="time"
                            name="startTime"
                            value={scheduleData.startTime}
                            onChange={(e) => setScheduleData({ ...scheduleData, startTime: e.target.value })}
                        />
                    </div>
                    <div>
                        <label>EndTime:</label>
                        <input
                            type="time"
                            name="endTime"
                            value={scheduleData.endTime}
                            onChange={(e) => setScheduleData({ ...scheduleData, endTime: e.target.value })}
                        />
                    </div>
                    <div>
                        <label>Day:</label>
                        <input
                            type="date"
                            name="day"
                            value={scheduleData.day}
                            onChange={(e) => setScheduleData({ ...scheduleData, day: e.target.value })}
                        />
                    </div>
                    <div>
                        <label>Class:</label>
                        <input
                            type="number"
                            name="class_id"
                            value={scheduleData.class_id}
                            onChange={(e) => setScheduleData({ ...scheduleData, class_id: e.target.value })}
                        />
                    </div>
                    {/* Thêm các trường thông tin lịch học khác ở đây */}
                    <button onClick={handleSaveSchedule}>Lưu Lịch Học</button> 
                </div>
            );
        }

        return scheduleForms;
    };

    return (
        <div>
            <h2>Tạo Lịch Học</h2>
            <label>Số lịch học muốn tạo:</label>
            <input
                type="number"
                value={numberOfSchedules}
                onChange={(e) => setNumberOfSchedules(e.target.value)}
            />
            <button onClick={handleCreateSchedules}>Tạo Lịch Học</button>

            {schedules.length > 0 && (
                <div>
                    <h3>Lịch Học Đã Được Tạo:</h3>
                    <ul>
                        {schedules.map((schedule, index) => (
                            <li key={index}>
                                <strong>Lịch học #{index + 1}</strong>
                                <ul>
                                    <li>Thời gian bắt đầu: {scheduleData.startTime}</li>
                                    <li>Thời gian kết thúc: {scheduleData.endTime}</li>
                                    <li>Ngày: {scheduleData.day}</li>
                                    {/* Thêm các trường thông tin lịch học khác ở đây */}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {numberOfSchedules > 0 && renderScheduleForms()}
        </div>
    );
}

export default CreateMultipleSchedules;