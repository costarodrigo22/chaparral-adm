import { FadeLoader } from 'react-spinners';

export default function SplashScreen() {
  return (
    <div className="w-full h-screen bg-[#320c3a] flex items-center justify-center">
      <FadeLoader color="#fff" width={10} height={10} />
    </div>
  );
}
