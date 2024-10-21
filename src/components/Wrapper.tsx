export default function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="m-10 bg-white dark:bg-black rounded-md shadow-sm">
      {children}
    </div>
  );
}
