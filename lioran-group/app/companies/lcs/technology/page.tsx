const stack = [
  ["Core language", "Rust and TypeScript for systems and control surfaces."],
  ["Documentation", "HTML, CSS, and TypeScript-first pages with minimal client work."],
  ["Operations", "Versioned releases, internal tooling, and explicit ecosystem cross-linking."],
];

export default function LcsTechnologyPage() {
  return (
    <section className="section-block">
      <div className="section-heading">
        <h2>Technology</h2>
        <p>
          LDS favors predictable tooling choices, explicit APIs, and interfaces
          that can be understood quickly by engineers.
        </p>
      </div>
      <table className="data-table">
        <thead>
          <tr>
            <th>Area</th>
            <th>Approach</th>
          </tr>
        </thead>
        <tbody>
          {stack.map(([area, approach]) => (
            <tr key={area}>
              <td>{area}</td>
              <td>{approach}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
