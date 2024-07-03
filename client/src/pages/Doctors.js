import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';
import DoctorList from '../components/DoctorList';
const Doctors = () => {
    const [doctors, setDoctors] = useState([]);

    const getUserData = async () => {
        try {
            const res = await axios.get("/api/v1/user/getAllDoctors", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                }
            }
            );
            if (res.data.success) {
                setDoctors(res.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getUserData()
    }, []);
    return (
        <Layout>
            <section>
                <h2 className='teamMembers'>Meet our team members</h2>
                <div className='cardsConatiner'>
                    {doctors && doctors.map(doctor => (

                        <DoctorList doctor={doctor} />
                    ))}
                </div>
            </section>
        </Layout>
    )
}
export default Doctors;