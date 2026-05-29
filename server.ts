import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { fileURLToPath } from "url";

// ES Module support for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(process.cwd(), "data");
const UPLOADS_DIR = path.join(DATA_DIR, "uploads");
const DB_FILE = path.join(DATA_DIR, "database.json");

// Define state models
interface EventDetails {
  title: string;
  date: string;
  time: string;
  venue: string;
  description: string;
  availableSeats: number;
  ticketPrice: number;
}

interface Registration {
  id: string;
  fullName: string;
  mobileNumber: string;
  email: string;
  companyName: string;
  city: string;
  paymentScreenshot: string; // URL path or base64
  status: 'Pending' | 'Approved' | 'Rejected';
  registrationDate: string;
  invitationSent: boolean;
  invitationCode?: string;
  invitationDetails?: {
    date: string;
    time: string;
    venue: string;
    ticketId: string;
  };
}

interface ContactQuery {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  service: string;
  date: string;
  status: 'Read' | 'Unread';
}

interface DatabaseSchema {
  event: EventDetails;
  registrations: Registration[];
  contactQueries: ContactQuery[];
}

// Default event configurations
const DEFAULT_EVENT: EventDetails = {
  title: "Vanguard Infrastructure & Innovation Summit 2026",
  date: "2026-06-15",
  time: "10:00 AM - 05:00 PM IST",
  venue: "Auditorium 2, Grand Exhibition Centre, Connaught Place, New Delhi",
  description: "India's premier construction company summit focusing on smart infrastructure, modern highways planning, sustainable commercial building materials, and automated contract execution protocols.",
  availableSeats: 350,
  ticketPrice: 199,
};

// Seed database directories and file
function initDatabase() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  }

  // Pre-seed mock screenshots
  const dummyScreenshotPath1 = path.join(UPLOADS_DIR, "screenshot_sample1.png");
  if (!fs.existsSync(dummyScreenshotPath1)) {
    // Write an extremely small, valid transparent 1x1 PNG as placeholder
    const samplePng = Buffer.from(
      "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
      "base64"
    );
    fs.writeFileSync(dummyScreenshotPath1, samplePng);
  }

  if (!fs.existsSync(DB_FILE)) {
    const initialDb: DatabaseSchema = {
      event: DEFAULT_EVENT,
      registrations: [
        {
          id: "VG-29401",
          fullName: "Rajesh Kumar",
          mobileNumber: "+91 98765 43210",
          email: "rajesh.kumar@tataprojects.com",
          companyName: "Tata Projects Ltd.",
          city: "New Delhi",
          paymentScreenshot: "/uploads/screenshot_sample1.png",
          status: "Approved",
          registrationDate: "2026-05-28T09:15:30Z",
          invitationSent: true,
          invitationCode: "VGIS-2026-A40F",
          invitationDetails: {
            date: DEFAULT_EVENT.date,
            time: DEFAULT_EVENT.time,
            venue: DEFAULT_EVENT.venue,
            ticketId: "VGIS-2026-A40F"
          }
        },
        {
          id: "VG-51042",
          fullName: "Ananya Deshmukh",
          mobileNumber: "+91 88776 65544",
          email: "ananya.d@larsentoubro.com",
          companyName: "L&T Infrastructure",
          city: "Mumbai",
          paymentScreenshot: "/uploads/screenshot_sample1.png",
          status: "Pending",
          registrationDate: "2026-05-29T02:44:12Z",
          invitationSent: false
        },
        {
          id: "VG-11029",
          fullName: "Vikram Malhotra",
          mobileNumber: "+91 91234 56789",
          email: "v.malhotra@shapoorji.com",
          companyName: "Shapoorji Pallonji Group",
          city: "Bengaluru",
          paymentScreenshot: "/uploads/screenshot_sample1.png",
          status: "Rejected",
          registrationDate: "2026-05-27T14:20:00Z",
          invitationSent: false
        }
      ],
      contactQueries: [
        {
          id: "CQ-8302",
          name: "Sanjay Sharma",
          email: "sanjay@sharmabuilders.in",
          phone: "+91 99887 76655",
          message: "We would like to request sub-contracting pre-qualification guidelines for the upcoming Expressway highway project.",
          service: "Road Construction",
          date: "2026-05-28T16:04:15Z",
          status: "Unread"
        },
        {
          id: "CQ-4103",
          name: "Deepa Nair",
          email: "deepa.nair@smartcitydmrc.org",
          phone: "+91 98989 89898",
          message: "Interested in setting up a private presentation on standard eco-friendly structural modules.",
          service: "Infrastructure Projects",
          date: "2026-05-27T10:30:00Z",
          status: "Read"
        }
      ]
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialDb, null, 2), "utf-8");
  }
}

