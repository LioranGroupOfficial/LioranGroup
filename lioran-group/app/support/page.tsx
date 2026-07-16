const channels = [
  ["Email", "support@lioran.group", "Best for product issues and account questions."],
  ["LDS", "lioransolutions.com", "Best starting point for company and product context."],
  ["Discord", "discord.gg/WsWWThjPMp", "Best for community discussion and lightweight support."],
];

export default function SupportPage() {
  return (
    <div className="page-shell page-grid">
      <section className="page-intro">
        <span className="eyebrow">Support</span>
        <h1>Support channels with clear expectations.</h1>
        <p>
          Support should route users toward documentation first, then direct
          communication when product context is required.
        </p>
      </section>

      <table className="data-table">
        <thead>
          <tr>
            <th>Channel</th>
            <th>Address</th>
            <th>Use Case</th>
          </tr>
        </thead>
        <tbody>
          {channels.map(([channel, address, useCase]) => (
            <tr key={channel}>
              <td>{channel}</td>
              <td>{address}</td>
              <td>{useCase}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
