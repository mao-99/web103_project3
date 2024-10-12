import React, { useState, useEffect } from 'react';
import { getEventById } from '../services/EventsAPI';
import '../css/Event.css';

const Event = ({ id }) => {
    const [event, setEvent] = useState(null);
    const [time, setTime] = useState('');
    const [remaining, setRemaining] = useState('');

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const eventData = await getEventById(id);
                setEvent(eventData);
            } catch (error) {
                console.error("Failed to fetch event:", error);
            }
        };

        fetchEvent();
    }, [id]);

    useEffect(() => {
        if (event) {
            // Format time
            const formatTime = () => {
                // Implement your time formatting logic here
                // For example:
                const date = new Date(event.date);
                return date.toLocaleTimeString();
            };
            setTime(formatTime());

            // Calculate remaining time
            const calculateRemainingTime = () => {
                // Implement your remaining time calculation logic here
                // For example:
                const eventDate = new Date(event.date);
                const now = new Date();
                const diff = eventDate - now;
                return Math.floor(diff / (1000 * 60 * 60 * 24)) + " days";
            };
            setRemaining(calculateRemainingTime());
        }
    }, [event]);

    if (!event) {
        return <div>Loading...</div>;
    }

    return (
        <article className='event-information'>
            {event.image && <img src={event.image} alt={event.title} />}

            <div className='event-information-overlay'>
                <div className='text'>
                    <h3>{event.title}</h3>
                    <p>
                        <i className="fa-regular fa-calendar fa-bounce"></i> {event.date} <br /> {time}
                    </p>
                    <p id={`remaining-${event.id}`}>{remaining}</p>
                </div>
            </div>
        </article>
    );
};

export default Event;