// Read whole database helper
function readDB(): DatabaseSchema {
  try {
    initDatabase();
    if (!fs.existsSync(DB_FILE)) {
      throw new Error("DB_FILE not found after init");
    }
    const content = fs.readFileSync(DB_FILE, "utf-8");
    return JSON.parse(content);
  } catch (err) {
    console.error("Error reading database file", err);
    return { event: DEFAULT_EVENT, registrations: [], contactQueries: [] };
  }
}

// Write helper
function writeDB(data: DatabaseSchema) {
  try {
    initDatabase();
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing database file", err);
  }
}

async function startServer() {
  initDatabase();

  const app = express();
  const PORT = 3000;

  // Extend json capacity to parse base64 image strings safely
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  // Serve static uploads
  app.use("/uploads", express.static(UPLOADS_DIR));

  // --- API Endpoints ---

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() });
  });

  // Get current event info
  app.get("/api/event", (req, res) => {
    const db = readDB();
    res.json(db.event || DEFAULT_EVENT);
  });

  // Update Event Configuration (Admin action)
  app.post("/api/event", (req, res) => {
    try {
      const { title, date, time, venue, description, availableSeats, ticketPrice } = req.body;
      const db = readDB();
      db.event = {
        title: title || db.event.title,
        date: date || db.event.date,
        time: time || db.event.time,
        venue: venue || db.event.venue,
        description: description || db.event.description,
        availableSeats: Number(availableSeats) || db.event.availableSeats,
        ticketPrice: Number(ticketPrice) || db.event.ticketPrice,
      };
      writeDB(db);
      res.json({ success: true, message: "Event details updated successfully", event: db.event });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  // Get all registrations (with filters)
  app.get("/api/registrations", (req, res) => {
    const db = readDB();
    res.json(db.registrations);
  });

  // Register for the Event
  app.post("/api/register", (req, res) => {
    try {
      const { fullName, email, mobileNumber, companyName, city, paymentScreenshot } = req.body;

      if (!fullName || !email || !mobileNumber || !companyName || !city) {
        return res.status(400).json({ success: false, error: "All profile fields are required." });
      }

      const id = "VG-" + Math.floor(10000 + Math.random() * 90000);
      let screenshotUrl = "/uploads/screenshot_sample1.png"; // fallback

      // Store base64 screenshot if supplied
      if (paymentScreenshot && paymentScreenshot.includes(";base64,")) {
        try {
          const parts = paymentScreenshot.split(";base64,");
          const mime = parts[0].split(":")[1];
          const ext = mime.split("/")[1] || "png";
          const dataBuffer = Buffer.from(parts[1], "base64");
          const fileName = `screenshot_${id}_${Date.now()}.${ext}`;
          fs.writeFileSync(path.join(UPLOADS_DIR, fileName), dataBuffer);
          screenshotUrl = `/uploads/${fileName}`;
        } catch (imgErr) {
          console.error("Failed to write image, using sample instead", imgErr);
        }
      } else if (paymentScreenshot && paymentScreenshot.startsWith("http")) {
        screenshotUrl = paymentScreenshot;
      }

      const db = readDB();
      const newRegistration: Registration = {
        id,
        fullName,
        email,
        mobileNumber,
        companyName,
        city,
        paymentScreenshot: screenshotUrl,
        status: "Pending",
        registrationDate: new Date().toISOString(),
        invitationSent: false,
      };

      db.registrations.unshift(newRegistration);
      writeDB(db);

      res.json({
        success: true,
        message: "Registration recorded successfully, awaiting payment verification.",
        registration: newRegistration,
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // Verify/Approve/Reject Registration (Admin Action)
  app.post("/api/register/verify", (req, res) => {
    try {
      const { id, action } = req.body; // action: 'approve' | 'reject'
      if (!id || !action) {
        return res.status(400).json({ success: false, error: "Missing registration ID or action" });
      }

      const db = readDB();
      const index = db.registrations.findIndex((r) => r.id === id);

      if (index === -1) {
        return res.status(404).json({ success: false, error: "Registration not found." });
      }

      const reg = db.registrations[index];

      if (action === "approve") {
        const inviteCode = "VGIS-2026-" + Math.random().toString(36).substring(2, 6).toUpperCase();
        reg.status = "Approved";
        reg.invitationSent = true;
        reg.invitationCode = inviteCode;
        reg.invitationDetails = {
          date: db.event.date,
          time: db.event.time,
          venue: db.event.venue,
          ticketId: inviteCode,
        };
      } else if (action === "reject") {
        reg.status = "Rejected";
        reg.invitationSent = false;
        reg.invitationCode = undefined;
        reg.invitationDetails = undefined;
      }

      db.registrations[index] = reg;
      writeDB(db);

      res.json({
        success: true,
        message: `Registration ${action === "approve" ? "Approved" : "Rejected"} successfully`,
        registration: reg,
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // Get Admin Analytics
  app.get("/api/admin/analytics", (req, res) => {
    try {
      const db = readDB();
      const total = db.registrations.length;
      const approved = db.registrations.filter((r) => r.status === "Approved").length;
      const pending = db.registrations.filter((r) => r.status === "Pending").length;
      const rejected = db.registrations.filter((r) => r.status === "Rejected").length;

      const ticketPrice = db.event.ticketPrice;
      const revenue = approved * ticketPrice;

      // Group registrations by city
      const cityBreakdown: { [key: string]: number } = {};
      db.registrations.forEach((r) => {
        cityBreakdown[r.city] = (cityBreakdown[r.city] || 0) + 1;
      });

      res.json({
        total,
        approved,
        pending,
        rejected,
        revenue,
        ticketPrice,
        cityBreakdown,
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // Submit Contact Query
  app.post("/api/contact", (req, res) => {
    try {
      const { name, email, phone, message, service } = req.body;
      if (!name || !email || !message) {
        return res.status(400).json({ success: false, error: "Name, email, and message are required." });
      }

      const db = readDB();
      const newQuery: ContactQuery = {
        id: "CQ-" + Math.floor(1000 + Math.random() * 9000),
        name,
        email,
        phone: phone || "",
        message,
        service: service || "General Consultation",
        date: new Date().toISOString(),
        status: "Unread",
      };

      db.contactQueries.unshift(newQuery);
      writeDB(db);

      res.json({ success: true, message: "Thank you! Your inquiry has been sent to Vanguard Operations.", query: newQuery });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // Get Contact Queries (Admin)
  app.get("/api/contact", (req, res) => {
    const db = readDB();
    res.json(db.contactQueries);
  });

  // Update Contact Query Read Status (Admin)
  app.post("/api/contact/read", (req, res) => {
    try {
      const { id } = req.body;
      const db = readDB();
      const index = db.contactQueries.findIndex((q) => q.id === id);
      if (index !== -1) {
        db.contactQueries[index].status = "Read";
        writeDB(db);
        return res.json({ success: true, query: db.contactQueries[index] });
      }
      res.status(404).json({ success: false, error: "Query not found" });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // Delete registration or query (Admin helper)
  app.delete("/api/register/:id", (req, res) => {
    try {
      const { id } = req.params;
      const db = readDB();
      db.registrations = db.registrations.filter((r) => r.id !== id);
      writeDB(db);
      res.json({ success: true });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // --- Vite & Production Handlers ---

  if (process.env.NODE_ENV !== "production") {
    // Vite Dev Server Integration
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve client static files
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*all", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Vanguard Server] Running on http://0.0.0.0:${PORT} in ${process.env.NODE_ENV || "development"} mode`);
  });
}

startServer();
