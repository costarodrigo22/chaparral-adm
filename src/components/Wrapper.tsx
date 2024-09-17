export default function Wrapper({ children }: { children: React.ReactNode }) {
  return <div className="m-10 bg-white rounded-md shadow-sm">{children}</div>;
}
