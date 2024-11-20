export default function NoSnippetSelectedPage() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="rounded-lg border border-dashed border-black px-10 py-12 text-center dark:border-white">
        <h2 className="mb-2 text-2xl font-bold">No Snippet Selected</h2>
        <p>Please select a snippet from the sidebar.</p>
      </div>
    </div>
  );
}
