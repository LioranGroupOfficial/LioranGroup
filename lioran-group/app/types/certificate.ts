export type CertificateStatus = "active" | "suspended" | "revoked";

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
  status: CertificateStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface CertificateRecord {
  _id: string;
  certificateId: string;
  name: string;
  role: string;
  contribution: string;
  description: string;
  startDate: string;
  endDate: string;
  duration: string;
  organization: string;
  issuedBy: string;
  issueDate: string;
  verificationUrl: string;
  status: CertificateStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CertificateInput {
  name: string;
  role: string;
  contribution: string;
  description: string;
  startDate: string;
  endDate: string;
  duration: string;
  organization?: string;
  issuedBy?: string;
  status?: CertificateStatus;
}
