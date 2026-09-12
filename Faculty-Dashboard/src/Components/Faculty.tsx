import { useState } from "react";
import {
  Bell,
  ChevronRight,
  LayoutDashboard,
  FileText,
  Search,
  User,
  ArrowLeft,
  CalendarDays,
  Clock3,
  BookOpen,
  FileCheck,
  ClipboardCheck,
} from "lucide-react";
import "./Faculty.css";

type Lecture = {
  date: string;
  subject: string;
  time: string;
};

type LeaveApplication = {
  id: number;
  studentName: string;
  reason: string;
  startDate: string;
  endDate: string;
  submittedAt: string;
  unread: boolean;
  lectures: Lecture[];
};

/* =========================================
   DUMMY APPLICATION DATA
========================================= */

const initialApplications: LeaveApplication[] = [
  {
    id: 1,
    studentName: "Sarthak Adhav",
    reason: "Inter-University Competition",
    startDate: "01 January 2026",
    endDate: "02 January 2026",
    submittedAt: "Just now",
    unread: true,
    lectures: [
      {
        date: "01 January 2026",
        subject: "Database Management System",
        time: "10:00 AM – 11:00 AM",
      },
      {
        date: "02 January 2026",
        subject: "Database Management System",
        time: "10:00 AM – 11:00 AM",
      },
    ],
  },
  {
    id: 2,
    studentName: "Rahul Sharma",
    reason: "Sports Competition",
    startDate: "05 January 2026",
    endDate: "06 January 2026",
    submittedAt: "2 hours ago",
    unread: true,
    lectures: [
      {
        date: "05 January 2026",
        subject: "Database Management System",
        time: "10:00 AM – 11:00 AM",
      },
      {
        date: "05 January 2026",
        subject: "Database Management System",
        time: "02:00 PM – 03:00 PM",
      },
      {
        date: "06 January 2026",
        subject: "Database Management System",
        time: "10:00 AM – 11:00 AM",
      },
    ],
  },
  {
    id: 3,
    studentName: "Priya Shah",
    reason: "Technical Event",
    startDate: "08 January 2026",
    endDate: "08 January 2026",
    submittedAt: "Yesterday",
    unread: false,
    lectures: [
      {
        date: "08 January 2026",
        subject: "Database Management System",
        time: "11:00 AM – 12:00 PM",
      },
    ],
  },
];

/* =========================================
   DUMMY ATTENDANCE DATA
========================================= */

type AttendanceStudent = {
  id: number;
  name: string;
  missedLectures: number;
  attendanceImpact: number;
};

const attendanceStudents: AttendanceStudent[] = [
  {
    id: 1,
    name: "Sarthak Adhav",
    missedLectures: 4,
    attendanceImpact: 10,
  },
  {
    id: 2,
    name: "Rahul Sharma",
    missedLectures: 6,
    attendanceImpact: 15,
  },
  {
    id: 3,
    name: "Priya Shah",
    missedLectures: 3,
    attendanceImpact: 7.5,
  },
];

/* =========================================
   APP
========================================= */

