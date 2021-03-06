import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "components/Appointment"; 
import axios from "axios";
import { getAppointmentsForDay, getInterviewersForDay, getInterview } from "helpers/selectors";
import useApplicationData from "hooks/useAplicationData";




export default function Application(props) {
  const { state, setDay, bookInterview, cancelInterview, editInterview} = useApplicationData();

  
  // //combining day, days, appointments into State object
  // const [state, setState] = useState({
  //   day: "Monday",
  //   days: [],
  //   appointments: {},
  //   interviewers: {},
  // });


  // //double check with mentor???
  // function bookInterview(id, interview) {
  //   //console.log(id, interview)

  //   const appointment = {
	// 		...state.appointments[id],
	// 		interview: { ...interview },
	// 	};

  //   const appointments = {
	// 		...state.appointments,
	// 		[id]: appointment,
	// 	};
    
  //   return axios  
  //     .put(`/api/appointments/${id}`, { interview })
  //     .then((res) => { setState(prev => ({ ...prev, appointments })) })
  //     //.catch((err) => { console.log(err) });
  // }


  // function editInterview(id, interview) {
  //   const appointment = {
  //     ...state.appointments[id],
  //     interview: { ...interview},
  //   }

  //   const appointments = {
  //     ...state.appointments,
  //     [id]: appointment,
  //   };

  //   return axios
  //     .put(`/api/appointments/${id}`, { interview })
  //     .then((res) => { setState(prev => ({ ...prev, appointments})) })
  // }

  // //cancel interview
  // function cancelInterview(id) {
  //   return axios
  //     .delete(`api/appointments${id}`)
  //     .then((res) => {
  //       setState((prev) => ({ ...prev}));
  //     })
  // }


  

  
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const appointmentInterviewers = getInterviewersForDay(state, state.day);

  // function that updates the state with the new date
  //const setDay = day => setState({... state, day});
  
  const appointmentArray = dailyAppointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
        key={appointment.id}
        {...appointment}
        interview={interview}
        interviewers={appointmentInterviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
        editInterview={editInterview} ////remove??
     />
    );
  });

  
  

  
  // useEffect( () => {
  //   Promise.all([
  //     axios.get('/api/days'),
  //     axios.get('/api/appointments'),
  //     axios.get('/api/interviewers')
  //   ])
  //     .then((all) => {
  //       const [first, second, third] = all
  //       setState(prev => ({...prev, days: first.data , appointments: second.data, interviewers: third.data }));
  //       //console.log(state.interviewers)
  //     })
  //   }, []);
   



  

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />

        <nav className="sidebar__menu">
          <DayList
            days={state.days} 
            value={state.day}
            onChange={setDay}
          />
        </nav>

        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">

        
        { appointmentArray }

        <Appointment key="last" time="5pm" />

      </section>
    </main>
  );
}
