import AdminDashboardClient from "@/components/certificates/AdminDashboardClient";

export default function AdminPage() {
  return (
    <div className="page-shell page-grid">
      <section className="page-intro">
        <span className="eyebrow">Admin Dashboard</span>
        <h1>Manage certificates from one place.</h1>
        <p>
          The admin area now acts as a dashboard for issuing, reviewing,
          editing, suspending, revoking, and deleting certificates.
        </p>
      </section>

      <AdminDashboardClient />
    </div>
  );
}