function App() {
  const [applications, setApplications] =
    useState<LeaveApplication[]>(initialApplications);

  const [selectedApplication, setSelectedApplication] =
    useState<LeaveApplication | null>(null);

  const [activePage, setActivePage] = useState<
    "dashboard" | "attendance" | "application"
  >("dashboard");

  const openApplication = (application: LeaveApplication) => {
    setApplications((current) =>
      current.map((item) =>
        item.id === application.id
          ? { ...item, unread: false }
          : item
      )
    );

    setSelectedApplication({
      ...application,
      unread: false,
    });

    setActivePage("application");
  };

  const goBack = () => {
    setSelectedApplication(null);
    setActivePage("dashboard");
  };

  const openAttendance = () => {
    setSelectedApplication(null);
    setActivePage("attendance");
  };

  return (
    <div className="app">

      {/* SIDEBAR */}
      <aside className="sidebar">

        <div className="brand">
          <div className="brand-logo">
            <FileCheck size={21} />
          </div>

          <div>
            <h2>University</h2>
            <span>Attendance Portal</span>
          </div>
        </div>

        <nav className="sidebar-nav">

          <button
            className={`nav-link ${
              activePage === "dashboard" ? "active" : ""
            }`}
            onClick={() => {
              setSelectedApplication(null);
              setActivePage("dashboard");
            }}
          >
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </button>

          <button
            className={`nav-link ${
              activePage === "attendance" ? "active" : ""
            }`}
            onClick={openAttendance}
          >
            <ClipboardCheck size={18} />
            <span>Calculate Attendance</span>
          </button>

        </nav>

        <div className="sidebar-profile">

          <div className="profile-avatar">
            FA
          </div>

          <div>
            <strong>Faculty</strong>
            <span>Computer Science</span>
          </div>

        </div>

      </aside>


      {/* MAIN */}
      <main className="main">

        {/* TOPBAR */}
        <header className="topbar">

          <div className="topbar-left">
            <span className="topbar-title">
              Faculty Portal
            </span>
          </div>

          <div className="topbar-right">

            <button className="top-icon">
              <Search size={19} />
            </button>

            <button className="top-icon notification-icon">

              <Bell size={19} />

              {applications.some(
                (application) => application.unread
              ) && <span className="notification-indicator" />}

            </button>

            <div className="top-profile">

              <div className="top-profile-avatar">
                <User size={17} />
              </div>

              <div className="top-profile-info">
                <strong>Faculty</strong>
                <span>2026–27</span>
              </div>

            </div>

          </div>

        </header>


        {/* CONTENT */}
        <div className="content">

          {activePage === "attendance" ? (

            <AttendanceCalculation
              onBack={() => {
                setActivePage("dashboard");
                setSelectedApplication(null);
              }}
            />

          ) : activePage === "application" &&
            selectedApplication ? (

            <ApplicationDetails
              application={selectedApplication}
              onBack={goBack}
            />

          ) : (

            <Dashboard
              applications={applications}
              onOpen={openApplication}
            />

          )}

        </div>

      </main>

    </div>
  );
}


/* =========================================
   DASHBOARD
========================================= */

type DashboardProps = {
  applications: LeaveApplication[];
  onOpen: (application: LeaveApplication) => void;
};

function Dashboard({
  applications,
  onOpen,
}: DashboardProps) {

  return (
    <>

      <section className="welcome-section">

        <div>

          <p className="section-label">
            FACULTY PORTAL
          </p>

          <h1>
            Welcome back, Professor! 👋
          </h1>

          <p className="welcome-text">
            Review leave applications that affect your lectures.
          </p>

        </div>

        <div className="welcome-icon">
          <Bell size={30} />
        </div>

      </section>


      <section className="notification-section">

        <div className="section-heading">

          <div>
            <h2>Notifications</h2>

            <p>
              New leave applications submitted by students.
            </p>
          </div>

        </div>


        <div className="notification-list">

          {applications.map((application) => (

            <button
              key={application.id}
              className={`notification-card ${
                application.unread ? "unread" : ""
              }`}
              onClick={() => onOpen(application)}
            >

              <div className="notification-main">

                <div className="notification-avatar">
                  <FileText size={19} />
                </div>

                <div className="notification-text">

                  <p className="notification-message">

                    <strong>
                      {application.studentName}
                    </strong>{" "}

                    submitted a new leave application

                  </p>

                  <span>
                    {application.submittedAt}
                  </span>

                </div>

              </div>


              <div className="notification-action">

                {application.unread && (
                  <span className="unread-dot" />
                )}

                <ChevronRight size={20} />

              </div>

            </button>

          ))}

        </div>

      </section>

    </>
  );
}


/* =========================================
   ATTENDANCE CALCULATION
========================================= */

/* =========================================
   ATTENDANCE CALCULATION
========================================= */

type AttendanceCalculationProps = {
  onBack: () => void;
};

