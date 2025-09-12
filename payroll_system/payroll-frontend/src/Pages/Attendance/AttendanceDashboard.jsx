import React, { useState, useEffect } from 'react';
import { Clock, Calendar, CheckCircle, XCircle, ArrowRight } from 'lucide-react';

const AttendanceDashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [attendance, setAttendance] = useState({
    isCheckedIn: false,
    checkInTime: null,
    checkOutTime: null,
  });
  
  const [attendanceHistory, setAttendanceHistory] = useState([
    // Dummy data - replace with API call
    {
      date: '2024-02-20',
      checkIn: '09:00 AM',
      checkOut: '05:00 PM',
      status: 'Present',
      workingHours: '8h 0m'
    }
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleCheckIn = () => {
    const now = new Date();
    setAttendance(prev => ({
      ...prev,
      isCheckedIn: true,
      checkInTime: now
    }));
    // TODO: Make API call to record check-in
  };

  const handleCheckOut = () => {
    const now = new Date();
    setAttendance(prev => ({
      ...prev,
      isCheckedIn: false,
      checkOutTime: now
    }));
    // TODO: Make API call to record check-out
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {/* Current Time Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Current Time</h3>
            <Clock className="h-6 w-6 text-gray-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900">
            {currentTime.toLocaleTimeString()}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            {currentTime.toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>

        {/* Attendance Status Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Today's Status</h3>
            <Calendar className="h-6 w-6 text-gray-500" />
          </div>
          <div className="space-y-4">
            {attendance.checkInTime && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Check In:</span>
                <span className="text-sm font-medium text-gray-900">
                  {attendance.checkInTime.toLocaleTimeString()}
                </span>
              </div>
            )}
            {attendance.checkOutTime && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Check Out:</span>
                <span className="text-sm font-medium text-gray-900">
                  {attendance.checkOutTime.toLocaleTimeString()}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Actions Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
          <div className="space-y-4">
            <button
              onClick={handleCheckIn}
              disabled={attendance.isCheckedIn}
              className={`w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-lg ${
                attendance.isCheckedIn
                  ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              <CheckCircle className="h-5 w-5" />
              <span>Check In</span>
            </button>
            <button
              onClick={handleCheckOut}
              disabled={!attendance.isCheckedIn}
              className={`w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-lg ${
                !attendance.isCheckedIn
                  ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                  : 'bg-red-600 text-white hover:bg-red-700'
              }`}
            >
              <XCircle className="h-5 w-5" />
              <span>Check Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Attendance History */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Attendance History</h3>
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            View All
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Check In
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Check Out
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Working Hours
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {attendanceHistory.map((record, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.checkIn}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.checkOut}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.workingHours}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      record.status === 'Present'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AttendanceDashboard;