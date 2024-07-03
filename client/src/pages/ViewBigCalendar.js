import React,{useState} from 'react';
import axios from 'axios';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import { useEffect } from 'react';
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import 'react-big-calendar/lib/css/react-big-calendar.css';
const ViewBigCalendar = () => {
    
    const [appointments, setAppointments] = useState([]);
    const getAppointments = async () => {
        try {
            const res = await axios.get('/api/v1/doctor/doctor-appointments',{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (res.data.success) {
                setAppointments(res.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
      
        getAppointments();
    }, [])

    const locales={
        "en-US":require("date-fns/locale/en-US")
    }
    const localizer=dateFnsLocalizer({
        format,
        parse,
        startOfWeek,
        getDay,
        locales
    })
    const events=appointments.map((app)=>{
        const [day, month, year] = app.date.split('-');
        const [hours, minutes] = app.time.split(':');
        const startDate = new Date(year, month - 1, day,hours, minutes);
        const endDate = new Date(startDate);
        endDate.setHours(startDate.getHours() + 1);
        return{
            title:app.userInfo.name,
            allDay:false,
            start:startDate,
            end:endDate
        }
        })
        console.log(appointments);
    return (
        <div>
 <Calendar className="scheduler"localizer={localizer} events={events}  startAccessor="start" endAccessor="end" style={{height:600}}></Calendar>
        </div>
    )
}
export default ViewBigCalendar;