function AttendanceCalculation({
  onBack,
}: AttendanceCalculationProps) {
  return (
    <section className="attendance-page">

      <button
        className="back-button"
        onClick={onBack}
      >
        <ArrowLeft size={17} />
        Back to dashboard
      </button>

      <div className="application-heading">
        <div>
          <p className="section-label">
            ATTENDANCE
          </p>

          <h1>
            Calculate Attendance
          </h1>

          <p>
            Review missed lectures and their attendance impact.
          </p>
        </div>
      </div>

      <div className="attendance-card">

        <div className="attendance-card-header">
          <div>
            <h2>
              Missed Lectures
            </h2>

            <p>
              Attendance impact of approved leave applications.
            </p>
          </div>
        </div>

        <div className="attendance-table">

          <div className="attendance-table-header">
            <span>STUDENT</span>
            <span>MISSED LECTURES</span>
            <span>ATTENDANCE IMPACT</span>
          </div>

          {attendanceStudents.map((student) => (
            <div
              className="attendance-table-row"
              key={student.id}
            >

              <div className="attendance-student">
                <div className="attendance-avatar">
                  {student.name
                    .split(" ")
                    .map((name) => name[0])
                    .join("")}
                </div>

                <strong>
                  {student.name}
                </strong>
              </div>

              <span className="missed-lectures">
                {student.missedLectures}
              </span>

              <div className="attendance-percentage">
                <strong>
                  {student.attendanceImpact}%
                </strong>
              </div>

            </div>
          ))}

        </div>

        <div className="attendance-footer">
          <span>
            Dummy data for now
          </span>

          <strong>
            Used for detention calculation
          </strong>
        </div>

      </div>

    </section>
  );
}

/* =========================================
   APPLICATION DETAILS
========================================= */

type ApplicationDetailsProps = {
  application: LeaveApplication;
  onBack: () => void;
};

function ApplicationDetails({
  application,
  onBack,
}: ApplicationDetailsProps) {

  return (

    <section className="application-page">

      <button
        className="back-button"
        onClick={onBack}
      >
        <ArrowLeft size={17} />
        Back to notifications
      </button>


      <div className="application-heading">

        <div>

          <p className="section-label">
            LEAVE APPLICATION
          </p>

          <h1>
            {application.studentName}
          </h1>

          <p>
            Submitted {application.submittedAt}
          </p>

        </div>

      </div>


      <div className="details-layout">

        {/* LEFT */}

        <div className="details-left">

          <div className="info-card">

            <div className="card-title">

              <div className="card-icon">
                <CalendarDays size={18} />
              </div>

              <div>
                <h2>Leave details</h2>
                <p>
                  Information provided with the application.
                </p>
              </div>

            </div>


            <div className="info-item">

              <div className="info-label">
                <CalendarDays size={16} />
                Leave period
              </div>

              <strong>
                {application.startDate}
                <span className="date-arrow">→</span>
                {application.endDate}
              </strong>

            </div>


            <div className="info-item">

              <div className="info-label">
                <FileText size={16} />
                Reason
              </div>

              <strong>
                {application.reason}
              </strong>

            </div>

          </div>


          {/* LECTURES */}

          <div className="info-card">

            <div className="card-title">

              <div className="card-icon">
                <BookOpen size={18} />
              </div>

              <div>
                <h2>Affected lectures</h2>

                <p>
                  Lectures from your timetable during this leave.
                </p>

              </div>

            </div>


            <div className="lecture-table">

              <div className="lecture-header">
                <span>Date</span>
                <span>Subject</span>
                <span>Time</span>
              </div>


              {application.lectures.map(
                (lecture, index) => (

                  <div
                    className="lecture-item"
                    key={index}
                  >

                    <div className="lecture-date">
                      <CalendarDays size={15} />
                      {lecture.date}
                    </div>

                    <div className="lecture-subject">
                      {lecture.subject}
                    </div>

                    <div className="lecture-time">
                      <Clock3 size={15} />
                      {lecture.time}
                    </div>

                  </div>

                )
              )}

            </div>


            <div className="lecture-footer">

              <span>
                Total affected lectures
              </span>

              <strong>
                {application.lectures.length}
              </strong>

            </div>

          </div>

        </div>


        {/* RIGHT */}

        <aside className="document-card">

          <div className="document-top">

            <div className="document-icon">
              <FileText size={23} />
            </div>

            <span className="document-type">
              DOCUMENT
            </span>

          </div>

          <h2>
            HOD-signed application
          </h2>

          <p>
            View the leave application submitted
            with the required HOD signature.
          </p>

          <button className="view-document">
            <FileText size={16} />
            View document
            <ChevronRight size={16} />
          </button>

        </aside>

      </div>

    </section>
  );
}

export default App;