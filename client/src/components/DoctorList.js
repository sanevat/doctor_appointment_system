import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/DoctorList.css';
import doctorImage from '../img/doc1.jpg';
import doc1 from '../img/doc1.jpg';
import doc2 from '../img/doc2.jpg';
import doc3 from '../img/doc3.jpg';
const DoctorList = ({ doctor }) => {
    const navigate = useNavigate();

    return (
        <div>
            <div className='cards p-2' >
                {/*<img className="cardImage" src={doc2}></img>*/}
                <img className="cardImage"
                    src={
                        doctor.pic.url ||
                        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                    }
                    alt="profile"
                />
                <div className='cardHeader'>
                    <h3 className='title'><b> Dr. {doctor.firstName} {doctor.lastName}</b></h3>
                </div>
                <div className='card-body'>
                    <p>
                        <b>Specialization: </b>{doctor.specialization}
                    </p>
                    <p>
                        <b>Experience: </b>{doctor.experience} years
                    </p>
                    <p>
                        <b>Fees Per Consultation: </b>{doctor.feesPerConsultation} $
                    </p>
                    <p>
                        <b>Timings: </b>{doctor.timings[0]}-{doctor.timings[1]}
                    </p>
                </div>


                <button className="makeApp" onClick={() => navigate(`/doctor/book-appointment/${doctor._id}`)}>Make appointment</button>
            </div>
        </div>
    )
}
export default DoctorList;