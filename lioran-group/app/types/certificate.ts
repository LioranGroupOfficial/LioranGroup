export interface ICertificate {
  certificateId: string;
  name: string;
  role: string;
  contribution: string;
  description: string;
  startDate: Date;
  endDate: Date;
  duration: string;
  organization: string;
  issuedBy: string;
  issueDate: Date;
  verificationUrl: string;
  status: "active" | "revoked";
  createdAt: Date;
  updatedAt: Date;
}
