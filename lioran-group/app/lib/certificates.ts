import Certificate from "../models/Certificate";
import type {
  CertificateInput,
  ICertificate,
  CertificateRecord,
  CertificateStatus,
} from "../types/certificate";

const SITE_URL = "https://lioran.group";

export function generateCertificateId(): string {
  return Math.floor(1000000000 + Math.random() * 9000000000).toString();
}

export function buildVerificationUrl(certificateId: string): string {
  return `${SITE_URL}/verify/${certificateId}`;
}

export function buildCertificateViewUrl(certificateId: string): string {
  return `${SITE_URL}/certificate/view/${certificateId}`;
}

export function sanitizeCertificateInput(input: Partial<CertificateInput>) {
  return {
    name: input.name?.trim() ?? "",
    role: input.role?.trim() ?? "",
    contribution: input.contribution?.trim() ?? "",
    description: input.description?.trim() ?? "",
    startDate: input.startDate ?? "",
    endDate: input.endDate ?? "",
    duration: input.duration?.trim() ?? "",
    organization: input.organization?.trim() || "Lioran Group",
    issuedBy:
      input.issuedBy?.trim() || "Lioran Developer Environment Platform",
    status: (input.status as CertificateStatus | undefined) ?? "active",
  };
}

export function validateCertificateInput(input: ReturnType<typeof sanitizeCertificateInput>) {
  if (
    !input.name ||
    !input.role ||
    !input.contribution ||
    !input.description ||
    !input.startDate ||
    !input.endDate ||
    !input.duration
  ) {
    return "Missing required fields";
  }

  if (Number.isNaN(Date.parse(input.startDate)) || Number.isNaN(Date.parse(input.endDate))) {
    return "Invalid certificate dates";
  }

  return null;
}

type CertificateSource = ICertificate & {
  _id: { toString(): string } | string;
};

export function serializeCertificate(certificate: CertificateSource): CertificateRecord {
  return {
    _id: String(certificate._id),
    certificateId: certificate.certificateId,
    name: certificate.name,
    role: certificate.role,
    contribution: certificate.contribution,
    description: certificate.description,
    startDate: new Date(certificate.startDate).toISOString(),
    endDate: new Date(certificate.endDate).toISOString(),
    duration: certificate.duration,
    organization: certificate.organization,
    issuedBy: certificate.issuedBy,
    issueDate: new Date(certificate.issueDate).toISOString(),
    verificationUrl: certificate.verificationUrl,
    status: certificate.status,
    createdAt: new Date(certificate.createdAt).toISOString(),
    updatedAt: new Date(certificate.updatedAt).toISOString(),
  };
}

export async function createCertificate(input: CertificateInput) {
  const sanitized = sanitizeCertificateInput(input);
  const validationError = validateCertificateInput(sanitized);

  if (validationError) {
    throw new Error(validationError);
  }

  let certificateId = "";
  let exists = true;

  while (exists) {
    certificateId = generateCertificateId();
    exists = !!(await Certificate.exists({ certificateId }));
  }

  const certificate = await Certificate.create({
    ...sanitized,
    certificateId,
    verificationUrl: buildVerificationUrl(certificateId),
  });

  return serializeCertificate(certificate);
}

export async function updateCertificateRecord(
  certificateId: string,
  updates: Partial<CertificateInput>,
) {
  const current = await Certificate.findOne({ certificateId });

  if (!current) {
    return null;
  }

  const sanitized = sanitizeCertificateInput({
    name: updates.name ?? current.name,
    role: updates.role ?? current.role,
    contribution: updates.contribution ?? current.contribution,
    description: updates.description ?? current.description,
    startDate:
      updates.startDate ??
      new Date(current.startDate).toISOString().split("T")[0],
    endDate:
      updates.endDate ?? new Date(current.endDate).toISOString().split("T")[0],
    duration: updates.duration ?? current.duration,
    organization: updates.organization ?? current.organization,
    issuedBy: updates.issuedBy ?? current.issuedBy,
    status: updates.status ?? current.status,
  });

  const validationError = validateCertificateInput(sanitized);

  if (validationError) {
    throw new Error(validationError);
  }

  current.name = sanitized.name;
  current.role = sanitized.role;
  current.contribution = sanitized.contribution;
  current.description = sanitized.description;
  current.startDate = new Date(sanitized.startDate);
  current.endDate = new Date(sanitized.endDate);
  current.duration = sanitized.duration;
  current.organization = sanitized.organization;
  current.issuedBy = sanitized.issuedBy;
  current.status = sanitized.status;

  await current.save();

  return serializeCertificate(current);
}
