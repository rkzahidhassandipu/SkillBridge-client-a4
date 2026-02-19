"use client";

import { useState } from "react";
import ReviewSection from "./Review";
import { Booking, Review } from "@/types";

interface Props {
  bookingsData: Booking[];
}

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const StatusBadge = ({ status }: { status: Booking["status"] }) => {
  const colors = {
    CONFIRMED: { bg: "#d1fae5", text: "#065f46", dot: "#10b981" },
    COMPLETED: { bg: "#fef3c7", text: "#92400e", dot: "#f59e0b" },
    CANCELLED: { bg: "#fee2e2", text: "#991b1b", dot: "#ef4444" },
  };
  const c = colors[status] || colors.CONFIRMED;

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        background: c.bg,
        color: c.text,
        fontSize: "11px",
        fontWeight: 700,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        padding: "4px 10px",
        borderRadius: "20px",
      }}
    >
      <span
        style={{
          width: 7,
          height: 7,
          borderRadius: "50%",
          background: c.dot,
          display: "inline-block",
        }}
      />
      {status}
    </span>
  );
};

const InfoBlock = ({
  icon,
  label,
  value,
  sub,
}: {
  icon: string;
  label: string;
  value: string;
  sub?: string | null;
}) => (
  <div>
    <div
      style={{
        fontSize: "11px",
        fontWeight: 600,
        color: "#9ca3af",
        textTransform: "uppercase",
        letterSpacing: "0.06em",
        marginBottom: "4px",
        display: "flex",
        alignItems: "center",
        gap: "4px",
      }}
    >
      <span>{icon}</span> {label}
    </div>
    <div style={{ fontSize: "14px", fontWeight: 600, color: "#111827" }}>
      {value}
    </div>
    {sub && (
      <div style={{ fontSize: "12px", color: "#6b7280", marginTop: "2px" }}>
        {sub}
      </div>
    )}
  </div>
);

const BookingCard = ({ booking, index, review }: { booking: Booking; index: number, review: Review}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "#ffffff" : "#fafafa",
        border: `1.5px solid ${hovered ? "#6366f1" : "#e5e7eb"}`,
        borderRadius: "16px",
        padding: "24px",
        transition: "all 0.2s ease",
        boxShadow: hovered
          ? "0 8px 30px rgba(99,102,241,0.12)"
          : "0 1px 4px rgba(0,0,0,0.05)",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        animationDelay: `${index * 0.1}s`,
        cursor: "default",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "20px",
        }}
      >
        <div>
          <div
            style={{
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.08em",
              color: "#9ca3af",
              textTransform: "uppercase",
              marginBottom: "4px",
            }}
          >
            Booking ID
          </div>
          <div
            style={{
              fontFamily: "'Courier New', monospace",
              fontSize: "12px",
              color: "#6366f1",
              background: "#eef2ff",
              padding: "3px 8px",
              borderRadius: "6px",
            }}
          >
            {booking.id.slice(0, 8)}…
          </div>
        </div>
        <StatusBadge status={booking.status} />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "16px",
          marginBottom: "20px",
        }}
      >
        <InfoBlock icon="📅" label="Date" value={formatDate(booking.date)} />
        <InfoBlock icon="⏰" label="Time Slot" value={booking.timeSlot} />
        <InfoBlock
          icon="👨‍🏫"
          label="Tutor"
          value={booking.tutor.name}
          sub={booking.tutor.email}
        />
        <InfoBlock
          icon="📚"
          label="Category"
          value={
            booking.category.name.charAt(0).toUpperCase() +
            booking.category.name.slice(1)
          }
        />
      </div>

      <div
        style={{
          borderTop: "1px solid #f3f4f6",
          paddingTop: "12px",
          fontSize: "11px",
          color: "#9ca3af",
        }}
      >
        Booked on {formatDate(booking.createdAt)}
      </div>
      {booking.status === "COMPLETED" && (
        <ReviewSection
          tutorId={booking.tutorId}
          studentId={booking.studentId}
          bookingId={booking.id}
          tutorName={booking.tutor.name}
          review={review}
          onSubmit={(data) => console.log(data)} // তোমার API call দাও
        />
      )}
    </div>
  );
};

export default function BookingDetailsPage({ bookingsData, myAllReview }: {bookingsData: Props; myAllReview: Review}) {
  // Remove PENDING bookings
  const filteredBookings = bookingsData.filter(b => b.status !== "PENDING");

  console.log("bookingsData",bookingsData)
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f0f4ff 0%, #faf5ff 100%)",
        fontFamily: "'Segoe UI', sans-serif",
        padding: "40px 20px",
      }}
    >
      <div style={{ maxWidth: "760px", margin: "0 auto" }}>
        <div style={{ marginBottom: "32px" }}>
          <h1
            style={{
              fontSize: "28px",
              fontWeight: 800,
              color: "#111827",
              margin: 0,
              letterSpacing: "-0.5px",
            }}
          >
            My Bookings
          </h1>
          <p style={{ color: "#6b7280", marginTop: "6px", fontSize: "14px" }}>
            {filteredBookings.length} session
            {filteredBookings.length !== 1 ? "s" : ""} found
          </p>
        </div>

         <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {filteredBookings.map((booking, i) => {
            // check if there is a review for this booking
            // const reviewForBooking = myAllReview?.find(r => r.bookingId === booking.id);

            return (
              <BookingCard 
                key={booking.id} 
                booking={booking} 
                index={i} 
                review={myAllReview} // pass the review to BookingCard
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
