import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { FaCalendarPlus, FaInfoCircle } from "react-icons/fa";
import { Context } from "../common/Context";
import classes from "./Calendar.module.css";
import {
  eventList,
} from "./DemoData";
import Info from "./Info";
import Modal from "./Modal";

const Calendar = () => {
  const {
    show,
    setShow,
    handleShow,
    modalType,
    setModalType,
    info,
    setInfo,
    handleInfo,
  } = useContext(Context);

  const [events, setEvents] = useState([]);
  const [titleValue, setTitleValue] = useState("");
  const [startValue, setStartValue] = useState(
    new Date().toISOString().slice(0, 16)
  );
  const [editDate, setEditDate] = useState();
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const modifyEventByDate = (date, newTitle, newDate) => {
    const updatedEvents = events.map((event) => {
      const eventStart = new Date(event.start);
      const targetDate = new Date(date);
      eventStart.setSeconds(0, 0);
      targetDate.setSeconds(0, 0);
      if (eventStart.getTime() === targetDate.getTime()) {
        return {
          ...event,
          title: newTitle,
          start: newDate,
        };
      }
      return event;
    });
    setEvents(updatedEvents);
  };

  const handleClose = () => setShow(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (modalType === "add") {
      const newEvent = {
        title: titleValue,
        start: moment(startValue).format("YYYY-MM-DD HH:mm:ss"),
      };
      setEvents([...events, newEvent]);
      setTitleValue("");
      setStartValue("");
    } else {
      modifyEventByDate(editDate, titleValue, startValue);
    }
    handleClose();
  };

  const handleDelete = (eventDate) => {
    const updatedEvents = events.filter((event) => {
      const eventStartDate = new Date(event.start);
      const targetDate = new Date(eventDate);
      return eventStartDate.getTime() !== targetDate.getTime();
    });

    setEvents(updatedEvents);
    setTitleValue("");
    setStartValue("");
    handleClose();
  };

  const addDemoEvent = () => {
    setEvents([
      ...events,
      ...eventList,
    ]);
  };

  useEffect(() => {
    addDemoEvent();
  }, []);

  function renderEventContent(eventInfo) {
    return (
      <>
        <b className={classes.start}>{eventInfo.timeText}</b> &nbsp;
        <i className={classes.title}>{eventInfo.event.title}</i>
      </>
    );
  }

  const handleDateSelect = (selectInfo) => {
    setModalType("add");
    const dateStart = `${selectInfo.startStr}T08:00`;
    setStartValue(dateStart);
    handleShow();
    let calendarApi = selectInfo.view.calendar;
    calendarApi.unselect();
  };

  const handleEventClick = (clickInfo) => {
    setModalType("edit");
    setEditDate(clickInfo.event.start);
    const { title, start } = clickInfo.event;
    const formattedStart = formatDate(start);
    setTitleValue(title);
    setStartValue(formattedStart);
    console.log(formattedStart);
    handleShow();

    let calendarApi = clickInfo.view.calendar;
    calendarApi.unselect();
  };

  return (
    <div>
      <Modal
        show={show}
        handleClose={handleClose}
        handleShow={handleShow}
        handleSubmit={handleSubmit}
        handleDelete={handleDelete}
        titleValue={titleValue}
        setTitleValue={setTitleValue}
        startValue={startValue}
        setStartValue={setStartValue}
        modalType={modalType}
        setModalType={setModalType}
      />

      <Info show={info} handleClose={setInfo} />

      <div class={classes.buttonContainer}>
        <Button
          variant="primary"
          onClick={() => {
            setModalType("add");
            handleShow();
          }}
          className={classes.buttonModal}
        >
          <FaCalendarPlus /> Add event
        </Button>

        <Button
          variant="primary"
          onClick={handleInfo}
          className={classes.buttonInfo}
        >
          <FaInfoCircle /> Info
        </Button>
      </div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        eventClick={handleEventClick}
        weekends={true}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        eventTimeFormat={{ hour: "2-digit", minute: "2-digit", hour12: false }}
        eventContent={renderEventContent}
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        timeFormat="H:mm"
        select={handleDateSelect}
        events={events}
      />
    </div>
  );
};

export default Calendar;
