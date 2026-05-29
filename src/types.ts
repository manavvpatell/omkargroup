export interface EventDetails {
  title: string;
  date: string;
  time: string;
  venue: string;
  description: string;
  availableSeats: number;
  ticketPrice: number;
}

export interface Registration {
  id: string;
  fullName: string;
  mobileNumber: string;
  email: string;
  companyName: string;
  city: string;
  paymentScreenshot: string; // Base64 or local server path
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

export interface ContactQuery {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  service: string;
  date: string;
  status: 'Read' | 'Unread';
}
