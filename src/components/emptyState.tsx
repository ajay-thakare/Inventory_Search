interface Props {
  query: string;
}

export function EmptyState({ query }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center text-muted-foreground">
      <p className="text-4xl mb-3">📦</p>
      <p className="text-lg font-medium">No results found</p>
      {query ? (
        <p className="text-sm mt-1">
          No inventory matches{" "}
          <span className="font-semibold text-foreground">"{query}"</span>. Try
          a different search or clear filters.
        </p>
      ) : (
        <p className="text-sm mt-1">Try adjusting your filters.</p>
      )}
    </div>
  );
}
