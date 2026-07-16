const members = [
  ["Swaraj Puppalwar", "Founder & CTO", "Architecture, systems design, technical direction"],
  ["Pranay Kumeriya", "COO", "Operations, delivery coordination, execution"],
  ["Engineering Team", "Product and platform contributors", "Implementation across LDS and LioranDB"],
];

export default function TeamPage() {
  return (
    <div className="page-shell page-grid">
      <section className="page-intro">
        <span className="eyebrow">Team</span>
        <h1>Small operating team across product and platform work.</h1>
        <p>
          Team pages stay text-first and role-oriented. The focus is
          responsibility, not presentation.
        </p>
      </section>

      <table className="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Responsibility</th>
          </tr>
        </thead>
        <tbody>
          {members.map(([name, role, responsibility]) => (
            <tr key={name}>
              <td>{name}</td>
              <td>{role}</td>
              <td>{responsibility}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
