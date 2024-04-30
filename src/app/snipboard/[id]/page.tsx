export default function SnippetsPage({ params }: { params: { id: string } }) {
  const { id } = params;
  return (
    <div>
      <p>Vault id: {id}</p>
    </div>
  );
}
